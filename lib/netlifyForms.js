// Submits data to a Netlify Form without a page reload.
//
// Netlify only detects forms that exist in static HTML at deploy time, so every
// form name and field used here must also be declared in public/__forms.html.
// Submissions show up under Site > Forms in the Netlify dashboard.
//
// This only works on a Netlify deploy. Under `npm run dev` the request fails,
// and callers fall back to WhatsApp or show an error.
export async function submitNetlifyForm(formName, data) {
  const fields = { 'form-name': formName };
  for (const [key, value] of Object.entries(data)) {
    fields[key] = value == null ? '' : String(value);
  }

  const res = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(fields).toString(),
  });

  if (!res.ok) {
    throw new Error(`Form submission failed (${res.status})`);
  }
}
