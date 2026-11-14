// Shared energy-audit maths, used by the audit page and the booking form.

import { SOLAR_ASSUMPTIONS, solarKit } from './solar';
import { describeCustomSystem, sizeCustomSystem, customSystemText } from './customSystem';

export { SOLAR_ASSUMPTIONS };

export function summarizeAudit(audit = []) {
  const items = audit.filter(
    (a) => Number(a.rating) > 0 && Number(a.quantity) > 0
  );
  const peakPower = items.reduce(
    (sum, a) => sum + Number(a.rating) * Number(a.quantity),
    0
  );
  const dailyEnergy = items.reduce(
    (sum, a) =>
      sum + Number(a.rating) * Number(a.quantity) * Number(a.dailyUsage || 0),
    0
  );
  return { items, peakPower, dailyEnergy };
}

// Estimated energy (Wh) per day from a product's bundled solar panels.
export function solarYield(product, assumptions = SOLAR_ASSUMPTIONS) {
  const { panels, panelWatts } = solarKit(product, assumptions);
  const { peakSunHours, systemEfficiency } = assumptions;
  return Math.round(panels * panelWatts * peakSunHours * systemEfficiency);
}

function describe(product, withSolar) {
  const battery = Number(product.battery);
  const solar = withSolar ? solarYield(product) : 0;
  return {
    product,
    withSolar,
    name: withSolar ? product.name[1] : product.name[0],
    price: withSolar ? product.price2 : product.price1,
    battery,
    panels: withSolar ? solarKit(product).panels : 0,
    panelWatts: solarKit(product).panelWatts,
    solarYield: solar,
    // energy the setup can deliver in a day: a full battery plus what the
    // panels produce while the sun is up
    dailyCapacity: battery + solar,
  };
}

// Works out the best setup for the audit, considering each PowerCube on its
// own and with its solar bundle. Products are listed smallest first.
//
// Returns:
//   best         - the cheapest option that covers the load (or undefined)
//   alternative  - the other option, if it is a different setup
//   withoutSolar - smallest PowerCube whose battery alone covers the load
//   withSolar    - smallest PowerCube + solar bundle that covers the load
//   custom       - when no PowerCube covers the load, a custom system of
//                  batteries, inverters and panels sized for it
export function recommendSetup(products, dailyEnergy, peakPower) {
  const fits = (option) =>
    peakPower <= Number(option.product.inverter) &&
    dailyEnergy <= option.dailyCapacity;

  const withoutSolar = products.map((p) => describe(p, false)).find(fits);
  const withSolar = products
    .filter((p) => solarKit(p).panels > 0)
    .map((p) => describe(p, true))
    .find(fits);

  const options = [withoutSolar, withSolar].filter(Boolean);
  options.sort((a, b) => a.price - b.price);
  const custom = options.length || !dailyEnergy
    ? undefined
    : describeCustomSystem(sizeCustomSystem(dailyEnergy, peakPower), dailyEnergy, peakPower);
  return {
    best: options[0],
    alternative: options[1],
    withoutSolar,
    withSolar,
    custom,
  };
}

// Plain-text version of the audit, attached to bookings and leads.
export function auditSummaryText(audit, products) {
  const { items, peakPower, dailyEnergy } = summarizeAudit(audit);
  if (!items.length) return '';

  const lines = items.map(
    (a) =>
      `- ${a.equipment || 'Appliance'} x${a.quantity} (${a.rating}W, ${a.dailyUsage}h/day)`
  );
  const { withoutSolar, withSolar, custom } = recommendSetup(products, dailyEnergy, peakPower);

  const recommendation = custom
    ? [`Recommended: Custom system - ${customSystemText(custom.counts)} (₦${custom.price.toLocaleString()})`]
    : [
        `Recommended (battery only): ${withoutSolar ? withoutSolar.name : 'None in the range'}`,
        `Recommended (with solar): ${withSolar ? `${withSolar.name} (${withSolar.panels} x ${withSolar.panelWatts}W panels)` : 'None in the range'}`,
      ];

  return [
    ...lines,
    `Total load: ${peakPower.toLocaleString()} W`,
    `Daily energy: ${dailyEnergy.toLocaleString()} Wh`,
    ...recommendation,
  ].join('\n');
}
