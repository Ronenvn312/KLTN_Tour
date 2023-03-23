
import React, { useEffect, useRef, useState } from "react";
import Map, { FullscreenControl, GeolocateControl, Marker, NavigationControl, Popup, ScaleControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import './MapBox.css'
import { AddressAutofill } from '@mapbox/search-js-react';
import axios from "axios";
function MapBox() {

  const [lng, setLng] = useState(106.68921221955645)
  const [lat, setLat] = useState(10.772420997560602)
  const [showPopup, setShowPopup] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null);
  //info Add Tour 
  const [tenTour, setTenTour] = useState('')
  const [theLoai, setTheLoai] = useState('')
  const [soNgay, setSoNgay] = useState()
  const [thongTinCT, setThongTinCT] = useState('')
  const [diaChi, setDiaChi] = useState('')
  const [xuHuong, setXuHuong] = useState()
  const [phoBien, setPhoBien] = useState()
  const [hinhAnh, setHinhAnh] = useState()
  const data = {
    longitude: lng,
    latitude: lat,
    city: 'Ho Chi Minh City',
    state: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/da-nang-4-ngay-3-dem-handetour.webp?alt=media&token=3053069d-bbd6-47f0-9bba-1589b2f9026e'
  }
  // Popup them
  // const [isThemPopup, setIsThemPopup] = useState(false)
  // const handlePopupThem = () => {
  //   setIsThemPopup(!)
  // }
   //
  const handleShowPopup = () => {
    setShowPopup(true);
  }
  const handleChangeTenTour = (e) => {
    let tenTour = e.target.value
    setTenTour(tenTour)
    // console.log(tenTour)
  }
  const handleChangeTheLoai = (e) => {
    let theLoai = e.target.value
    setTheLoai(theLoai)
    // console.log(theLoai)
  }
  const handleChangeSoNgay = (e) => {
    let soNgay = e.target.value
    setSoNgay(soNgay)
    // console.log(soNgay)
  }
  const handleChangeThongTin = (e) => {
    let thongTin = e.target.value
    setThongTinCT(thongTin)
    // console.log(thongTin)
  }
  const handleChangeDiaChi = (e) => {
    let diaChi = e.target.value
    setDiaChi(diaChi);
    // console.log(diaChi)
  }
  const handleChangeHinhAnh = (e) => {
    let hinhAnh = e.target.value
    setHinhAnh(hinhAnh)
    // console.log(hinhAnh)
  }
  const handleChangeCheckPhoBien = (e) => {
    let isChecked = e.target.checked;
    setPhoBien(isChecked)
    // console.log(isChecked)
  }
  const handleChangeCheckXuHuong = (e) => {
    let isChecked = e.target.checked;
    setXuHuong(isChecked)
    // console.log(isChecked)
  }
  const tour = {
    "tenTour": tenTour,
    "thongTin": thongTinCT,
    "viTri": diaChi,
    "soNgay": soNgay,
    "hinhAnh": [
      hinhAnh,
    ],
    "theLoai": theLoai,
    "danhGia": "4",
    "phoBien": phoBien,
    "xuHuong": xuHuong,
    "longitude": lng,
    "latitude": lat
  }
  const handSubmit = async () => {
    console.log("successful")
    const result = axios.post(`http://localhost:8080/tour/insert`, tour)
    console.log(result)
  }
  const handDiaChiThanhToaDo = async () => {
    let arrNewAddress = []
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${diaChi}.json?limit=2&access_token=pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg`)
      .then(function (response) {
        console.log(response)
        arrNewAddress.push({
          lng: response.data.features[0].center[0],
          lat: response.data.features[0].center[1]
        })
        setLat(arrNewAddress[0].lat)
        setLng(arrNewAddress[0].lng)
      })
      .catch((error) => {
        console.log(error)
      })
      .then(() => {

      })
    console.log(arrNewAddress)
  }
  return (
    <Map
      mapboxAccessToken='pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg'
      style={{
        width: '100%',
        height: '100%'
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
      mapStyle="mapbox://styles/mapbox/streets-v12"

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
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
      <div className="form-them">
        <Form style={{ backgroundColor: '#e0ffff', width: '100%' }} className='group-control' onSubmit={() => handSubmit()}>
          <Form.Group className='title-them-tour'>
            <h3 className='label-title-tour'>Thông tin tour</h3>
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-ten-tour'>Tên tour:</Form.Label>
            <Form.Control
              name='tenTour'
              // value={" Tour Nha Trang 36h"}
              onChange={e => handleChangeTenTour(e)}
              type="text" placeholder="VD:Tour Nha Trang, Tour Đà Nẵng" required />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-loai-tour'>Thể loại:</Form.Label>
            <Form.Control
              name='email'
              contentEditable={"true"}
              onChange={e => handleChangeTheLoai(e)}
              type="text" placeholder="VD: Gia đình, tổ chức, hẹn hò, thư dãn, tổ chức tiệc,..." required />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-login'>Số ngày diễn ra: </Form.Label>
            <Form.Select
              onChange={e => handleChangeSoNgay(e)}
              aria-label="Default select example">
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
                onChange={e => handleChangeThongTin(e)}
                as="textarea"
                placeholder="Leave a comment here"
                style={{ height: '100px' }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <Form.Label className='label-login'>Địa chỉ :</Form.Label>
            <AddressAutofill
              options={{
                language: 'vi',
                country: "us"
              }}
              accessToken="pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg">
              <Form.Control
                name='email'
                value={diaChi}
                onChange={e => handleChangeDiaChi(e)}
                autoComplete="strees-address"
                type="text" placeholder="VD: 01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000" required />
              <Button onClick={() => handDiaChiThanhToaDo()} type="button" variant="info">Tìm kiếm</Button>{' '}
            </AddressAutofill>

          </Form.Group>
          <Form.Group style={{ marginTop: 10 }}>
            <Form.Label className='label-locate'>vị trí trên bản đồ: </Form.Label>
            <Form.Group>
              <Form.Label className='label-loai-tour'>longitude:</Form.Label>
              <Form.Control
                name='longitude'
                value={lng}
                // onChange={e => handleChange(e)}
                type="text" placeholder="VD: 100.1" required />
            </Form.Group>
            <Form.Group>
              <Form.Label className='label-loai-tour'>latitude:</Form.Label>
              <Form.Control
                name='latitude'
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
              onChange={e => handleChangeCheckXuHuong(e)}
            />
            <Form.Check
              type="switch"
              label="phổ biến"
              id="disabled-custom-switch"
              onChange={e => handleChangeCheckPhoBien(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className='label-login'>Hình Ảnh (URL) :</Form.Label>
            <Form.Control
              name='email'
              // value={" Tour Nha Trang 36h"}
              onChange={e => handleChangeHinhAnh(e)}
              type="text" placeholder="VD: " required />
          </Form.Group>
          <Form.Group style={{ paddingLeft: 200 }}>
            <Button type="submit" variant="primary">Thêm</Button>{' '}

            {/* <Button variant="danger" onClick={() => handShowPopupThem()}>Đóng</Button>{' '} */}
          </Form.Group>

        </Form>
      </div>
    </Map>
  );
}

export default MapBox;
