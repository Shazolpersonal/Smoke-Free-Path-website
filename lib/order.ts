/**
 * Order handling logic
 * Static-compatible submission using mailto: fallback
 */

export interface OrderData {
  name: string;
  email: string;
  phone: string;
  purpose: "self" | "gift";
  trxId: string;
  recipientName?: string;
  recipientEmail?: string;
  message?: string;
}

export function submitOrder(data: OrderData) {
  const subject = `New Order: ${data.purpose.toUpperCase()} - ${data.name}`;
  
  let body = `ORDER DETAILS:\n`;
  body += `-------------------\n`;
  body += `Name: ${data.name}\n`;
  body += `Email: ${data.email}\n`;
  body += `Phone: ${data.phone}\n`;
  body += `Purpose: ${data.purpose}\n`;
  body += `Transaction ID: ${data.trxId}\n\n`;
  
  if (data.purpose === "gift") {
    body += `GIFT DETAILS:\n`;
    body += `-------------------\n`;
    body += `Recipient Name: ${data.recipientName}\n`;
    body += `Recipient Email: ${data.recipientEmail}\n`;
    body += `Message: ${data.message || 'None'}\n\n`;
  }
  
  body += `Please verify the transaction and send the download links.\n`;
  
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  
  // For static sites without a backend, we use mailto: as a fallback.
  // In production, this would be an API call to Cloudflare Workers or similar.
  window.location.href = `mailto:orders@dhoyamuktopoth.com?subject=${encodedSubject}&body=${encodedBody}`;
}
