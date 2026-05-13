// Netlify Forms → Resend bridge.
//
// Triggered automatically by Netlify when any <form data-netlify="true">
// receives a submission. Sends two emails via Resend:
//   1. Owner notification (info@wccp.co.uk) — full submission payload
//   2. Submitter confirmation — branded HTML, sets next-step expectation
//
// Required env on Netlify:
//   RESEND_API_KEY    — server-side, never PUBLIC_
//   RESEND_FROM       — e.g. "WCCP <noreply@wccp.co.uk>" (must be a verified
//                       sender on Resend; SPF + DKIM + DMARC must be live on
//                       wccp.co.uk before this will deliver reliably)
//   NOTIFY_TO         — owner recipient(s), comma-separated. Defaults to
//                       info@wccp.co.uk.
//
// Failure mode: logs error to Netlify Functions log; never throws to Netlify
// Forms (otherwise the submission UI breaks). Sentry can be wired in later.

import type { Context } from '@netlify/functions';

type FormSubmission = {
  payload: {
    form_name: string;
    data: Record<string, string>;
    human_fields?: Record<string, string>;
    site_url?: string;
  };
};

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const escapeHtml = (s: string): string =>
  s.replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string),
  );

const renderRows = (data: Record<string, string>): string =>
  Object.entries(data)
    .filter(([k]) => !['bot-field', 'company-fax', 'form-name'].includes(k))
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e6e6e6;font-weight:600;color:#131e44;vertical-align:top;white-space:nowrap;">${escapeHtml(k)}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e6e6e6;color:#333;white-space:pre-wrap;">${escapeHtml(v || '')}</td>
        </tr>`,
    )
    .join('');

const ownerEmail = (formName: string, data: Record<string, string>): string => `
<!doctype html>
<html><body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f3ef;padding:24px;">
  <table style="max-width:640px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e6e6e6;">
    <tr><td style="background:#131e44;color:#fff;padding:20px 24px;">
      <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.8;">New enquiry</div>
      <div style="font-size:20px;font-weight:700;margin-top:4px;">WCCP — ${escapeHtml(formName)}</div>
    </td></tr>
    <tr><td style="padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;">${renderRows(data)}</table>
    </td></tr>
    <tr><td style="padding:16px 24px;color:#666;font-size:12px;background:#faf8f4;">
      Sent by westcountryconcreteproducts.co.uk · ${new Date().toLocaleString('en-GB')}
    </td></tr>
  </table>
</body></html>`;

const submitterEmail = (formName: string, firstName: string): string => `
<!doctype html>
<html><body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f3ef;padding:24px;">
  <table style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden;border:1px solid #e6e6e6;">
    <tr><td style="background:#131e44;color:#fff;padding:24px;">
      <div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;opacity:.8;">West Country Concrete Products</div>
      <div style="font-size:22px;font-weight:700;margin-top:6px;">Thanks${firstName ? `, ${escapeHtml(firstName)}` : ''} — we've got your enquiry.</div>
    </td></tr>
    <tr><td style="padding:24px;color:#333;line-height:1.55;font-size:15px;">
      <p style="margin:0 0 12px;">A member of our team will be in touch within one working day (Mon–Fri, 07:30–17:00). Urgent? Ring the yard direct on
        <a href="tel:+441409281437" style="color:#3a5cb5;font-weight:600;">01409 281437</a>.</p>
      <p style="margin:0 0 12px;">In the meantime, you might find these useful:</p>
      <ul style="padding-left:20px;margin:0 0 16px;color:#333;">
        <li><a href="https://westcountryconcreteproducts.co.uk/products" style="color:#3a5cb5;">Full product range</a></li>
        <li><a href="https://westcountryconcreteproducts.co.uk/case-studies" style="color:#3a5cb5;">Recent case studies</a></li>
        <li><a href="https://westcountryconcreteproducts.co.uk/standards" style="color:#3a5cb5;">Our standards &amp; accreditations</a></li>
      </ul>
      <p style="margin:0;color:#666;font-size:13px;">Form: ${escapeHtml(formName)}</p>
    </td></tr>
    <tr><td style="padding:16px 24px;background:#faf8f4;color:#666;font-size:12px;border-top:1px solid #e6e6e6;">
      West Country Concrete Products Ltd · Company no. 06987338<br/>
      Off Andigestion Lane, Chilsworthy, Holsworthy, Devon EX22 7HH
    </td></tr>
  </table>
</body></html>`;

async function sendResend(
  apiKey: string,
  from: string,
  to: string | string[],
  subject: string,
  html: string,
  replyTo?: string,
): Promise<void> {
  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html, ...(replyTo ? { reply_to: replyTo } : {}) }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Resend ${res.status}: ${body}`);
  }
}

export default async (req: Request, _context: Context) => {
  const apiKey = Netlify.env.get('RESEND_API_KEY');
  const from = Netlify.env.get('RESEND_FROM') ?? 'WCCP <noreply@wccp.co.uk>';
  const notifyTo = (Netlify.env.get('NOTIFY_TO') ?? 'info@wccp.co.uk')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (!apiKey) {
    console.warn('[submission-created] RESEND_API_KEY not set — skipping email send');
    return new Response('skipped (no api key)', { status: 200 });
  }

  let body: FormSubmission;
  try {
    body = (await req.json()) as FormSubmission;
  } catch (err) {
    console.error('[submission-created] invalid json', err);
    return new Response('invalid json', { status: 400 });
  }

  const formName = body.payload?.form_name ?? 'unknown';
  const data = body.payload?.data ?? {};
  const submitterEmailAddr = data.email || data.Email || data['email-address'] || data.email_address;
  const firstName = (data['first-name'] || data.firstName || data.name || '').split(' ')[0] || '';

  // 1. Owner notification — always fire
  try {
    await sendResend(
      apiKey,
      from,
      notifyTo,
      `[WCCP] ${formName} — new enquiry`,
      ownerEmail(formName, data),
      submitterEmailAddr,
    );
  } catch (err) {
    console.error('[submission-created] owner email failed', err);
  }

  // 2. Submitter confirmation — only if we have a valid-looking address
  if (submitterEmailAddr && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(submitterEmailAddr)) {
    try {
      await sendResend(
        apiKey,
        from,
        submitterEmailAddr,
        `We've got your enquiry — West Country Concrete Products`,
        submitterEmail(formName, firstName),
      );
    } catch (err) {
      console.error('[submission-created] submitter email failed', err);
    }
  }

  return new Response('ok', { status: 200 });
};
