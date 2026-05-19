import { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { LogIn, LogOut, RadioTower } from "lucide-react";
import { auth } from "../../lib/firebase.js";
import { useAuthUser } from "../../hooks/useAuthUser.js";

export default function AuthGate({ children }) {
  const { user, loading, authRequired } = useAuthUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function submit(event) {
    event.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Login gagal. Periksa email dan password operator.");
    }
  }

  if (loading) {
    return (
      <main className="auth-page">
        <RadioTower size={34} />
        <strong>Memeriksa sesi operator</strong>
      </main>
    );
  }

  if (authRequired && !user) {
    return (
      <main className="auth-page">
        <form className="auth-card" onSubmit={submit}>
          <img src="/aset/logo/event/logo-mandar-culture-festival.png" alt="Mandar Culture Festival" />
          <div>
            <p>Control Panel</p>
            <h1>Login Operator</h1>
          </div>
          <label>
            <span>Email</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </label>
          <label>
            <span>Password</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          {error && <small>{error}</small>}
          <button type="submit">
            <LogIn size={18} />
            Masuk
          </button>
        </form>
      </main>
    );
  }

  return (
    <>
      {authRequired && (
        <button type="button" className="logout-button" onClick={() => signOut(auth)} title={user?.email || "Operator"}>
          <LogOut size={16} />
          Keluar
        </button>
      )}
      {children}
    </>
  );
}
