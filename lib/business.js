// Business contact details used across the site (nav, footer, contact
// section, booking confirmations, WhatsApp buttons).
//
// TODO: fill these in before deploying. Anything left empty is hidden on the
// site, so nothing breaks while they are blank.
export const business = {
  name: 'VAAV Innovations',
  // WhatsApp number in international format, digits only, no "+" or spaces.
  // Example: '2348012345678'
  whatsapp: '2349054292450',
  // Phone number as it should be displayed. Example: '+234 801 234 5678'
  phone: '',
  email: '',
  address: '',
  linkedin: '',
  x: '',
};

export function whatsappLink(message = '') {
  if (!business.whatsapp) return null;
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${business.whatsapp}${text}`;
}

export function phoneLink() {
  return business.phone ? `tel:${business.phone.replace(/[^\d+]/g, '')}` : null;
}
