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
        console.log(userr);
        setError("User not logged in");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:4000/cart/cartProducts', { withCredentials: true });
        console.log(response.data.data);
        setCartItems(response.data.data); 
      } catch (error) {
        console.log(error.message);
        console.error(error);
        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, [userr]); 

  const deleteCartItem = async (id) => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:4000/cart/deleteCartProduct/${id}`, { withCredentials: true });
      console.log(response);

      if (response.data.success) {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
        toast("Product deleted successfully...");
      } else {
        toast("Error while deleting product");
      }
    } catch (error) {
      console.log(error.message);
      toast("Failed to delete product");
    } finally {
      setLoading(false);
    }
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product) => (
            <tr key={product.id}>
              <td>{product.product.productName}</td>
              <td>{product.product.productPrice}</td>
              <td>
                <button onClick={() => deleteCartItem(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Cart;
