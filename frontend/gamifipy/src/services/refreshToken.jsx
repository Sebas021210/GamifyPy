import { API_URL } from '../config';

export async function refreshAccessToken() {
    try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) return null;

        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (!res.ok) throw new Error("No se pudo refrescar el token");

        const data = await res.json();
        localStorage.setItem("token", data.access_token);
        return data.access_token;
    } catch (err) {
        console.error("Error al refrescar token:", err);
        return null;
    }
}
