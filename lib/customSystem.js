// Custom systems: for loads bigger than the largest PowerCube, we build a
// system from separate batteries, inverters and solar panels. Used by the
// custom builder (/custom), the energy audit and booking summaries.
import { SOLAR_ASSUMPTIONS } from './solar';

// Components and prices. Update these when prices change.
export const COMPONENTS = {
  battery: {
    id: 'battery',
    name: '15 kWh battery',
    unit: 'battery',
    wattHours: 15000,
    price: 2000000,
  },
  inverter: {
    id: 'inverter',
    name: '12 kVA inverter',
    unit: 'inverter',
    kva: 12,
    price: 1200000,
  },
  panel: {
    id: 'panel',
    name: 'Jinko 650 W solar panel',
    unit: 'panel',
    watts: 650,
    price: 135000,
  },
};

export const CUSTOM_ASSUMPTIONS = {
  // Real power (W) an inverter delivers per kVA. 0.8 is the usual rating, so
  // a 12 kVA inverter runs about 9,600 W of appliances.
  powerFactor: 0.8,
  // Most solar a single inverter can take in. Larger arrays need another
  // inverter. Check this against the inverter's spec sheet.
  maxSolarWattsPerInverter: 12000,
  // Share of the day's energy used when the sun is down. The batteries are
  // sized to cover at least this much.
  nightShare: 0.5,
};

// What one of each component contributes.
export const inverterWatts = COMPONENTS.inverter.kva * 1000 * CUSTOM_ASSUMPTIONS.powerFactor;

export const panelYield = Math.round(
  COMPONENTS.panel.watts * SOLAR_ASSUMPTIONS.peakSunHours * SOLAR_ASSUMPTIONS.systemEfficiency
);

const MAX = { battery: 20, inverter: 10, panel: 80 };
export const limits = MAX;

// A sensible starting point when we know nothing about the customer's load.
export const DEFAULT_SYSTEM = { battery: 1, inverter: 1, panel: 8 };

// Sizes a system for a daily energy need (Wh) and a total load (W):
//   - enough panels to produce the whole day's energy, so the batteries are
//     refilled every sunny day
//   - enough batteries to cover the night-time share of the day's use
//   - enough inverters for the load and for the solar array
export function sizeCustomSystem(dailyEnergy, peakPower) {
  const daily = Math.max(0, Number(dailyEnergy) || 0);
  const peak = Math.max(0, Number(peakPower) || 0);

  const panel = Math.max(1, Math.ceil(daily / panelYield));
  const battery = Math.max(1, Math.ceil((daily * CUSTOM_ASSUMPTIONS.nightShare) / COMPONENTS.battery.wattHours));
  const solarWatts = panel * COMPONENTS.panel.watts;
  const inverter = Math.max(
    1,
    Math.ceil(peak / inverterWatts),
    Math.ceil(solarWatts / CUSTOM_ASSUMPTIONS.maxSolarWattsPerInverter)
  );

  return {
    battery: Math.min(battery, MAX.battery),
    inverter: Math.min(inverter, MAX.inverter),
    panel: Math.min(panel, MAX.panel),
  };
}

// What a set of components adds up to, and whether it meets a need.
export function describeCustomSystem(counts, dailyEnergy = 0, peakPower = 0) {
  const battery = counts.battery * COMPONENTS.battery.wattHours;
  const output = counts.inverter * inverterWatts;
  const solarWatts = counts.panel * COMPONENTS.panel.watts;
  const solarYield = counts.panel * panelYield;
  const solarLimit = counts.inverter * CUSTOM_ASSUMPTIONS.maxSolarWattsPerInverter;

  const lines = Object.values(COMPONENTS).map(c => ({
    ...c,
    qty: counts[c.id],
    subtotal: counts[c.id] * c.price,
  }));
  const price = lines.reduce((sum, line) => sum + line.subtotal, 0);

  const daily = Number(dailyEnergy) || 0;
  const peak = Number(peakPower) || 0;
  const hasNeed = daily > 0 || peak > 0;

  return {
    counts,
    lines,
    price,
    battery,
    output,
    solarWatts,
    solarYield,
    // same rule as the PowerCubes: a full battery plus a day of solar
    dailyCapacity: battery + solarYield,
    hasNeed,
    checks: {
      power: peak <= output,
      energy: daily <= battery + solarYield,
      night: battery >= daily * CUSTOM_ASSUMPTIONS.nightShare,
      solarFits: solarWatts <= solarLimit,
    },
    // share of the day's use the panels can produce
    solarShare: daily > 0 ? Math.min(1, solarYield / daily) : 0,
  };
}

export function customSystemName(counts) {
  return `Custom system (${counts.battery} × ${COMPONENTS.battery.name}, ${counts.inverter} × ${COMPONENTS.inverter.name}, ${counts.panel} × ${COMPONENTS.panel.watts} W panels)`;
}

// Plain-text list of the components, for bookings and audit summaries.
export function customSystemText(counts) {
  return Object.values(COMPONENTS)
    .map(c => `${counts[c.id]} × ${c.name}`)
    .join(', ');
}
