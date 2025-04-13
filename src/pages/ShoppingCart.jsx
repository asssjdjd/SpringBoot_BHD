import React, { useEffect, useState } from "react";
import "./Cart.css"; // Giả sử bạn có file CSS để style
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
import userAPI from "../services/Api/UserService";
import { useDispatch } from "react-redux";
import { reserverBillFood } from "../features/redux/FoodSlide";
import { reserveBillFilm } from "../features/redux/FilmSlice";
import { useNavigate } from "react-router-dom";
import axiosClient from "../services/config/AxiosConfig";

const Cart = () => {
  // Dữ liệu giả lập từ thông tin bạn cung cấp
  const { theart_name, time } = useSelector((state) => state.film);
  const { total, amount, title } = useSelector((state) => state.food);
  const { id, time_buy_ticket } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // const navigate = useNavigate();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  
  
  const [emailData, setEmailData] = useState({
    to: 'phamthanhlong725@gmail.com',
    subject: 'Xác nhận đặt vé',
    body: ''
  });

  const handleChange = (name,value) => {
    console.log(value + name)
    setEmailData({ ...emailData, [name]: value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      await axiosClient.post('api/email/send', emailData);
      console.log(emailData)
      alert('Email sent!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const cartData = {
    theart_name: theart_name,
    time: time,
    total: total,
    amount: amount,
    title: title,
  };

  useEffect(() => {
    userAPI
      .getById(id)
      .then((res) => {
        setUser(res["data"]["response"]);
        handleChange("body",time_buy_ticket + " "  + [theart_name, title, amount] + total)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [id]);

  // Hàm xử lý khi nhấn nút "Mua hàng"
  const handlePurchase = () => {
    // Bạn có thể thêm logic xử lý đặt hàng tại đây, ví dụ gọi API
    const data = {
      time_buy: time_buy_ticket,
      user_id: user.username,
      description: [theart_name, title, amount],
      total: total,
    };
   
    handleSubmit()

    dispatch(reserverBillFood())
    dispatch(reserveBillFilm())
    console.log(data);
    toast("Đã đặt hàng thành công!");
    navigate('/home');
  };

  return (
    <div className="cart-container">
      <h2>Giỏ hàng</h2>
      <div className="cart-details">
        <p>
          <strong>Rạp chiếu phim:</strong> {cartData.theart_name}
        </p>
        <p>
          <strong>Thời gian chiếu:</strong> {cartData.time}
        </p>
        <p>
          <strong>Món ăn:</strong> {cartData.title}
        </p>
        <p>
          <strong>Số lượng:</strong> {cartData.amount}
        </p>
        <p>
          <strong>Tổng tiền:</strong> {cartData.total.toLocaleString("vi-VN")}{" "}
          VNĐ
        </p>
      </div>
      <button className="purchase-button" onClick={handlePurchase}>
        Mua hàng
      </button>
    </div>
  );
};

export default Cart;
