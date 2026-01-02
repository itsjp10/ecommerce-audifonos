// services/auth.service.js
import { API } from "./api";

export async function login(data) {
  const res = await fetch(`${API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },    
    credentials: "include", //para enviar cookies
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function register(data) {
  const res = await fetch(`${API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },    
    credentials: "include", //para enviar cookies
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getSession() {
  const res = await fetch(`${API}/me`, {
    method: "GET",
    credentials: "include"
  });

  console.log("getSession response:", res);

  if (!res.ok) return { authenticated: false };

  return res.json();
}

export async function logOut(data) {
  const res = await fetch(`${API}/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },    
    credentials: "include", //para enviar cookies
    body: JSON.stringify(data)
  });
  return res.json();
}
