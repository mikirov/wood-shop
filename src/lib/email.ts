import { Resend } from "resend";

type OrderEmailInput = {
  orderId: string;
  productName: string;
  quantity: number;
  totalEur: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryType: "office" | "address";
  city: string;
  postCode: string;
  econtOfficeCode?: string | null;
  econtOfficeName?: string | null;
  street?: string | null;
  streetNumber?: string | null;
  addressExtra?: string | null;
  paymentMethod: "cod" | "bank";
  notes?: string | null;
};

function formatDelivery(input: OrderEmailInput) {
  if (input.deliveryType === "office") {
    return [
      "Econt office pickup",
      `City: ${input.city} ${input.postCode}`,
      `Office code: ${input.econtOfficeCode ?? "—"}`,
      `Office: ${input.econtOfficeName ?? "—"}`,
    ].join("\n");
  }

  return [
    "Address delivery",
    `City: ${input.city} ${input.postCode}`,
    `Street: ${input.street ?? ""} ${input.streetNumber ?? ""}`.trim(),
    input.addressExtra ? `Extra: ${input.addressExtra}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildBodies(input: OrderEmailInput) {
  const payment =
    input.paymentMethod === "cod"
      ? "Cash on delivery (Econt)"
      : "Bank transfer (details in a follow-up email if needed)";

  const shared = `
Order ID: ${input.orderId}
Product: ${input.productName}
Quantity: ${input.quantity}
Total: €${input.totalEur}

Customer: ${input.customerName}
Email: ${input.customerEmail}
Phone: ${input.customerPhone}

Delivery:
${formatDelivery(input)}

Payment: ${payment}
${input.notes ? `\nNotes: ${input.notes}` : ""}
`.trim();

  return {
    customerSubject: `Order confirmation — ${input.productName}`,
    customerText: `Hi ${input.customerName},\n\nWe received your order. Here's a copy of the details:\n\n${shared}\n\nWe'll prepare the Econt shipment and write again if we need anything.\n\n— Obsidian River`,
    atelierSubject: `New order — ${input.productName}`,
    atelierText: `New shop order:\n\n${shared}`,
  };
}

export async function sendOrderEmails(input: OrderEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ORDER_FROM_EMAIL ?? "Obsidian River <onboarding@resend.dev>";
  const notify = process.env.ORDER_NOTIFY_EMAIL ?? "atelier@obsidianriver.eu";
  const bodies = buildBodies(input);

  if (!apiKey) {
    console.warn("RESEND_API_KEY missing — order saved, emails skipped.");
    console.info(bodies.customerText);
    console.info(bodies.atelierText);
    return { sent: false as const };
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    from,
    to: input.customerEmail,
    subject: bodies.customerSubject,
    text: bodies.customerText,
  });

  await resend.emails.send({
    from,
    to: notify,
    subject: bodies.atelierSubject,
    text: bodies.atelierText,
  });

  return { sent: true as const };
}
