import { NextResponse } from "next/server";

const CITIES_URL =
  "https://ee.econt.com/services/Nomenclatures/NomenclaturesService.getCities.json";

type EcontCity = {
  id: number;
  name: string;
  nameEn?: string;
  postCode?: string;
};

let cachedCities: EcontCity[] | null = null;
let cachedAt = 0;
const CACHE_MS = 1000 * 60 * 60 * 12;

async function loadCities() {
  if (cachedCities && Date.now() - cachedAt < CACHE_MS) {
    return cachedCities;
  }
  const response = await fetch(CITIES_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ countryCode: "BGR" }),
    next: { revalidate: 60 * 60 * 12 },
  });
  if (!response.ok) {
    throw new Error(`Econt cities failed: ${response.status}`);
  }
  const data = (await response.json()) as { cities?: EcontCity[] };
  cachedCities = (data.cities ?? []).map((city) => ({
    id: city.id,
    name: city.name,
    nameEn: city.nameEn,
    postCode: city.postCode,
  }));
  cachedAt = Date.now();
  return cachedCities;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") ?? "").trim().toLowerCase();
    const cities = await loadCities();
    const filtered = q
      ? cities
          .filter(
            (city) =>
              city.name.toLowerCase().includes(q) ||
              (city.nameEn ?? "").toLowerCase().includes(q) ||
              (city.postCode ?? "").includes(q),
          )
          .slice(0, 40)
      : cities
          .filter((city) =>
            ["София", "Пловдив", "Варна", "Бургас", "Русе"].includes(city.name),
          )
          .concat(cities.slice(0, 20));

    const unique = Array.from(
      new Map(filtered.map((city) => [city.id, city])).values(),
    ).slice(0, 40);

    return NextResponse.json({ cities: unique });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not load Econt cities" },
      { status: 502 },
    );
  }
}
