import React, { useState } from 'react'
import { Tabheader } from '../components/tabheader/Tabheader';
import './Home.css'
import menu from '../assets/menu.png'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import TourContent from '../components/tourContent/TourContent';
function Home(props) {
  const navigate = useNavigate();
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
          <Button variant="link" className='btn-about' style={{ color: 'white' }}>
            <img style={{width: 30, height: 30, marginRight: 10}} src={require('./../assets/icon_thongbao.png')}/>
            About</Button>
        </div>
      </div>
      <Tabheader />

    </div>
  )
}

export default Home