import nodemailer from "nodemailer";

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

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = Number(process.env.SMTP_PORT ?? "465");

  if (!host || !user || !pass || !Number.isFinite(port)) {
    return null;
  }

  const secure =
    process.env.SMTP_SECURE?.trim().toLowerCase() === "true" || port === 465;

  return { host, port, user, pass, secure };
}

export async function sendOrderEmails(input: OrderEmailInput) {
  const smtp = getSmtpConfig();
  const from =
    process.env.ORDER_FROM_EMAIL?.trim() ||
    (smtp ? `Obsidian River <${smtp.user}>` : "Obsidian River <noreply@localhost>");
  const notify =
    process.env.ORDER_NOTIFY_EMAIL?.trim() || "atelier@obsidianriver.eu";
  const bodies = buildBodies(input);

  if (!smtp) {
    console.warn(
      "SMTP credentials missing — order saved, emails skipped. Set SMTP_HOST, SMTP_USER, SMTP_PASS.",
    );
    console.info(bodies.customerText);
    console.info(bodies.atelierText);
    return { sent: false as const };
  }

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: {
      user: smtp.user,
      pass: smtp.pass,
    },
  });

  await transporter.sendMail({
    from,
    to: input.customerEmail,
    subject: bodies.customerSubject,
    text: bodies.customerText,
  });

  await transporter.sendMail({
    from,
    to: notify,
    subject: bodies.atelierSubject,
    text: bodies.atelierText,
  });

  return { sent: true as const };
}
