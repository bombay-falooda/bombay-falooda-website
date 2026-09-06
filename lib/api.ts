const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://bombay-falooda-backend.onrender.com/api"
    : "http://localhost:4000/api");


export type WebsiteOutlet = {
  id: string;
  name: string;
  code: string;
  address: string;
  phone?: string | null;
  dineIn: boolean;
  takeaway: boolean;
  delivery: boolean;
  outletBaseCharge: number;
  deliveryKmPricing: Array<{ km: number; price: number }>;
  distanceKm?: number | null;
  isEligible: boolean;
  websitePosOnline: boolean;
  thirdPartyLinks: Array<{ label: string; url: string }>;
};

export type WebsiteMenuItem = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  price: number;
  addonGroups: Array<{
    id: string;
    name: string;
    minSelect: number;
    maxSelect: number;
    isRequired: boolean;
    addons: Array<{ id: string; name: string; price: number }>;
  }>;
};

export type WebsiteMenuCategory = {
  id: string;
  name: string;
  items: WebsiteMenuItem[];
};

export async function websiteRequest<T>(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message =
      data?.message instanceof Array
        ? data.message.join(", ")
        : data?.message || "Request failed";
    throw new Error(message);
  }

  return data as T;
}
