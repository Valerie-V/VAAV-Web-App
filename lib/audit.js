// Shared energy-audit maths, used by the audit page and the booking form.

// Solar assumptions used to estimate what a "+Solar" bundle adds each day.
// Tune these if you have better figures for your customers' locations.
export const SOLAR_ASSUMPTIONS = {
  // Wattage of each panel in a bundle (matches the product spec sheet).
  panelWatts: 180,
  // Average full-sun-equivalent hours per day. Nigeria ranges from roughly
  // 4 (south, rainy season) to 6+ (north); 4.5 is a cautious average.
  peakSunHours: 4.5,
  // Share of panel output that reaches your appliances after charging, wiring
  // and heat losses.
  systemEfficiency: 0.8,
};

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
  const panels = Number(product.solarPanels) || 0;
  const { panelWatts, peakSunHours, systemEfficiency } = assumptions;
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
    panels: withSolar ? Number(product.solarPanels) || 0 : 0,
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
export function recommendSetup(products, dailyEnergy, peakPower) {
  const fits = (option) =>
    peakPower <= Number(option.product.inverter) &&
    dailyEnergy <= option.dailyCapacity;

  const withoutSolar = products.map((p) => describe(p, false)).find(fits);
  const withSolar = products
    .filter((p) => Number(p.solarPanels) > 0)
    .map((p) => describe(p, true))
    .find(fits);

  const options = [withoutSolar, withSolar].filter(Boolean);
  options.sort((a, b) => a.price - b.price);
  return {
    best: options[0],
    alternative: options[1],
    withoutSolar,
    withSolar,
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
  const { withoutSolar, withSolar } = recommendSetup(products, dailyEnergy, peakPower);

  return [
    ...lines,
    `Total load: ${peakPower.toLocaleString()} W`,
    `Daily energy: ${dailyEnergy.toLocaleString()} Wh`,
    `Recommended (battery only): ${withoutSolar ? withoutSolar.name : 'Custom system needed'}`,
    `Recommended (with solar): ${withSolar ? `${withSolar.name} (${withSolar.panels} x ${SOLAR_ASSUMPTIONS.panelWatts}W panels)` : 'Custom system needed'}`,
  ].join('\n');
}
