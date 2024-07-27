// src/app/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../../components/Header';
import ProductList from '../../components/ProductList';

//Agregando los productos al catálogo
//Listados enid,nombre, imagen, precio, disponibilidad y cantidad que se quiere enviar al carrito
const initialProducts = [
  {
    id: 1,
    name: 'NVME M.2 500GB',
    image: 'https://valdes.com.sv/wp-content/uploads/2022/03/SNVS500G.jpg',
    price: 80,
    available: 20,
    cart: 0,
  },
  {
    id: 2,
    name: 'Headsets JBL',
    image: 'https://www.zonadigitalsv.com/product/050036390224/image',
    price: 39.85,
    available: 15,
    cart: 0,
  },
  {
    id: 3,
    name: 'External HDD 2TB',
    image:'https://www.zonadigitalsv.com/product/4713218469021/image',
    price: 99,
    available: 20,
    cart: 0,
  },
  {
    id: 4,
    name: 'Monitor',
    image:'https://www.zonadigitalsv.com/product/190997005871/image',
    price: 175,
    available: 15,
    cart: 0,
  },
  {
    id: 5,
    name: 'Memoria USB',
    image: 'https://www.zonadigitalsv.com/product/4712366960091/image',
    price: 6.95,
    available: 20,
    cart: 0,
  },
  {
    id: 6,
    name: 'Cable HDMI',
    image: 'https://medicomp.sv/product/HDMI/image',
    price: 6,
    available: 15,
    cart: 0,
  },
  {
    id: 7,
    name: 'SSD 960GB  ',
    image: 'https://webapi3.adata.com/storage/product/23_p_su650_02_0628.jpg',
    price: 75,
    available: 20,
    cart: 0,
  },
  {
    id: 8,
    name: 'Teclado mecánico REDDRAGON',
    image: 'https://www.zonadigitalsv.com/product/6950376713094/image',
    price: 55.55,
    available: 15,
    cart: 0,
  },
  {
    id: 9,
    name: 'Mouse gaming',
    image:'https://www.zonadigitalsv.com/product/6948391225371/image',
    price: 10.95,
    available: 20,
    cart: 0,
  },
  {
    id: 10,
    name: 'Teclado inalámbrico',
    image:'https://www.zonadigitalsv.com/product/097855088789/image',
    price: 19.95,
    available: 15,
    cart: 0,
  },
  {
    id: 11,
    name: 'Memoria RAM',
    image: 'https://www.zonadigitalsv.com/product/4711085936417/image',
    price: 69.95,
    available: 20,
    cart: 0,
  },
  {
    id: 12,
    name: 'Tarjeta de video',
    image: 'https://www.zonadigitalsv.com/product/195553309899/image',
    price: 419,
    available: 15,
    cart: 0,
  },
  {
    id: 13,
    name: 'Repetidow Wi-Fi',
    image: 'https://www.steren.com.sv/media/catalog/product/cache/b69086f136192bea7a4d681a8eaf533d/image/22108ca3c/repetidor-wi-fi-de-doble-banda-2-4-ghz-y-5-ghz-b-g-n-a-ac-hasta-40-m-de-cobertura.jpg',
    price: 40.99,
    available: 20,
    cart: 0,
  },
  {
    id: 14,
    name: 'Pasta térmica',
    image: 'https://www.zonadigitalsv.com/product/4260711990038/image',
    price: 9.95,
    available: 15,
    cart: 0,
  },
  {
    id: 15,
    name: 'Procesador Intel Core',
    image:'https://www.zonadigitalsv.com/product/735858446006/image',
    price: 395,
    available: 20,
    cart: 0,
  },
  {
    id: 16,
    name: 'Touchpad USB',
    image:'https://images-cdn.ubuy.co.in/6346bfbd91fb3f169374b742-seenda-touchpad-trackpad-external-usb.jpg',
    price: 54,
    available: 15,
    cart: 0,
  },
  {
    id: 17,
    name: 'Ventilador laptop',
    image: 'https://www.zonadigitalsv.com/product/798430163814/image',
    price: 22.95,
    available: 20,
    cart: 0,
  },
  {
    id: 18,
    name: 'Lápiz táctil',
    image: 'https://www.ecotech.com.sv/image/cache/catalog/Productos/L3324-548x548.jpg',
    price: 2.25,
    available: 15,
    cart: 0,
  },
  {
    id: 19,
    name: 'Altavoces',
    image: 'https://aeon.com.sv/web/image/product.product/3327/image_1024/%5B3868%5D%20Altavoces%20Logitech%20Z625%20SubWoofer%20400W%20-%20THX%20-%20%20980-001258?unique=91f7a72',
    price: 6.95,
    available: 20,
    cart: 0,
  },
  {
    id: 20,
    name: 'Enclosure HDD/SSD',
    image: 'https://www.zonadigitalsv.com/product/886540002724/image',
    price: 9.95,
    available: 15,
    cart: 0,
  },

];

export default function Home() {
  //Estado para almacenar productos
  const [products, setProducts] = useState(initialProducts);
  //Hook para manejar la navegación
  const router = useRouter();

//Carga los productos almacenados en localstorage al montar el componente
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('products')) || initialProducts;
    setProducts(storedProducts);
  }, []);

  //Guarda los productos actualizados en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  //añadiendo al carro
  const addToCart = (productId) => {
    setProducts(products.map(product => 
      product.id === productId && product.cart < product.available
        ? { ...product, cart: product.cart + 1 }
        : product
    ));
  };
//Removiendo del carro
  const removeFromCart = (productId) => {
    setProducts(products.map(product => 
      product.id === productId && product.cart > 0
        ? { ...product, cart: product.cart - 1 }
        : product
    ));
  };
//Guardando en el carro
  const saveCart = () => {
    const updatedProducts=products.map(product=>{
      const cartProduct=products.find(p=>p.id===product.id);
      return{
        ...product,
        available: product.available-cartProduct.cart,//Actualiza la disponibilidad de los productos
        cart:0//vacía el cararito
      }
    });
    setProducts(updatedProducts);
    localStorage.setItem('products',JSON.stringify(updatedProducts));
    localStorage.setItem('cart',JSON.stringify(products));
    router.push('/cart');
  };

  return (
    <div>
      <Header />
      <ProductList 
        products={products} 
        addToCart={addToCart} 
        removeFromCart={removeFromCart} 
      />
      <button onClick={saveCart}>Guardar carrito</button>
      <style jsx>{`
        button {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;/* Negrita*/
        }
        button:hover {
          background-color: #005bb5;
        }
      `}</style>
    </div>
  );
}
