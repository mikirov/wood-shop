import nodemailer from "nodemailer";
import { config } from "dotenv";

config({ path: ".env.local" });
config();

async function main() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const port = Number(process.env.SMTP_PORT ?? "465");
  const secure =
    process.env.SMTP_SECURE?.trim().toLowerCase() === "true" || port === 465;

  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST, SMTP_USER, and SMTP_PASS are required");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  await transporter.verify();
  console.log(`SMTP OK — connected as ${user} via ${host}:${port}`);
}

main().catch((error) => {
  console.error("SMTP connection failed:", error);
  process.exit(1);
});
