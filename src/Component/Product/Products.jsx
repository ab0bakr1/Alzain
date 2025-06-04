import React, { useEffect, useContext, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './Products.css';
import { CartContext } from '../../context/CartContext';

export const Products = () => {
  const [product, setProduct] = useState([]);
  const { cart, setCart, token, addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);


  // التحقق إذا كان المنتج موجود بالفعل في السلة
  const isInCart = (productId) => {
    return cart.some((item) => item.productId === productId);
  };

  return (
    <section>
      <Container>
        <h3 className="text-center my-3 my-md-5">Products</h3>
        <Row className="justify-content-around align-items-center gap-5 my-5">
          {product.map((product) => (
            <div key={product._id} className="cardProduct">
              <div id="cardnewfilter">
                <p>NEW</p>
              </div>
              <div id="cardbrightfilter"></div>
              <div id="cardtop">
                <img src={product.images[0].image} alt={product.name} className="img-fluid" />
              </div>
              <div id="cardbottom">
                <p id="cardbottomtitle">{product.name}</p>
                <p id="cardbottomdesc">{product.description}</p>
                <hr />
                <div id="cardbottombutton">
                  <p id="cardbottomprice">${product.price}</p>
                  <button className="btn btn-success" onClick={() => addToCart(product._id)}>
                    {isInCart(product._id) ? 'إزالة من السلة' : 'إضافة إلى السلة'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Products;
