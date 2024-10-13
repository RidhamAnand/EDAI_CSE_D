const API_URL = "http://localhost:5000/api/auth";

async function handleResponse(response) {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "An error occurred");
  }
  return data;
}

async function fetchWithCredentials(url, options = {}) {
  return fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      ...options.headers,
      "Content-Type": "application/json",
    },
  });
}

export async function loginVictim(credentials) {
  const response = await fetchWithCredentials(`${API_URL}/login-victim`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

export async function registerVictim(credentials) {
  const response = await fetchWithCredentials(`${API_URL}/register-victim`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

export async function loginVolunteer(credentials) {
  const response = await fetchWithCredentials(`${API_URL}/login-volunteer`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

export async function registerVolunteer(credentials) {
  const response = await fetchWithCredentials(`${API_URL}/register-volunteer`, {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return handleResponse(response);
}

// Add a new function to check authentication status
export async function checkAuthStatus() {
  const response = await fetchWithCredentials(`${API_URL}/me`);
  return handleResponse(response);
}
