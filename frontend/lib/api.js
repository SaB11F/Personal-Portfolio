const DEFAULT_API_BASE = "http://localhost:5000/api";

const API_BASE = normalizeBaseUrl(
  process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_BASE
);

const request = async (path, options) => {
  const response = await fetch(`${API_BASE}${normalizePath(path)}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, "");
}

function normalizePath(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

export const fetchPortfolio = () => request("/portfolio");

export const submitContact = (payload) =>
  request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
