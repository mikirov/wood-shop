import { NextResponse } from "next/server";

const OFFICES_URL =
  "https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getOffices.json";

type EcontOffice = {
  code: string;
  name: string;
  nameEn?: string;
  address?: { fullAddress?: string };
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = Number(searchParams.get("cityId"));
    if (!Number.isFinite(cityId) || cityId <= 0) {
      return NextResponse.json(
        { error: "cityId is required" },
        { status: 400 },
      );
    }

    const response = await fetch(OFFICES_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryCode: "BGR", cityID: cityId }),
      next: { revalidate: 60 * 60 * 6 },
    });
    if (!response.ok) {
      throw new Error(`Econt offices failed: ${response.status}`);
    }

    const data = (await response.json()) as { offices?: EcontOffice[] };
    const offices = (data.offices ?? []).map((office) => ({
      code: office.code,
      name: office.nameEn || office.name,
      nameLocal: office.name,
      address: office.address?.fullAddress ?? "",
    }));

    return NextResponse.json({ offices });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not load Econt offices" },
      { status: 502 },
    );
  }
}
