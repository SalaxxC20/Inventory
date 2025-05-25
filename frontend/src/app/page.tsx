"use client";

import styles from "@/app/page.module.css";
import useLogin from "@/hooks/sesion/useLogin";
import { useState } from "react";

export default function Login() {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handeLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = {
      name,
      password,
    };
    if (name === "" || password === "") {
      alert("Por favor completa todos los campos");
      return;
    }
    const Login = () => useLogin(JSON.stringify(data));
    const result = await Login();
    if (result) {
      alert(result.message);
      if (result.result) {
        window.location.href = "/home";
      }
    }
  };

  return (
    <div className={styles.LoginForm}>
      <h1>Inventory</h1>
      <form action="">
        <label htmlFor="">Usuario</label>
        <input onInput={(e) => setName(e.currentTarget.value)} type="text" />
        <label htmlFor="">Contraseña</label>
        <input
          onInput={(e) => setPassword(e.currentTarget.value)}
          type="password"
        />
        <button onClick={handeLogin}>Ingresar</button>
      </form>
    </div>
  );
}
