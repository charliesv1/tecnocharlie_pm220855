// components/ProductModal.js
import React from 'react';

export default function ProductModal({ isOpen, onRequestClose, product }) {
  if (!product) return null;

  // Mensajes específicos para los productos (actualiza según sea necesario)
  const messages = {
    1: "NVMe de 500GB, soporta temperturas desde -80°C hasta 80°C",
    2: "Juego de audífonos gaming alámbricos",
    3: "Disco Duro externo con capacidad de 2TB; 8000RPM",
    4: "MONITOR XIAOMI G27I PANTALLA FAST IPS FHD 27P 165Hz 1MS GtG HDR10 HDMI DP 52758",
    5: "MEMORIA USB 3.1 ADATA UV131 64GB GRIS RGY; Interfaz 3.0",
    6: "Cable HDMI®/TM 2.1 de ultra alta velocidad, de 1 m; calidad de imagen",
    7: "SSD ADATA SU650; velocidad de 500mbps/s",
    8: "Teclado mecánico REDDRAGON gaming con luces led",
    9: "Mouse para videojuegos",
    10: "Teclado inalámbrico recargable",
    11: "16GB 4DDRAM c/u",
    12: "Tarjeta gráfica intel 8GB",
    13: "Repite la señal del router esde dos puntos diferentes, 5m",
    14: "Alta conductividad (12.5 W/mK); color gris",
    15: "Procesador Inter Core 6 núcleos y 12 subprocesos.",
    16: "Touchpad externo def alta precisión",
    17: "Portátil, ultradelgada, tiene 6 ventiladores con velocidad entre 1800-2000RPM",
    18: "Lápiz táctil de uso cómodo para pantallas táctiles",
    19: "Altavoces Logitech Z625 SubWoofer 400W - THX - 980-001258. Ofrece un audio óptimo para videojuegos",
    20: "Adaptador HDD/SSD con USB 3.0"
  };

  const message = messages[product.id] || "Información del producto";

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <button onClick={onRequestClose} className="close-button">Cerrar</button>
        <h2>{product.name}</h2>
        <img src={product.image} alt={product.name} />
        <p>Precio: ${product.price}</p>
        <p>Disponible: {product.available}</p>
        <p>En Carrito: {product.cart}</p>
        <p>{message}</p> {/* Mostrar el mensaje específico */}
      </div>
      <style jsx>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          visibility: hidden;
          opacity: 0;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .modal.open {
          visibility: visible;
          opacity: 1;
        }
        .modal-content {
          background: white;
          color: black; /* Asegura que el texto sea negro */
          padding: 20px;
          border-radius: 8px;
          position: relative;
          max-width: 500px;
          width: 100%;
          text-align: center; /* Centra el texto */
        }
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #ffcccc; /* Rojo suave */
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          color: black; /* Texto negro */
          font-weight: normal;
          transition: background-color 0.3s, color 0.3s;
        }
        .close-button:hover {
          background-color: #ff9999; /* Rojo más oscuro */
          color: white; /* Texto blanco */
          font-weight: bold; /* Texto en negrita */
        }
        img {
          max-width: 100%;
          height: auto;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
}
