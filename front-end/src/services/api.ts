export function getAuthToken(): { Authorization?: string } {
  const token = localStorage.getItem('accessToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function setAuthHeader(headers: Headers): Headers {
  const { Authorization } = getAuthToken();
  if (Authorization) {
    headers.set('Authorization', Authorization);
  }
  return headers;
}
