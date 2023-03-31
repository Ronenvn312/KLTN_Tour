
import React, { useContext, useEffect, useRef, useState } from "react";
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
// import { AppContext } from '../../context/AppContext';
function FormThem(props) {
  const [TourGet, setGetTour] = useState({})

  const [showPopup, setShowPopup] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null);
  //Danh sach hoat dong
  const [dsHoatDong, setDsHoatDong] = useState([])
  //info Add Tour 
  const [tenTour, setTenTour] = useState('')
  const [theLoai, setTheLoai] = useState('')
  const [soNgay, setSoNgay] = useState()
  // getDataFieldForm
  const [thoiGian, setThoiGian] = useState("");
  const [thongTin, setThongTin] = useState("")
  const [tieuDe, setTieuDe] = useState("");
  const [diaChi, setDiaChi] = useState('')
  const [lng, setLng] = useState(106.68921221955645)
  const [lat, setLat] = useState(10.772420997560602)
  const [hinhAnh, setHinhAnh] = useState("")
  // mang cac hoat dong
  const [arrHoatDong, setArrHoatDong] = useState([])
  // object Hoat dong
  const [newHoatDong, setNewHoatDong] = useState({})
  // onchange for data
  const handleChangeThoiGian = (e) => {
    let value = e.target.value
    setThoiGian(value)
    // console.log(thoiGian)
  }
  const handleChangeDiaChi = (e) => {
    let value = e.target.value
    setDiaChi(value)
    // console.log(diaChi)
  }
  const handleChangeTieuDe = (e) => {
    let value = e.target.value
    setTieuDe(value)
    // console.log(tieuDe)
  }

  const handleChangeThongTin = (e) => {
    let value = e.target.value
    setThongTin(value)
    // console.log(thongTin)
  }
  const handleChangeHinhAnh = (e) => {
    let value = e.target.value
    setHinhAnh(value)
    // console.log(hinhAnh)
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
  // get data tour when show popup
  const handleResultTour = async () => {
    const local = localStorage.getItem("tourChecked")
    if (local != null) {
      const tourUpdate = JSON.parse(local);
      const result = await axios.get(`http://localhost:8080/tour/get_tour`, {
        params: {
          document_id: tourUpdate.document_id
        }
      })
      if (result != null) {
        setGetTour(result.data)
        // console.log(result.data)
      } else {
        console.log("Loi get data")
      }
    }
  }
  useEffect(() => {
    handleResultTour()
    console.log(TourGet)
    setNewHoatDong({
      "thoiGianHD": thoiGian,
      "viTri": diaChi,
      "thongTin": thongTin,
      "tieuDe": tieuDe,
      "tourId": TourGet.document_id,
      "hinhAnh": [
        hinhAnh,
      ],
      "longitude": lng,
      "latitude": lat
    })
  }, [TourGet.document_id, tieuDe, thoiGian, diaChi, thongTin, hinhAnh])
  // show popup
  const handleShowPopup = () => {
    setShowPopup(true);
  }
  const data = {
    longitude: lng,
    latitude: lat,
    city: 'Ho Chi Minh City',
    state: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/da-nang-4-ngay-3-dem-handetour.webp?alt=media&token=3053069d-bbd6-47f0-9bba-1589b2f9026e'
  }

  // Click button them hoat dong
  const handSubmit = async () => {
    console.log("successful")
    const result = await axios.post(`http://localhost:8080/hoatdong/insert`, newHoatDong)
    console.log(result)
    setPopupInfo(null)
    handClickMapNewField()
  }
  // handClickMapNewField 
  const handClickMapNewField = () => {
    setTieuDe("")
    setDiaChi("")
    setHinhAnh("https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/da-nang-4-ngay-3-dem-handetour.webp?alt=media&token=3053069d-bbd6-47f0-9bba-1589b2f9026e")
    setThoiGian("")
    setThongTin("")
  }
  return (
    <Map
      mapboxAccessToken='pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg'
      style={{
        width: '1200px',
        height: '900px'
      }}
      onClick={(e) => {
        handClickMapNewField()
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
          style={{ width: '800px'}}
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
          {/* <img width="100%" src={popupInfo.image} /> */}
          <Form style={{ backgroundColor: '#e0ffff', width: '100%' }} className='group-control' >
            <Form.Group className='title-them-tour'>
              <h5 className='label-title-tour'>Thông tin tour</h5>
            </Form.Group>
            <Form.Group style={{height: '50px'}}>
              <Form.Label style={{height: '15px'}} className='label-ten-tour'>Tiêu đề hoạt động:</Form.Label>
              <Form.Control
                name='tenhd'
                style={{height: '28px'}}
                // value={" Tour Nha Trang 36h"}
                onChange={e => handleChangeTieuDe(e)}
                type="text" placeholder="tiêu đề" required />
            </Form.Group>
            <Form.Group style={{height: '50px'}}>
              <Form.Label style={{height: '15px'}} className='label-loai-tour'>Thời gian:</Form.Label>
              <Form.Control
                name='thoigian'
                contentEditable={"true"}
                style={{height: '28px'}}
                onChange={e => handleChangeThoiGian(e)}
                type="text" placeholder="VD: 8:00:00 AM" required />
            </Form.Group>
            <Form.Group >
              {/* <Form.Label className='label-login'>Thông tin chi tiết: </Form.Label> */}
              <FloatingLabel controlId="floatingTextarea2" label="Thông tin chi tiết" style={{ marginTop: 10 }}>
                <Form.Control
                  onChange={e => handleChangeThongTin(e)}
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: '50px' }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group style={{height: '80px'}}>
              <Form.Label style={{height: '15px'}} className='label-login'>Địa chỉ :</Form.Label>
              <AddressAutofill
                options={{
                  language: 'vi',
                  country: "vn"
                }}
                accessToken="pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg">
                <Form.Control
                style={{height: '30px'}}
                  name='email'
                  value={diaChi}
                  onChange={e => handleChangeDiaChi(e)}
                  autoComplete="strees-address"
                  type="text" placeholder="VD: 01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000" required />
                <Button style={{height: '34px', paddingTop: 4, marginTop: 3}}  onClick={() => handDiaChiThanhToaDo()} type="button" variant="warning">Tìm kiếm</Button>{' '}
              </AddressAutofill>

            </Form.Group>
            <Form.Group style={{ marginTop: 10 }}>
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
              <Form.Label className='label-login'>Hình Ảnh (URL) :</Form.Label>
              <Form.Control
                name='hinhanh'
                value={hinhAnh}
                onChange={e => handleChangeHinhAnh(e)}
                type="text" placeholder="VD: " required />
            </Form.Group>
            <Form.Group style={{ paddingLeft: 10 }}>
              <Button type="button" onClick={() => handSubmit()} variant="primary">Thêm</Button>{' '}

              {/* <Button variant="danger" onClick={() => handShowPopupThem()}>Đóng</Button>{' '} */}
            </Form.Group>

          </Form>
        </Popup>
      )}
      <NavigationControl position="bottom-right" />
      <FullscreenControl />
      <ScaleControl />
      <GeolocateControl
        positionOptions={{ enableHighAccuracy: true }}
        trackUserLocation={true}
      />
    </Map>
  );
}

export default FormThem;
