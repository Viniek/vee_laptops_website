import React, { useState, useEffect } from "react";
import useUserStore from "../../../store/useUserStore";
import axios from "axios";

function Cart() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
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
        const response = await axios.get(
          "http://localhost:4000/cart/cartProducts",
          { withCredentials: true },
        );
        console.log(response.data.data);
        setCartItems(response.data.data);
        console.log(cartItems);
      } catch (error) {
        console.log(error.message);
        console.error(error);

        setError("Failed to fetch cart items");
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, [user]);

  if (loading) {
    return <p>Loading Products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="cartSection">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.map((product) => (
          <tr key={product.id}>
            <td>{product.product.productName}</td>
            <td>{product.product.productPrice}</td>
          </tr>
        ))}
      </tbody>
    </div>
  );
}

export default Cart;
{
  /* {cartItems.map((product) => (
        <div className='cartProducts' key={product.id}> 
               

           <p>{product.product.productName}</p>
          <p>{product.product.productPrice}</p> 
        </div>
      ))} */
}
