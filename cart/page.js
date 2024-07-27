// src/app/cart/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]); // Estado para almacenar los artículos en el carrito
  const [products, setProducts] = useState([]); // Estado para almacenar los productos disponibles
  const router = useRouter(); // Hook para manejar redireccionamiento

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart.filter(item => item.cart > 0));  // Filtra productos con cantidad > 0

    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.cart, 0);

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.map(item =>
      item.id === productId && item.cart > 0
        ? { ...item, cart: item.cart - 1 }
        : item
    );
    setCartItems(updatedCart);

    const updatedProducts = products.map(product =>
      product.id === productId
        ? { ...product, available: product.available + 1 }
        : product
    );
    setProducts(updatedProducts);

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const handleEmptyCart = () => {
    const confirmEmpty = window.confirm("¿Estás seguro que quieres vaciar el carrito?");
    if (confirmEmpty) {
      const updatedProducts = products.map(product =>
        product.cart > 0
          ? { ...product, available: product.available + product.cart, cart: 0 }
          : product
      );
      setProducts(updatedProducts);
      setCartItems([]);

      localStorage.setItem('cart', JSON.stringify([]));
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }
  };

  const handleCheckout = () => {
    const confirmCheckout = window.confirm("¿Estás seguro que quieres finalizar la compra?");
    if (confirmCheckout) {
      alert("Compra realizada con éxito");
      localStorage.removeItem('cart');
      setCartItems([]);
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Carrito</h1>
      <Link href="/"><button>Regresar a la tienda</button></Link>
      <div className="cart">
        {cartItems.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="details">
              <h2>{item.name}</h2>
              <p>Precio: ${item.price}</p>
              <p>Cantidad: {item.cart}</p>
              <p>Total: ${item.price * item.cart}</p>
              <button onClick={() => handleRemoveFromCart(item.id)} disabled={item.cart === 0}>-</button>
            </div>
          </div>
        ))}
      </div>
      <h2>Total a pagar: ${total.toFixed(2)}</h2>
      <button onClick={handleEmptyCart}>Vaciar Carrito</button>
      <button onClick={handleCheckout}>Finalizar Compra</button>
      <style jsx>{`
        .cart {
          display: flex;
          flex-direction: column;
        }
        .cart-item {
          display: flex;
          align-items: center;
          border-bottom: 1px solid #ccc;
          padding: 10px 0;
        }
        .cart-item img {
          max-width: 100px;
          margin-right: 20px;
        }
        .details {
          flex: 1;
        }
        button {
          margin-top: 10px;
          padding: 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        button:hover {
          background-color: #005bb5;
          color: white;
        }
      `}</style>
    </div>
  );
}

