// src/utils/secureFetch.js

export async function secureFetch(url, options = {}) {

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  // Attach JWT if exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  // Auto logout if unauthorized
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    window.location.href = "/login";
    return;
  }

  return response;
}
