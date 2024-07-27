// components/ProductList.js
import React, { useState } from 'react';
import ProductModal from './ProductModal';

export default function ProductList({ products, addToCart, removeFromCart }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Abriendo la ventana modal del producto que se seleccionó
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };
//Cerrando el modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (!products || products.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  return (
    <>
      <div className="products">
        {products.map(product => (
          <div key={product.id} className="product">
            <img 
              src={product.image} 
              alt={product.name} 
              onClick={() => openModal(product)} 
            />
            <h2>{product.name}</h2>
            <p>Precio: ${product.price}</p>
            <p>Disponible: {product.available}</p>
            <p>En Carrito: {product.cart}</p>
            <div>
              <button 
                className="minus-button"
                onClick={() => removeFromCart(product.id)}
                disabled={product.cart === 0}
              >
                -
              </button>
              <button 
                className="plus-button"
                onClick={() => addToCart(product.id)}
                disabled={product.cart >= product.available}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && 
        <ProductModal 
          isOpen={isModalOpen} 
          onRequestClose={closeModal} 
          product={selectedProduct} 
        />
      }
      <style jsx>{`
        .products {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 10px;
          color: black; /* Color del texto */
        }
        .product {
          border: 1px solid #ccc;
          padding: 10px;
          text-align: center;
          background-color: #fff;
          border-radius: 5px;
          color: black; /* Color del texto */
          cursor: pointer; /* Cambia el cursor para indicar que es clickeable */
        }
        img {
          max-width: 150px;
          margin-bottom: 10px;
        }
        h2, p {
          color: black; /* Color del texto */
        }
        .minus-button, .plus-button {
          font-weight: bold; /* Texto en negrita */
          padding: 10px 20px; /* Ajustar tamaño del botón */
          border-radius: 5px;
          cursor: pointer;
          color: black;
          border: none;
        }
        .minus-button {
          background-color: #ffcccc; /* Rojo suave */
        }
        .minus-button:hover {
          background-color: #ff9999; /* Rojo más oscuro */
        }
        .plus-button {
          background-color: #ccffff; /* Celeste */
        }
        .plus-button:hover {
          background-color: #99ccff; /* Azul */
        }
        button {
          margin: 5px;
        }
      `}</style>
    </>
  );
}
