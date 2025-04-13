import React, { useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import img from "../pages/asset/img/detail-food/662697.png"
import Banner from '../layouts/Banner';
import NavigationBar from '../layouts/NavbarHome';
import { useDispatch } from 'react-redux';
import { updateAll } from "../features/redux/FoodSlide";
import { useNavigate } from 'react-router-dom';

 const OLComboCouple = () => {
  const unitPrice = 120000;
  const [amount, setAmount] = useState(1);
  const [total,setTotal] = useState(0);
  const [title,setTitle] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    setTitle("OL Combo Couple Sweet 32Oz - Pepsi 24Oz");
  },[])

  useEffect(() => {
    setTotal(amount * unitPrice)
  },[amount])
  
  // console.log(amount + " " + total + " " + title)

  const handleIncre = () => {
    setAmount(prev => prev + 1);
    
  };

  const handleDecre = () => {
    if (amount > 1) {
      setAmount(prev => prev - 1);
      
    }
  };

  return (
    <>
      <Banner />
      <NavigationBar />
      <div className="container mt-5">
      <div className="row">
        {/* Hình ảnh sản phẩm */}
        <div className="col-md-6 text-center">
          <img
            src={img}
            alt="Combo Sweet"
            className="img-fluid"
            style={{ width: '100%' }}
          />
        </div>

        {/* Thông tin sản phẩm */}
        <div className="col-md-6">
          <h3 className="fw-bold" style={{ color: '#72be43' }}>
            OL Combo Couple Sweet 32Oz - Pepsi 24Oz
          </h3>
          <hr className="my-line" style={{ borderTop: '1px solid #000', margin: '10px 0' }} />

          <p>
            01 bắp nhỏ vị ngọt + 02 nước ly nhựa. Nhận trong ngày xem phim. (Chưa bao gồm phụ thu vị bắp)
          </p>
          <p>
            Giá bán: <span className="fw-bold" style={{ color: '#72be43' }}>120000</span> <b>VND</b>
          </p>

          <div className="d-flex align-items-center">
            <span className="me-3">Số lượng:</span>
            <button className="btn btn-outline-secondary me-2" onClick={handleDecre}>-</button>
            <span>{amount}</span>
            <button className="btn btn-outline-secondary ms-2" onClick={handleIncre}>+</button>
          </div>

          <hr className="my-line" style={{ borderTop: '1px solid #000', margin: '10px 0' }} />

          <h5 className="mt-3 mb-3">
            Tổng tiền: <span style={{ color: '#72be43' }}>{(amount * unitPrice).toLocaleString('vi-VN')}</span> VND
          </h5>

          <button className="btn btn-success ms-2" onClick = {() =>{
            dispatch(updateAll({amount,title,total}));
            navigate('/home')
          }}>THÊM VÀO GIỎ</button>
        </div>
      </div>
    </div>
    </>
    
  );
}; 

export default OLComboCouple;
