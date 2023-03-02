import React, { useState } from 'react'
import { Tabheader } from '../components/tabheader/Tabheader';
import './Home.css'
import menu from '../assets/menu.png'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TourContent from '../components/tourContent/TourContent';
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
function Home(props) {
  const navigate = useNavigate();
  // const location = useLocation();
  // const [expanded, setExpanded] = React.useState(true);
  const [disableMenu, setDisableMenu] = useState(true);
  const onClickMenuBar = async () => {
    setDisableMenu(!disableMenu);
  }

  return (
    <div className='page-home' >
      <div className='tav-bar'>
        <div className="custom-toolbar" >
          <button variant="info" className='btn-menu' onClick={() => onClickMenuBar()}>
            <img className='img-wel' src={menu} alt='wel' />
          </button>
          <h3 className='title-page'>Trang chủ</h3>
        </div>
        <div className="right-widget">
          <Button variant="link" className='btn-about' style={{ color: 'white' }}>About</Button>
        </div>
      </div>

      <div className='container-home'>
        {disableMenu ?
          <Tabheader /> : ""}
        <div className='right-contain'>
          <h4 style={{ borderBottom: '1px solid' }}>DANH SÁCH TOUR DU LỊCH</h4>
          <Button className='btn_Them' variant="info">THÊM</Button>{' '}
          <TourContent />
        </div>
      </div>
    </div>
  )
}

export default Home