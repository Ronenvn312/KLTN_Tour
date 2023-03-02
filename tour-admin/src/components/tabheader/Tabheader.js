import * as React from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import Alert from '../dashboard/Alert';
import './Tabheader.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Popup from '../Popup/Popup';
import { useState } from 'react';
export const items = [
  {
    text: 'Dashboard',
    selected: true,
    route: '/home/dashboard',
    icon: 'k-i-grid'
  },
  {
    text: 'Performance and sales',
    selected: false,
    route: '/home/performance-and-sales',
    icon: 'k-icon k-i-notification k-i-globe'
  },
  {
    text: 'Products',
    selected: false,
    route: '/home/products',
    icon: 'k-icon k-i-aggregate-fields',
  },
  { separator: true },
  {
    text: 'Settings',
    selected: false,
    route: '/home/account',
    icon: 'k-icon k-i-gear'
  },
  {
    route: '/home/billing',
    disabled: true,
  },
  {
    route: '/home/notifications',
    disabled: true,
  },
  {
    route: '/home/about',
    disabled: true,
  },
];

export const Tabheader = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [showInfoPopup, setshowInfoPopup] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded);
  };

  const onSelect = (e) => {
    navigate(e.itemTarget.props.route);
  };

  const setSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath.text) {
      return currentPath.text;
    }
  };

  const alertClicked = () => {
    alert('You clicked the third ListGroupItem');
  };

  return (
    <div className='left-contain'>
      <div className='left-header-contain'>
        <div className='user-container' >
          <img className='user-avatar' src={require('../../assets/user-avatar.jpg')} alt="user avatar" />
          <h1 className='user-name'>Nguyễn Tiến Đạt</h1>
          <div className="user-email">datnguyen9g@gmail.com</div>
          <button type="button" class="btn btn-danger" onClick={() => navigate("/")}>Logout</button>
        </div>

      </div>
      <ListGroup style={{ background: 'none' }} className='action-menu' defaultActiveKey="#link1">
        <ListGroup.Item style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#link1">
          Bảng điều khiển
        </ListGroup.Item>
        <ListGroup.Item style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#link2">
          Hiệu suất và bán hàng
        </ListGroup.Item>
        <ListGroup.Item style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href='#link'>
          Sản phẩm
        </ListGroup.Item>
        <ListGroup.Item onClick={() => setshowInfoPopup(!showInfoPopup)}  style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action>
          Cập nhật tài khoản
        </ListGroup.Item>
      </ListGroup>
      <Popup className="infor_popub" showInfoPopup={showInfoPopup} trigger={showInfoPopup} setTrigger={setshowInfoPopup}>
        <div className='user_popup_header' style={{ flex: 1, fontSize: 20, margin: 5, fontWeight: 'bold' }}>Thông tin tài khoản</div>
        <div className='user_popup_body' style={{ display: 'flex', flexDirection: 'column', flex: 1, height: 500 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flexFlow: 'column wrap  ', flex: 0.7, marginTop: 50 }}>
            <input style={{ padding: 10 }} type="file" className="filetype" id="group_image" />
            <h3 style={{ padding: 10 }} >Hello</h3>
            <p style={{ padding: 10 }}>Ngày đăng ký</p>
            <p style={{ padding: 10 }}>Email</p>
          </div>
        </div>
        <div className='delete_popup_footer'>
          <button className='negative_btn' >Update</button>
          <button className='negative_btn' onClick={() => setshowInfoPopup(false)}>Đóng</button>
          <button className='negative_btn' style={{ backgroundColor: 'red', color: 'white' }} onClick={() => navigate('/login')}>Đăng xuất</button>
        </div>
      </Popup>
    </div>

  );
};