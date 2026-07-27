"use client";

import { useEffect, useMemo, useState } from "react";

type City = {
  id: number;
  name: string;
  nameEn?: string;
  postCode?: string;
};

type Office = {
  code: string;
  name: string;
  nameLocal: string;
  address: string;
};

type EcontOfficePickerProps = {
  labels: {
    citySearch: string;
    cityPlaceholder: string;
    office: string;
    officePlaceholder: string;
    officeLoading: string;
    officeEmpty: string;
    findMap: string;
    selected: string;
  };
  locale: string;
  onCityMeta?: (city: City | null) => void;
};

export function EcontOfficePicker({
  labels,
  locale,
  onCityMeta,
}: EcontOfficePickerProps) {
  const [cityQuery, setCityQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedOfficeCode, setSelectedOfficeCode] = useState("");
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingOffices, setLoadingOffices] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(async () => {
      setLoadingCities(true);
      try {
        const q = encodeURIComponent(cityQuery.trim());
        const response = await fetch(`/api/econt/cities?q=${q}`);
        const data = (await response.json()) as { cities?: City[] };
        setCities(data.cities ?? []);
      } catch {
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [cityQuery]);

  useEffect(() => {
    if (!selectedCity) {
      setOffices([]);
      setSelectedOfficeCode("");
      onCityMeta?.(null);
      return;
    }
    onCityMeta?.(selectedCity);
    let cancelled = false;
    (async () => {
      setLoadingOffices(true);
      try {
        const response = await fetch(
          `/api/econt/offices?cityId=${selectedCity.id}`,
        );
        const data = (await response.json()) as { offices?: Office[] };
        if (!cancelled) {
          setOffices(data.offices ?? []);
          setSelectedOfficeCode("");
        }
      } catch {
        if (!cancelled) setOffices([]);
      } finally {
        if (!cancelled) setLoadingOffices(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selectedCity, onCityMeta]);

  const selectedOffice = useMemo(
    () => offices.find((office) => office.code === selectedOfficeCode) ?? null,
    [offices, selectedOfficeCode],
  );

  const officeLabel = (office: Office) => {
    const title = locale === "bg" ? office.nameLocal || office.name : office.name;
    return office.address ? `${title} — ${office.address}` : title;
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="econtCitySearch">{labels.citySearch}</label>
        <input
          id="econtCitySearch"
          value={cityQuery}
          onChange={(event) => {
            setCityQuery(event.target.value);
            setSelectedCity(null);
          }}
          placeholder={labels.cityPlaceholder}
          autoComplete="off"
        />
        {loadingCities ? (
          <p className="mt-2 text-xs text-muted">{labels.officeLoading}</p>
        ) : null}
        {cities.length > 0 && !selectedCity ? (
          <ul className="mt-2 max-h-48 overflow-auto border border-border bg-surface">
            {cities.map((city) => (
              <li key={city.id}>
                <button
                  type="button"
                  className="block w-full cursor-pointer px-3 py-2 text-left text-sm text-foreground hover:bg-background"
                  onClick={() => {
                    setSelectedCity(city);
                    setCityQuery(
                      locale === "bg"
                        ? city.name
                        : city.nameEn || city.name,
                    );
                  }}
                >
                  {locale === "bg" ? city.name : city.nameEn || city.name}
                  {city.postCode ? ` (${city.postCode})` : ""}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div>
        <label htmlFor="econtOfficeSelect">{labels.office}</label>
        <select
          id="econtOfficeSelect"
          value={selectedOfficeCode}
          onChange={(event) => setSelectedOfficeCode(event.target.value)}
          required
          disabled={!selectedCity || loadingOffices || offices.length === 0}
          className="mt-1 w-full"
        >
          <option value="">
            {loadingOffices
              ? labels.officeLoading
              : offices.length === 0
                ? labels.officeEmpty
                : labels.officePlaceholder}
          </option>
          {offices.map((office) => (
            <option key={office.code} value={office.code}>
              {officeLabel(office)}
            </option>
          ))}
        </select>
        <a
          href="https://www.econt.com/find-office"
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex text-xs tracking-[0.12em] text-accent uppercase hover:text-foreground"
        >
          {labels.findMap} →
        </a>
      </div>

      <input
        type="hidden"
        name="econtOfficeCode"
        value={selectedOffice?.code ?? ""}
      />
      <input
        type="hidden"
        name="econtOfficeName"
        value={
          selectedOffice
            ? officeLabel(selectedOffice)
            : ""
        }
      />

      {selectedOffice ? (
        <p className="text-xs text-muted">
          {labels.selected}: {officeLabel(selectedOffice)}
        </p>
      ) : null}
    </div>
  );
}
