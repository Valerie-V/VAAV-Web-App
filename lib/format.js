export const naira = (n) => `₦${Number(n).toLocaleString()}`;

export const watts = (n) => `${Number(n).toLocaleString()} W`;

export const wattHours = (n) => `${Math.round(Number(n)).toLocaleString()} Wh`;

// Headline numbers for the whole PowerCube range, derived from product data so
// they stay correct when products change.
export function rangeStats(products) {
  const inverters = products.map((p) => Number(p.inverter));
  const batteries = products.map((p) => Number(p.battery));
  return {
    minOutput: Math.min(...inverters),
    maxOutput: Math.max(...inverters),
    maxBattery: Math.max(...batteries),
    minPrice: Math.min(...products.map((p) => p.price1)),
  };
}
