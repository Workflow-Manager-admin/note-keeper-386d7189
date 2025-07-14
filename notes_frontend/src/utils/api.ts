import axios from "axios";

// PUBLIC_INTERFACE
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
});

// PUBLIC_INTERFACE
export async function getAuthHeader() {
  // For demo - update to retrieve actual token from session if needed
  // const session = await getSession();
  // return { Authorization: `Bearer ${session?.accessToken}` };
  return {};
}
