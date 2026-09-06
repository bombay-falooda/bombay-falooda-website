"use client";

import { COUNTRY_CODES } from "@/lib/countries";

type CountryCodePickerProps = {
  value?: string; // dialCode e.g. "+91"
  onChange?: (dialCode: string) => void;
};

export function CountryCodePicker({ value = "+91" }: CountryCodePickerProps) {
  const selectedCountry =
    COUNTRY_CODES.find((c) => c.dialCode === value) || COUNTRY_CODES[0];

  return (
    <div className="flex h-12 shrink-0 items-center gap-2 rounded-2xl border border-pink-100 bg-white px-3.5 text-sm font-semibold text-slate-800 shadow-sm select-none">
      <img
        src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
        alt={selectedCountry.name}
        className="h-4 w-5 rounded-[3px] object-cover shadow-xs"
      />
      <span>{selectedCountry.dialCode}</span>
    </div>
  );
}
