// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <h1>¡Bienvenido a TecnoCharlie!</h1>
      <Link href="/cart"><button>Ir al Carrito</button></Link>
      <style jsx>{`
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 20px;
          background-color: #333; /* Fondo oscuro */
          color: white; /* Letras blancas */
          border-bottom: 1px solid #444; /* Línea inferior */
        }
        h1 {
          margin: 0;
        }
        button {
          padding: 10px 20px;
          background-color: #0070f3; /* Color del botón */
          color: white; /* Texto blanco del botón */
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        button:hover {
          background-color: #005bb5; /* Color del botón al pasar el mouse */
        }
      `}</style>
    </header>
  );
}
