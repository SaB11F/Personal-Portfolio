const LOCAL_API_BASE = "http://localhost:5000/api";
const API_BASE = resolveApiBaseUrl();

const request = async (path, options) => {
  if (!API_BASE) {
    throw new Error(
      "API base URL is not configured. Set EXPO_PUBLIC_API_URL for deployed builds."
    );
  }

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

function resolveApiBaseUrl() {
  const explicitBase = process.env.EXPO_PUBLIC_API_URL?.trim();

  if (explicitBase) {
    return normalizeBaseUrl(explicitBase);
  }

  if (isLocalDevelopmentHost()) {
    return LOCAL_API_BASE;
  }

  return null;
}

function isLocalDevelopmentHost() {
  if (typeof window === "undefined") {
    return process.env.NODE_ENV !== "production";
  }

  return ["localhost", "127.0.0.1"].includes(window.location.hostname);
}

export const submitContact = (payload) =>
  request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
