// Runs on every request at Cloudflare's edge — free on any Pages plan,
// no external geolocation API needed. Cloudflare already attaches the
// visitor's country to every request as request.cf.country.
//
// We use this purely to decide whether to show the EU/UK cookie-consent
// banner client-side (see src/layouts/Layout.astro). No personal data is
// stored — the cookie only holds "eu" or "other".

const EU_EEA_UK_CH = new Set([
  // EU member states
  'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR',
  'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
  'SI', 'ES', 'SE',
  // EEA (non-EU)
  'IS', 'LI', 'NO',
  // UK GDPR + Switzerland's similar consent regime
  'GB', 'CH',
]);

export async function onRequest(context) {
  const { request, next } = context;
  const response = await next();

  const country = request.cf?.country;
  const region = country && EU_EEA_UK_CH.has(country) ? 'eu' : 'other';

  const newResponse = new Response(response.body, response);
  newResponse.headers.append(
    'Set-Cookie',
    `region=${region}; Path=/; Max-Age=86400; SameSite=Lax`
  );
  return newResponse;
}
