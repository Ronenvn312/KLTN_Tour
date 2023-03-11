
import React, { useEffect, useRef, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './MapBox.css'
function MapBox() {

  const [lng, setLng] = useState(106.68921221955645)
  const [lat, setLat] = useState(10.772420997560602)
  const [showPopup, setShowPopup] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null);
  const data = {
    longitude: lng,
    latitude: lat,
    city: 'Ho Chi Minh City',
    state: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/da-nang-4-ngay-3-dem-handetour.webp?alt=media&token=3053069d-bbd6-47f0-9bba-1589b2f9026e'
  }
  const handleShowPopup = () => {
    setShowPopup(true);
  }

  return (
    <Map
      mapboxAccessToken='pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg'
      style={{
        width: '100%',
        height: '100%',
        borderRadius: "15px",
        border: '2px solid red'
      }}
      onClick={(e) => {
        setLat(e.lngLat.wrap().lat)
        setLng(e.lngLat.wrap().lng)
        console.log({ lng: e.lngLat.wrap().lng, lat: e.lngLat.wrap().lat })
      }}
      // zoom={5}
      initialViewState={{
        longitude: lng,
        latitude: lat,
        zoom: 10,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker
        longitude={lng}
        latitude={lat}
        anchor="bottom"
        onClick={e => {
          // If we let the click event propagates to the map, it will immediately close the popup
          // with `closeOnClick: true`
          e.originalEvent.stopPropagation();
          setPopupInfo(data);
        }}

      >
        <img src="https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/mapbox-icon.png?alt=media&token=a70dd5be-1312-4f84-aa53-c0b6092b9e75" />
      </Marker>
      {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.longitude)}
          latitude={Number(popupInfo.latitude)}
          onClose={() => setPopupInfo(null)}
        >
          <div>
            {popupInfo.city}, {popupInfo.state} |{' '}
            <a
              target="_new"
              href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
            >
              Wikipedia
            </a>
          </div>
          <img width="100%" src={popupInfo.image} />
        </Popup>
      )}
      <NavigationControl position="bottom-right" />
      <FullscreenControl />
      <ScaleControl />
      <GeolocateControl />
      <div className="form-them">
        <Form style={{ backgroundColor: '#e0ffff', width: '100%' }} className='group-control'>
          <Form.Group className='title-them-tour'>
            <h3 className='label-title-tour'>Thông tin tour</h3>
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-ten-tour'>Tên tour:</Form.Label>
            <Form.Control
              name='email'
              // value={" Tour Nha Trang 36h"}
              // onChange={e => handleChange(e)}
              type="email" placeholder="VD:Tour Nha Trang, Tour Đà Nẵng" required />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-loai-tour'>Thể loại:</Form.Label>
            <Form.Control
              name='email'
              contentEditable={"true"}
              // value={" Tour Nha Trang 36h"}
              // onChange={e => handleChange(e)}
              type="text" placeholder="VD: Gia đình, tổ chức, hẹn hò, thư dãn, tổ chức tiệc,..." required />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-login'>Số ngày diễn ra: </Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Số ngày </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="9">2 tuần</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            {/* <Form.Label className='label-login'>Thông tin chi tiết: </Form.Label> */}
            <FloatingLabel controlId="floatingTextarea2" label="Thông tin chi tiết" style={{ marginTop: 10 }}>
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <Form.Label className='label-login'>Địa chỉ :</Form.Label>
            <Form.Control
              name='email'
              // value={" Tour Nha Trang 36h"}
              // onChange={e => handleChange(e)}
              type="email" placeholder="VD: 01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000" required />
          </Form.Group>
          <Form.Group style={{ marginTop: 10 }}>
            <Form.Label className='label-locate'>vị trí trên bản đồ: </Form.Label>
            <Form.Group>
              <Form.Label className='label-loai-tour'>longitude:</Form.Label>
              <Form.Control
                name='email'
                value={lng}
                // onChange={e => handleChange(e)}
                type="text" placeholder="VD: 100.1" required />
            </Form.Group>
            <Form.Group>
              <Form.Label className='label-loai-tour'>latitude:</Form.Label>
              <Form.Control
                name='email'
                value={lat}
                // onChange={e => handleChange(e)}
                type="text" placeholder="VD: 10.0001" required />
            </Form.Group>
          </Form.Group>
          <Form.Group>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Xu hướng"
            />
            <Form.Check
              type="switch"
              label="phổ biến"
              id="disabled-custom-switch"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-login'>Hình Ảnh (URL) :</Form.Label>
            <Form.Control
              name='email'
              // value={" Tour Nha Trang 36h"}
              // onChange={e => handleChange(e)}
              type="text" placeholder="VD:Tour Nha Trang, Tour Đà Nẵng" required />
          </Form.Group>
          <Form.Group style={{ paddingLeft: 200 }}>
            <Button variant="primary">Thêm</Button>{' '}

            {/* <Button variant="danger" onClick={() => handShowPopupThem()}>Đóng</Button>{' '} */}
          </Form.Group>
        </Form>
      </div>
    </Map>
  );
}

export default MapBox;
