import { Platform } from "react-native";

const API_BASE =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === "web"
    ? "http://localhost:5000/api"
    : "http://localhost:5000/api");

const request = async (path, options) => {
  const response = await fetch(`${API_BASE}${path}`, {
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

export const fetchPortfolio = () => request("/portfolio");

export const submitContact = (payload) =>
  request("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
