import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";
import config from "../config";


function ProductList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const authconfig = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          `${config.API_URL}/admin/getProductsByCategory/${id}`,
          authconfig
        );

        const initializedProducts = response.data.map((product) => ({
          ...product,
          quantity: product.quantity > 0 ? 1 : 0,
        }));
        setProducts(initializedProducts);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId, action) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.productId === productId
          ? {
              ...product,
              quantity:
                action === "increase"
                  ? product.quantity + 1
                  : Math.max(1, product.quantity - 1),
            }
          : product
      )
    );
  };

  const handleAddToCart = async (product, quantity) => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      toast.warn("Please login to add items to the cart.", {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        "http://localhost:5050/customer/addToCart",
        {
          userId,
          productId: product.productId,
          quantity,
        },
        config
      );

      toast.success(`${product.productName} added to cart!`, {
        position: "top-right",
        autoClose: 1000,
      });

      setTimeout(() => {
        navigate(`/viewcart/${userId}`);
      }, 1500);
    } catch (error) {
      toast.error("Insufficient Stock!");
    }
  };

  if (loading) return <p className="loading">Loading products...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="product-theme">
      <ToastContainer />
      <div className="product-list-container">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="product-card" key={product.productId}>
              <div className="product-image-wrapper">
                {product.productImage && (
                  <img
                    src={`data:image/png;base64,${product.productImage}`}
                    alt={product.productName}
                    className="product-image"
                  />
                )}
              </div>
              <h3 className="product-name">{product.productName}</h3>
              <p className="product-price">₹{product.price}</p>

              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() =>
                    handleQuantityChange(product.productId, "decrease")
                  }
                  disabled={product.quantity <= 1}
                >
                  -
                </button>
                <span className="quantity-display">{product.quantity}</span>
                <button
                  className="quantity-button"
                  onClick={() =>
                    handleQuantityChange(product.productId, "increase")
                  }
                  disabled={product.quantity === 0}
                >
                  +
                </button>
              </div>

              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product, product.quantity)}
                disabled={product.quantity === 0}
              >
                {product.quantity === 0 ? "Out Of Stock" : "Add to Cart"}
              </button>
            </div>
          ))
        ) : (
          <p className="empty-product-message">No products found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
