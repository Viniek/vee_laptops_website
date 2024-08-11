import React, { useState, useEffect } from 'react';
import useUserStore from '../../../store/useUserStore';
import axios from 'axios';
import toast from "react-simple-toasts"; 

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userr = useUserStore((state) => state.user);

  useEffect(() => {
    const getCartItems = async () => {
      if (!userr) {
        setError("User not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/cart/cartProducts', { withCredentials: true });
        const itemsWithQuantity = response.data.data.map(item => ({ ...item, quantity: 1 })); // Initialize with quantity 1
        setCartItems(itemsWithQuantity); 
      } catch (error) {
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, [userr]);

  const increaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const deleteCartItem = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:4000/cart/deleteCartProduct/${id}`, { withCredentials: true });
      if (response.data.success) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        toast("Product deleted successfully...");
      } else {
        toast("Error while deleting product");
      }
    } catch (error) {
      toast("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.product.productPrice * item.quantity, 0);
  };

  if (loading) {
    return <p>Loading Products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='cartSection'>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <tr key={product.id}>
              <td>{product.product.productName}</td>
              <td>{product.product.productPrice}</td>
              <td>
                <button onClick={() => decreaseQuantity(product.id)}>-</button>
                {product.quantity}
                <button onClick={() => increaseQuantity(product.id)}>+</button>
              </td>
              <td>
                <button onClick={() => deleteCartItem(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Total Price: ${calculateTotalPrice().toFixed(2)}</h3>
    </div>
  );
}

export default Cart;
