import * as React from 'react';
import { useLocation, useNavigate, Outlet, Link } from 'react-router-dom';
import Alert from '../dashboard/Alert';
import './Tabheader.css'
import ListGroup from 'react-bootstrap/ListGroup';
import Popup from '../Popup/Popup';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


import TourContent from '../tourContent/TourContent';
import MapBox from './MapBox';
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
  const [values, setValues] = useState({ email: "", password: "" })
  const [showErroPassword, setshowErroPassword] = useState(false);
  const [showErroEmail, setshowErroEmail] = useState(false);
  const [showMapPopup, setshowMapPopup] = useState(false)
  const toggleshowErroPassword = () => setshowErroPassword(!showErroPassword);
  const toggleshowErroEmail = () => setshowErroEmail(!showErroEmail);

  const [showTours, setShowTours] = useState(true)
  const [showThemTours, setShowThemTours] = useState(false)

  const handleClick = () => {
    setExpanded(!expanded);
  };
  // click item DASHBOARD
  const handShowActionThemTour = () => {
    setShowTours(false)
    setShowThemTours(true)
  }
  const handShowAllTour = () => {
    setShowTours(true)
    setShowThemTours(false)
  }

  const onSelect = (e) => {
    navigate(e.itemTarget.props.route);
  };

  const setSelectedItem = (pathName) => {
    let currentPath = items.find((item) => item.route === pathName);
    if (currentPath.text) {
      return currentPath.text;
    }
  };
  // Click show popup doi mat khau
  const handShowPopupDoiMK = async () => {
    setshowInfoPopup(!showInfoPopup)
  }
  // Click show popup doi mat khau
  const handShowMapPopup = async () => {
    setshowMapPopup(!showMapPopup)
  }
  //hand Click show Alert 
  const alertClicked = () => {
    alert('You clicked the third ListGroupItem');
  };
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

  //event get values
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value })
  }
  return (
    <div className='container-home'>
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
          <ListGroup.Item onClick={() => handShowAllTour()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#link1">
            Bảng điều khiển
          </ListGroup.Item>
          <ListGroup.Item onClick={() => handShowActionThemTour()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href="#link2">
            Thêm Tour
          </ListGroup.Item>
          <ListGroup.Item onClick={() => handShowMapPopup()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action href='#link'>
            Sản phẩm
          </ListGroup.Item>
          <ListGroup.Item onClick={() => handShowPopupDoiMK()} style={{ background: 'none', fontWeight: 'bold', fontFamily: 'cursive' }} action>
            Cập nhật tài khoản
          </ListGroup.Item>
        </ListGroup>
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
      <div className='right-contain' style={{ display: 'flex' }}>
        {
          showTours ?
            <TourContent /> : ""
        }

        {
          showThemTours ?
           <MapBox/>
            : ""
        }
      </div>
    </div>

  );
};