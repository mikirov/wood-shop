/** Seller identity for Obsidian River storefront (operated by ESCRYPT EOOD). */
export const COMPANY = {
  legalName: "ESCRYPT EOOD",
  tradingName: "Obsidian River",
  uic: "206622349",
  vatNote:
    "Prices are in EUR. Invoices are issued by ESCRYPT EOOD under Bulgarian law.",
  addressLines: [
    "Mladost 3, bl. 313, entr. 3, fl. 10, apt. 66",
    "1799 Sofia, Bulgaria",
  ],
  email: "shimonchick@gmail.com",
  registryUrl:
    "https://portal.registryagency.bg/CR/en/Reports/ActiveConditionTabResult?uic=206622349",
  bank: {
    recipient: "ESCRYPT EOOD",
    iban: "LT313250076317376271",
    ibanDisplay: "LT31 3250 0763 1737 6271",
    bic: "REVOLT21",
    bankName: "Revolut Bank UAB",
    bankAddress: "Konstitucijos ave. 21B, 08130 Vilnius, Lithuania",
    currency: "EUR",
  },
} as const;

export function formatBankTransferInstructions() {
  const { bank, legalName } = COMPANY;
  return [
    `Recipient: ${bank.recipient} (${legalName})`,
    `IBAN: ${bank.ibanDisplay}`,
    `BIC: ${bank.bic}`,
    `Bank: ${bank.bankName}`,
    `Currency: ${bank.currency}`,
    "Please use your order / invoice number as the payment reference.",
  ].join("\n");
}
