import * as React from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import Alert from '../dashboard/Alert';
import './Tabheader.css'
import ScreenThongKe from '../ScreenThongKe/ScreenThongKe';
import ListGroup from 'react-bootstrap/ListGroup';
import Popup from '../Popup/PopupInfo';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import TourContent from '../tourContent/TourContent';
import MapBox from './MapBox';
import ScreenTaiKhoan from '../ScreenTaiKhoan/ScreenTaiKhoan';
import axios from 'axios';
export const Tabheader = (props) => {

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const  email = JSON.parse(localStorage.getItem("email"));
  const [showInfoPopup, setshowInfoPopup] = useState(false)
  const [values, setValues] = useState({ email: "", password: "" })
  const [showMapPopup, setshowMapPopup] = useState(false)
  const [showTours, setShowTours] = useState(true)
  const [showThemTours, setShowThemTours] = useState(false)
  const [showThongKe, setShowThongKe] = useState(false)
  const [showTaiKhoan, setShowTaiKhoan] = useState(false)
  const [thongTinUser, setThongTinUser] = useState({})
  const handleClick = () => {
    setExpanded(!expanded);
  };
  // click item DASHBOARD
  const handShowActionThemTour = () => {
    setShowTours(false)
    setShowThemTours(true)
    setShowThongKe(false)
    setShowTaiKhoan(false)
  }
  const handShowAllTour = () => {
    setShowTours(true)
    setShowThemTours(false)
    setShowThongKe(false)
    setShowTaiKhoan(false)
  }
  const handShowThongKe = () => {
    setShowThongKe(true)
    setShowThemTours(false)
    setShowTours(false)
    setShowTaiKhoan(false)
  }
  const handleShowTaiKhoan = () => {
    setShowThongKe(false)
    setShowThemTours(false)
    setShowTours(false)
    setShowTaiKhoan(true)
  }
  // handle thong tin user
  const handleThongTinUser = async () => {
    console.log(email)
    const result = await axios.get(`http://localhost:8080/admin/findByEmail`, {
      params: {
        email: email.userName,
      }
    })
    if (result.data) {
      setThongTinUser(result.data)
      console.log(result.data)
    }
  }
  //hand Click show Alert 

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    navigate("/home")

    setValidated(true);
  };
  const handleDangXuat = () => {
    localStorage.removeItem("email")
    navigate("/")
  }
  //event get values
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  useEffect(() => {
    handleThongTinUser()
  }, [])
  return (
    <div className='container-home'>
      <div className='left-contain'>
        <div className='left-header-contain'>
          <div className='user-container' >
            <img className='user-avatar' src={'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/profire.jpg?alt=media&token=36f9f734-d5a5-46fd-897f-d7406be4a3dd'} alt="user avatar" />
            <h1 className='user-name'>Nguyễn Tiến Đạt</h1>
            <div className="user-email">datnguyen9g@gmail.com</div>
            <button type="button" className="btn btn-danger" onClick={() => handleDangXuat()}>Đăng xuất</button>
          </div>
        </div>
        <ListGroup style={{ background: 'none' }} className='action-menu' defaultActiveKey="#bangdieukhien">
          <ListGroup.Item onClick={() => handShowAllTour()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#bangdieukhien">
            <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src={require('../../assets/tab_left/design.png')} alt="use" />
            Bảng điều khiển
          </ListGroup.Item>
          <ListGroup.Item onClick={() => handShowActionThemTour()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#thongtintour">
            <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src={require('../../assets/tab_left/Combined.png')} alt="use" />
            Thông tin Tour
          </ListGroup.Item>
          <ListGroup.Item onClick={() => handShowThongKe()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive', display: 'flex', flexDirection: 'row' }} action href='#thongke'>
            <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src={require('../../assets/tab_left/Combined.png')} alt="use" />
            Thống kê
          </ListGroup.Item>
          <ListGroup.Item onClick={() => handleShowTaiKhoan()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href='#taikhoan'>
            <img className='icon-tab' style={{ width: 30, height: 30, marginRight: 10 }} src={require('../../assets/tab_left/setting.png')} alt="use" />
            Quản lý tài khoản
          </ListGroup.Item>

        </ListGroup>
        {/* Danh sách tour được cập nhật gần đây */}
        <div>
          <p style={{ color: 'white' }}>tours cập nhật gần đây  </p>
          <hr style={{ color: 'white' }}></hr>
          <div>

          </div>
        </div>
        {/* Popup for action đổi mật khẩu */}
        <Popup className="infor_popub" showInfoPopup={showInfoPopup} trigger={showInfoPopup} setTrigger={setshowInfoPopup}>
          <h5>Đổi mật khẩu</h5>
          <Form className='group-control' noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
            <Form.Group id='form-group' className="mb-3" controlId="formBasicEmail">
              <Form.Label className='label-login'>Old Password</Form.Label>
              <Form.Control
                name='email'
                value={values.email}
                onChange={e => handleChange(e)}
                type="email" placeholder="Enter old password" required />

            </Form.Group>
            <Form.Group id='form-group' className="mb-3" controlId="formBasicPassword">
              <Form.Label className='label-login'>New Password</Form.Label>
              <Form.Control
                name='password'
                value={values.password}
                onChange={e => handleChange(e)}
                type="password" placeholder="Password" required />
              <Form.Control.Feedback type="invalid">
                Please provide a password
              </Form.Control.Feedback>

            </Form.Group>
            <Form.Group id='form-group' className="mb-3" controlId="formBasicCheckbox">
              <Form.Check
                className='label-login' type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Cập nhật
            </Button>
          </Form>
        </Popup>
      </div>
      {/* right content in Bảng điều khiển */}
      <div className='right-contain' >
        {
          showTours ?
            <TourContent /> : ""
        }
        {
          showThemTours ?
            <MapBox />
            : ""
        }
        {
          showThongKe ?
            <ScreenThongKe />
            : ""
        }
        {
          showTaiKhoan ?
            <ScreenTaiKhoan nguoiDung={thongTinUser} />
            : ""
        }
      </div>
    </div>

  );
};