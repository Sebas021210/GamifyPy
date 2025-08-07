export async function refreshAccessToken() {
    try {
        const res = await fetch("http://localhost:8000/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        if (!res.ok) throw new Error("No se pudo refrescar el token");

        const data = await res.json();
        localStorage.setItem("access_token", data.access_token);
        return data.access_token;
    } catch (err) {
        console.error("Error al refrescar token:", err);
        return null;
    }
}
