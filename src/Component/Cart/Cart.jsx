import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CartContext } from '../../context/CartContext';
import Payment from '../Payment/Payment';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faTrash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cart, setCart, token, removeFromCart } = useContext(CartContext);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.price * curr.quantity, 0));
  }, [cart]);

  const cartquantity = () => cart.reduce((count, item) => count + (Number(item.quantity) || 0), 0);

  // دالة موحدة لتحديث الكمية لتقليل تكرار الكود
  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeFromCart(productId);
      return;
    }
    try {
      const response = await fetch('https://alzain.onrender.com/api/cart/update-quantity', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });

      if (!response.ok) throw new Error('Failed to update');
      
      const updatedCart = await response.json();
      const normalizedCart = updatedCart.items?.map((item) => {
        const product = typeof item.productId === 'object' ? item.productId : {};
        return {
          productId: product._id || item.productId,
          name: product.name || 'منتج غير معروف',
          description: product.description || '',
          image: product.images ? (product.images[0]?.image || '') : (product.image || ''),
          price: product.price || 0,
          quantity: item.quantity ?? 1,
        };
      }) || [];
      setCart(normalizedCart);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 pt-32 pb-20" dir="rtl">
      <Container>
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-[#0C574C] p-3 rounded-2xl text-white">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          </div>
          <h2 className="text-3xl font-bold text-[#0C574C] font-['Aref_Ruqaa']">سلة المشتريات</h2>
        </div>

        <Row className="gy-4">
          {/* قائمة المنتجات */}
          <Col lg={8}>
            <div className="bg-white rounded-[30px] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 bg-gray-50/50 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-700">المنتجات المختارة</span>
                <span className="bg-[#0C574C] text-white px-3 py-1 rounded-full text-sm">
                  {cartquantity()} قطع
                </span>
              </div>

              <div className="p-4">
                <AnimatePresence>
                  {cart.length === 0 ? (
                    <div className="text-center py-20">
                      <p className="text-gray-400 text-xl font-['Cairo']">سلتك فارغة حالياً.. زينها بمنتجاتنا!</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <motion.div
                        key={item.productId}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex flex-col md:flex-row items-center gap-4 p-4 mb-4 border border-gray-50 rounded-2xl hover:bg-gray-50/50 transition-colors"
                      >
                        {/* صورة المنتج */}
                        <div className="w-24 h-24 rounded-2xl overflow-hidden bg-white border border-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>

                        {/* معلومات المنتج */}
                        <div className="flex-grow text-center md:text-right">
                          <h5 className="font-bold text-gray-800 mb-1 font-['Cairo']">{item.name}</h5>
                          <p className="text-sm text-gray-500 line-clamp-1 mb-2">{item.description}</p>
                          <span className="text-[#0C574C] font-bold">{item.price} ر.س</span>
                        </div>

                        {/* التحكم في الكمية */}
                        <div className="flex items-center gap-4 bg-gray-100 p-2 rounded-xl">
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-[#0C574C] hover:bg-[#0C574C] hover:text-white transition-all shadow-sm"
                          >
                            <FontAwesomeIcon icon={faPlus} size="xs" />
                          </button>
                          
                          <span className="font-bold w-6 text-center">{item.quantity}</span>
                          
                          <button 
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center bg-white rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                          >
                            <FontAwesomeIcon icon={item.quantity === 1 ? faTrash : faMinus} size="xs" />
                          </button>
                        </div>

                        {/* المجموع الفرعي */}
                        <div className="min-w-[100px] text-center font-bold text-gray-800">
                          {(item.price * item.quantity).toLocaleString()} ر.س
                        </div>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Col>

          {/* ملخص الدفع */}
          <Col lg={4}>
            <div className="bg-white rounded-[30px] shadow-xl border border-gray-50 p-6 sticky top-32">
              <h4 className="font-['Aref_Ruqaa'] text-2xl text-[#0C574C] mb-6 border-b pb-4">ملخص الطلب</h4>
              
              <div className="space-y-4 mb-6 font-['Cairo']">
                <div className="flex justify-between text-gray-600">
                  <span>عدد المنتجات:</span>
                  <span className="font-bold">{cartquantity()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>الشحن:</span>
                  <span className="text-green-600 font-bold">مجاني</span>
                </div>
                <hr className="border-dashed" />
                <div className="flex justify-between text-xl text-[#0C574C] font-black">
                  <span>الإجمالي:</span>
                  <span>{total.toLocaleString()} ر.س</span>
                </div>
              </div>

              <div className="mt-8">
                <Payment />
              </div>
              
              <p className="text-[10px] text-center text-gray-400 mt-4 px-4 font-['Cairo']">
                بإتمامك للطلب، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بمتجر الزين.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Cart;