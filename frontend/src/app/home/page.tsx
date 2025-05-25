'use client'

import Link from "next/link";
import { useState } from "react";

export default function Home(
  
) {
  /// valor, el que cambia el valor, valor inicial
  const [nombre, setNombre] = useState<string>("Carlos");
  return (
    <div>
      <h2>INicio</h2>
      <Link href="/">
       <button>Volver</button>
      </Link>

      <p>{nombre}</p>
      <input type="text" onInput={(e) => setNombre(e.currentTarget.value)} />
    </div>
  )
}