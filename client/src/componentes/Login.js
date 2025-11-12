import { useState, useEffect } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    if (mensaje) setMensaje("");
  }, [email, pass]);

  async function handleSubmit(e) {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass  = pass.trim();

    if (!cleanEmail || !cleanPass) {
      setMensaje("Completa email y contraseña.");
      return;
    }

    try {
      setCargando(true);

      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPass }),
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setMensaje("Ingreso correcto. Redirigiendo…");
        onLogin && onLogin(data.user);
      } else {
        setMensaje(data.message || "Credenciales no coinciden.");
      }
    } catch (err) {
      setMensaje("Error de red/servidor.");
    } finally {
      setCargando(false);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Login del Dashboard</h2>
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: 8 }}>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            placeholder="tu@correo.com"
          />
        </label>

        <label style={{ display: "block", marginBottom: 12 }}>
          Contraseña
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            style={{ width: "100%", padding: 8, marginTop: 4 }}
            placeholder="********"
          />
        </label>

        <button
          type="submit"
          disabled={cargando}
          style={{ width: "100%", padding: 10, cursor: "pointer" }}
        >
          {cargando ? "Validando..." : "Ingresar"}
        </button>
      </form>

      {mensaje && (
        <p style={{ marginTop: 12, color: mensaje.includes("correcto") ? "green" : "crimson" }}>
          {mensaje}
        </p>
      )}
    </div>
  );
}
