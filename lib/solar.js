// Solar assumptions shared by the energy audit and custom systems: what a
// "+Solar" bundle or a custom array adds each day.
// Tune these if you have better figures for your customers' locations.
export const SOLAR_ASSUMPTIONS = {
  // Wattage of each panel in the PowerCube and PowerCubeX solar kits.
  panelWatts: 180,
  // Average full-sun-equivalent hours per day. Nigeria ranges from roughly
  // 4 (south, rainy season) to 6+ (north); 4.5 is a cautious average.
  peakSunHours: 4.5,
  // Share of panel output that reaches your appliances after charging, wiring
  // and heat losses.
  systemEfficiency: 0.8,
};

// PowerCubeXtra and up have a built-in MPPT charger, so they take 500 W+
// panels. Their array is sized from the battery:
//   panel kWp = battery kWh × 1.6 ÷ peak sun hours
// and the panel count is rounded up so the array is never smaller than that.
export const MPPT_SOLAR = {
  panelWatts: 550,
  batteryFactor: 1.6,
};

// The solar kit bundled with a product: { panels, panelWatts, kwp }.
export function solarKit(product, assumptions = SOLAR_ASSUMPTIONS) {
  if (product.mppt) {
    const targetWatts = ((Number(product.battery) / 1000) * MPPT_SOLAR.batteryFactor * 1000) / assumptions.peakSunHours;
    const panels = Math.ceil(targetWatts / MPPT_SOLAR.panelWatts - 1e-9);
    return { panels, panelWatts: MPPT_SOLAR.panelWatts, kwp: (panels * MPPT_SOLAR.panelWatts) / 1000 };
  }
  const panels = Number(product.solarPanels) || 0;
  return { panels, panelWatts: assumptions.panelWatts, kwp: (panels * assumptions.panelWatts) / 1000 };
}

// "4 × 550 W panels"
export function solarKitText(product) {
  const { panels, panelWatts } = solarKit(product);
  return `${panels} × ${panelWatts} W panel${panels === 1 ? '' : 's'}`;
}
