
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

// npm install @turf/turf
import * as turf from '@turf/turf';
import PopupNote from "../Popup/PopupNote";

// A circle of 5 mile radius of the Empire State Building
const GEOFENCE = turf.circle([-74.0122106, 40.7467898], 5, { units: 'miles' });


function MapBox() {

  const [lng, setLng] = useState(106.68921221955645)
  const [lat, setLat] = useState(10.772420997560602)
  const [showPopup, setShowPopup] = useState(false)
  const [popupInfo, setPopupInfo] = useState(null);
  //info Add Tour 
  const [tourId, setTourId] = useState('')
  const [tenTour, setTenTour] = useState('')
  const [theLoai, setTheLoai] = useState([])
  const [soNgay, setSoNgay] = useState()
  const [thongTinCT, setThongTinCT] = useState('')
  const [diaChi, setDiaChi] = useState('')
  const [xuHuong, setXuHuong] = useState()
  const [phoBien, setPhoBien] = useState()
  const [hinhAnh, setHinhAnh] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [danhGia, setDanhGia0] = useState(5.0)
  const [showFormHoatDong, setShowFormHoatDong] = useState(false)
  const [isDeletePopup, setIsDeletePopup] = useState(false)
  const [isDeleteHoatDongPopup, setIsDeleteHoatDongPopup] = useState(false)
  // List the loai
  const [thienNhien, setThienNhien] = useState(false)
  const [theThao, setTheThao] = useState(false)
  const [thamQuan, setThamQuan] = useState(false)
  const [nghiDuong, setNghiDuong] = useState(false)
  const [bien, setBien] = useState(false)
  const [tourClicked, setTourClicked] = useState({})
  const [tour, setTour] = useState({
    "document_id": tourId,
    "tenTour": tenTour,
    "thongTin": thongTinCT,
    "viTri": diaChi,
    "soNgay": soNgay,
    "hinhAnh": [
      hinhAnh,
    ],
    "theLoai": theLoai,
    "danhGia": danhGia,
    "phoBien": phoBien,
    "xuHuong": xuHuong,
    "longitude": lng,
    "latitude": lat
  })

  const handleShowPopup = () => {
    setShowPopup(true);
  }
  const handleChangeTenTour = (e) => {
    let tenTour = e.target.value
    setTenTour(tenTour)
    // console.log(tenTour)
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
  const handleChangeCheckTheLoai = (e) => {
    let isChecked = e.target.checked;
    console.log(e.target.checked)
    if (isChecked) {
      theLoai.push(e.target.name)
      console.log(theLoai)
    } else {
      for (let index = 0; index < theLoai.length; index++) {
        const element = theLoai[index];
        if (element == e.target.name)
          theLoai.splice(index, 1)
      }
    }
    console.log(theLoai)
    setTheLoai(theLoai)
    handleSetTheLoai(theLoai)
  }
  const data = {
    longitude: lng,
    latitude: lat,
    city: 'Ho Chi Minh City',
    state: true,
    image: 'https://firebasestorage.googleapis.com/v0/b/tourapp-d8ea8.appspot.com/o/da-nang-4-ngay-3-dem-handetour.webp?alt=media&token=3053069d-bbd6-47f0-9bba-1589b2f9026e'
  }
  // THAO TÁC VỚI  TOUR
  const [listTour, setListTour] = useState([])
  const handleResultData = async () => {
    const result = await axios.get('http://localhost:8080/tour/findAlls')
    if (result) {
      localStorage.setItem("dsTour", JSON.stringify(result.data))
      setListTour(result.data)
      console.log(result)
    } else {
      console.log("không thể load data")
    }
  }
  const handSubmit = async () => {
    const tourinsert = ({
      "tenTour": tenTour,
      "thongTin": thongTinCT,
      "viTri": diaChi,
      "soNgay": soNgay,
      "hinhAnh": [
        hinhAnh,
      ],
      "theLoai": theLoai,
      "danhGia": danhGia,
      "phoBien": phoBien,
      "xuHuong": xuHuong,
      "longitude": lng,
      "latitude": lat
    })
    console.log("successful")
    const result = await axios.post(`http://localhost:8080/tour/insert`, tourinsert)
    console.log(result)
  }
  //handle Click Cập nhật tour
  const handleUpdate = async () => {
    console.log("Click update")
    const tourupdate = ({
      "document_id": tourId,
      "tenTour": tenTour,
      "thongTin": thongTinCT,
      "viTri": diaChi,
      "soNgay": soNgay,
      "hinhAnh": [
        hinhAnh
      ],
      "theLoai": theLoai,
      "danhGia": 4.0,
      "phoBien": true,
      "xuHuong": true,
      "longitude": 106.68921221955645,
      "latitude": 10.772420997560602
    })
    console.log(tourupdate)
    const result = await axios.put(`http://localhost:8080/tour/update`, tourupdate)
    if (result) {
      console.log(result)
      handleResultData()
    } else {
      console.log("Cập nhật tour thất bại!")
    }
  }
  // xóa tour
  const deleteTourById = (item) => {
    axios.delete(`http://localhost:8080/tour/delete`, {
      params: {
        document_id: item.document_id
      }
    }).then((result) => {
      console.log(result)
      handleShowPopupDeleteTour()
      handleResultData()
    })

  }

  const handleShowPopupDeleteTour = () => {
    setIsDeletePopup(!isDeletePopup);
  }
  const handleShowPopupDeleteHoatDong = () => {
    setIsDeleteHoatDongPopup(!isDeleteHoatDongPopup);
  }
  // Thêm tour
  const handleClickThemTour = () => {
    delete tour.document_id;
    setTourId("")
    setTenTour("")
    setTheLoai([])
    setSoNgay("")
    setThongTinCT("")
    setDiaChi("")
    setHinhAnh("")
    setShowForm(true)
    // set for the loai
    setBien(false)
    setThamQuan(false)
    setTheThao(false)
    setNghiDuong(false)
    setThienNhien(false)
    setShowFormHoatDong(false)
  }
  // Chọn tour
  const handleClickItem = (item) => {
    // tour.document_id = item.document_id
    setTourId(item.document_id)
    setTenTour(item.tenTour)
    setTheLoai(item.theLoai)
    setSoNgay(item.soNgay)
    setThongTinCT(item.thongTin)
    setDiaChi(item.viTri)
    setHinhAnh(item.hinhAnh[0])
    setLat(item.latitude)
    setLng(item.longitude)
    setPhoBien(item.phoBien)
    setXuHuong(item.xuHuong)
    setShowForm(true)
    handleResultHoatDongTour(item)
    setShowFormHoatDong(false)
    handleSetTheLoai(item.theLoai)
    console.log(item)
    setTourClicked(item)
  }
  // Chọn thể loại
  const handleSetTheLoai = (listTheLoai) => {
    listTheLoai.forEach(element => {
      if (element == "thien nhien") {
        setThienNhien(true)
      }
      if (element == "the thao") {
        setTheThao(true)
      }
      if (element == "tham quan") {
        setThamQuan(true)
      }
      if (element == "nghi duong") {
        setNghiDuong(true)
      }
      if (element == "bien") {
        setBien(true)
      }
    });
  }
  //
  // đóng form tour
  const handleClickDongForm = () => {
    setShowForm(!showForm)
  }
  // get data tour when show popup
  //THAO TÁC VỚI HOẠT ĐỘNG
  const [listHoatDong, setListHoatDong] = useState([])
  const [thoiGianHD, setThoiGianHD] = useState()
  const [viTriHD, setViTriHD] = useState()
  const [thongTinHD, setThongTinHD] = useState()
  const [tieuDeHD, setTieuDeHD] = useState()
  const [hinhAnhHD, setHinhAnhHD] = useState("")
  const [maHD, setMaHD] = useState()
  const handleChangeTieuDe = (e) => {
    setTieuDeHD(e.target.value)
  }
  const handleChangeThoiGian = (e) => {
    setThoiGianHD(e.target.value)
  }
  const handleChangeThongTinHD = (e) => {
    setThongTinHD(e.target.value)
  }
  const handleChangeDiaChiHD = (e) => {
    setViTriHD(e.target.value)
  }
  const handleChangeHinhAnhHD = (e) => {
    setHinhAnhHD(e.target.value)
  }

  const [hoatDong, setHoatDong] = useState({
    "thoiGianHD": thoiGianHD,
    "viTri": viTriHD,
    "thongTin": thongTinHD,
    "tieuDe": tieuDeHD,
    "tourId": tourId,
    "hinhAnh": [
      hinhAnhHD
    ],
    "longitude": lng,
    "latitude": lat
  })
  // get danh sách hoạt động của tour
  const handleResultHoatDongTour = async (item) => {
    const result = await axios.get(`http://localhost:8080/hoatdong/findbyTourId`, {
      params: {
        tourId: item.document_id
      }
    })
    if (result != null) {
      setListHoatDong(result.data)
      console.log(result.data)
    } else {
      console.log("Loi get data")
    }
  }
  // chọn một hoạt động
  const [hoatDongChecked, setHoatDongChecked] = useState({})
  const handleClickHoatDong = (item) => {
    console.log(item)
    setMaHD(item.id)
    setTieuDeHD(item.tieuDe)
    setViTriHD(item.viTri)
    setThongTinHD(item.thongTin)
    setThoiGianHD(item.thoiGianHD)
    setHinhAnhHD(item.hinhAnh[0])
    setLat(item.latitude)
    setLng(item.longitude)
    setShowForm(false)
    setShowFormHoatDong(true)
    setHoatDongChecked(item)
  }
  // tạo hoạt động
  const handleClickCreateHoatDong = () => {
    // console.log(item)
    setMaHD("")
    setTieuDeHD("")
    setViTriHD("")
    setThongTinHD("")
    setThoiGianHD("")
    setHinhAnhHD("")
    setShowForm(false)
    setShowFormHoatDong(true)
  }
  // chọn đóng tour
  const handleClickDongHoatDong = () => {
    setShowFormHoatDong(!showFormHoatDong)
  }
  // set new hoạt động
  const setNewHoatDong = () => {
    setHoatDong({
      "thoiGianHD": thoiGianHD,
      "viTri": viTriHD,
      "thongTin": thongTinHD,
      "tieuDe": tieuDeHD,
      "tourId": tourId,
      "hinhAnh": [
        hinhAnhHD
      ],
      "longitude": lng,
      "latitude": lat
    })
  }
  const deleteHoatDongById = async (item) => {
    const result = await axios.delete(`http://localhost:8080/hoatdong/delete`, {
      params: {
        document_id: item.id
      }
    })
    console.log(result)
    handleResultHoatDongTour(tourClicked)
    setIsDeleteHoatDongPopup(!isDeleteHoatDongPopup)
    setShowFormHoatDong(!showFormHoatDong)
  }
  // Click button them hoat dong
  const handleThemHoatDong = async () => {
    const new_hoatDong = ({
      "thoiGianHD": thoiGianHD,
      "viTri": viTriHD,
      "thongTin": thongTinHD,
      "tieuDe": tieuDeHD,
      "tourId": tourId,
      "hinhAnh": [
        hinhAnhHD
      ],
      "longitude": lng,
      "latitude": lat
    })
    console.log("successful")
    const result = await axios.post(`http://localhost:8080/hoatdong/insert`, new_hoatDong)
    console.log(result)
    handleResultHoatDongTour(tourClicked)
    setShowFormHoatDong(!showFormHoatDong)
  }
  // Cập nhật hoạt động
  const handleUpdateHoatDong = async () => {
    console.log("Click update")
    const new_hoatDong = ({
      "id": maHD,
      "thoiGianHD": thoiGianHD,
      "viTri": viTriHD,
      "thongTin": thongTinHD,
      "tieuDe": tieuDeHD,
      "tourId": tourId,
      "hinhAnh": [
        hinhAnhHD
      ],
      "longitude": lng,
      "latitude": lat
    })
    console.log(new_hoatDong)
    const result = await axios.put(`http://localhost:8080/hoatdong/update`, new_hoatDong)
    if (result) {
      console.log(result)
      handleResultHoatDongTour(tourClicked)
      console.log(tourClicked)
    } else {
      console.log("Cập nhật hoạt động thất bại!")
    }
  }
  //Kết thúc cập nhật
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
  const handDiaChiHoatDongThanhToaDo = async () => {
    let arrNewAddress = []
    axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${viTriHD}.json?limit=2&access_token=pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg`)
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
  // const mapRef = React.useRef();
  const [viewState, setViewState] = React.useState({
    longitude: lng,
    latitude: lat,
    zoom: 6.5
  });

  //useEffect
  useEffect(() => {
    handleResultData()

  }, [tour, listHoatDong])

  return (
    <Map
      // onLoad={onMapLoad}
      // {...viewState}
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
        zoom: 3.5
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
        <div className="form-them-list-tour">
          <h3 className="title-ds-tour">Danh sách tour: </h3>
          {/* <hr /> */}
          {/* // fix thanh scroll view */}
          <div className='item-tour' onClick={() => handleClickThemTour()}>
            <div style={{
              display: "flex",
              height: 50,
              width: 50,
              backgroundColor: "gray",
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              // padding: '10px'
              justifyContent: "center"
            }} >
              <h1 style={{
                textAlign: 'center'
              }}>+</h1>
            </div>
            <p className="item-ten-tour">Thêm tour</p>
          </div>
          <div className="ds-tour">
            {
              listTour.map((item, index) => {
                return <div key={item.document_id} className='item-tour'>
                  <div onClick={() => handleClickItem(item)} className="hoat-dong-filter">
                    <div style={{
                      height: 50,
                      width: 50,
                      backgroundImage: `url(${item.hinhAnh[0]})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      // padding: '10px'
                    }} >
                    </div>
                    <p className="item-ten-tour">{item.tenTour}</p>
                  </div>

                </div>
              })
            }
          </div>
          {/* Hoat dong */}
          <div className="list-hoat-dong">
            <p className="title-hoat-dong">Hoạt động</p>
            {/* <hr /> */}
            {
              tourId ? <div className='item-tour' onClick={() => handleClickCreateHoatDong()}>
                <div style={{
                  display: "flex",
                  height: 50,
                  width: 50,
                  backgroundColor: "gray",
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  // padding: '10px'
                  justifyContent: "center"
                }} >
                  <h1 style={{
                    textAlign: 'center'
                  }}>+</h1>
                </div>
                <p className="item-ten-tour">Thêm hoạt động</p>
              </div> : ""
            }
            <div className="ds-hoat-dong">
              {/* // fix thanh scroll view */}
              {
                listHoatDong.map((item, index) => {
                  return <div key={index} className='item-hoat-dong'>
                    <div onClick={() => handleClickHoatDong(item)} className="hoat-dong-filter">
                      <div style={{
                        height: 50,
                        width: 50,
                        backgroundImage: `url(${item.hinhAnh[0]})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        // padding: '10px'
                      }} >
                      </div>
                      <p className="item-tieu-de">{item.tieuDe}</p>
                    </div>

                  </div>
                })
              }
            </div>
          </div>
        </div>

        {
          showForm ?
            <Form style={{ display: 'flex', flex: 0.5, backgroundColor: '#e0ffff', minWidth: 390, width: '100%', height: "100%", justifyContent: "flex-start" }} className='group-control' onSubmit={() => handSubmit()}>
              <Form.Group className='title-them-tour' style={{ width: "100%" }}>
                <Button variant="outline-danger"
                  onClick={() => setShowForm(!showForm)}
                  style={{ float: "right", textAlign: 'end', fontSize: 15, fontWeight: 'bold', cursor: 'pointer' }} className='btn-dong'>X </Button>
                <h5 className='label-title-tour' style={{ fontSize: 25 }}>Thông tin tour</h5>
              </Form.Group>
              <Form.Group className='title-them-tour'>
                {tourId !== '' ? <p>ID: {tourId}</p> : ""}
              </Form.Group>
              <Form.Group style={{ width: "100%" }}>
                <Form.Label className='label-ten-tour'>Tên tour:</Form.Label>
                <Form.Control
                  name='tenTour'
                  value={tenTour}
                  onChange={e => handleChangeTenTour(e)}
                  type="text" placeholder="VD:Tour Nha Trang, Tour Đà Nẵng" required />
              </Form.Group>
              <Form.Label className='label-loai-tour'>Thể loại:</Form.Label>
              <Form.Group style={{ display: 'flex', width: "100%" }}>
                <Form.Check
                  type="switch"
                  label="Thiên nhiên"
                  checked={thienNhien}
                  name="thien nhien"
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setThienNhien(!thienNhien)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />

                <Form.Check
                  type="switch"
                  label="Thể thao"
                  name="the thao"
                  checked={theThao}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setTheThao(!theThao)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />
                <Form.Check
                  type="switch"
                  label="Tham quan"
                  name="tham quan"
                  checked={thamQuan}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setThamQuan(!thamQuan)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />
                <Form.Check
                  type="switch"
                  label="Nghỉ dưỡng"
                  name="nghi duong"
                  checked={nghiDuong}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setNghiDuong(!nghiDuong)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />
                <Form.Check
                  type="switch"
                  label="Biển"
                  name="bien"
                  checked={bien}
                  id="disabled-custom-switch"
                  style={{ marginRight: 3 }}
                  onClick={() => setBien(!bien)}
                  onChange={e => handleChangeCheckTheLoai(e)}
                />


              </Form.Group>
              <Form.Group  style={{width: "100%"}}>
                <Form.Label className='label-login'>Số ngày diễn ra: </Form.Label>
                <Form.Select
                  name="soNgay"
                  value={soNgay}
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
              <Form.Group  style={{width: "100%"}}>

                <FloatingLabel controlId="floatingTextarea2" label="Thông tin chi tiết" style={{ marginTop: 10 }}>
                  <Form.Control
                    name="thongTin"
                    value={thongTinCT}
                    onChange={e => handleChangeThongTin(e)}
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '100px' }}
                  />
                </FloatingLabel>
              </Form.Group>

              <Form.Group  style={{width: "100%"}}>
                <Form.Label className='label-login'>Địa chỉ :</Form.Label>
                <AddressAutofill
                  options={{
                    language: 'vi',
                    country: "us"
                  }}
                  accessToken="pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg">
                  <Form.Control
                    name='viTri'
                    value={diaChi}
                    onChange={e => handleChangeDiaChi(e)}
                    autoComplete="strees-address"
                    type="text" placeholder="VD: 01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000" required />
                  <Button style={{ marginTop: 10 }} onClick={() => handDiaChiThanhToaDo()} type="button" variant="info">Tìm kiếm</Button>{' '}
                </AddressAutofill>

              </Form.Group>
              <Form.Group style={{ marginTop: 10, width: "100%" }}>
                <Form.Label className='label-locate'>vị trí trên bản đồ: </Form.Label>
                <Form.Group>
                  <Form.Label className='label-loai-tour'>longitude:</Form.Label>
                  <Form.Control
                    name='longitude'
                    value={lng}
                    type="text" placeholder="VD: 100.1" required />
                </Form.Group>
                <Form.Group>
                  <Form.Label className='label-loai-tour'>latitude:</Form.Label>
                  <Form.Control
                    name='latitude'
                    value={lat}
                    type="text" placeholder="VD: 10.0001" required />
                </Form.Group>
              </Form.Group>
              <Form.Group  style={{width: "100%"}}>
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
              <Form.Group  style={{width: "100%"}}>
                <Form.Label className='label-login'>Hình Ảnh (URL) :</Form.Label>
                <Form.Control
                  name='hinhAnh'
                  value={hinhAnh}
                  onChange={e => handleChangeHinhAnh(e)}
                  type="text" placeholder="VD: " required />
              </Form.Group>
              <Form.Group style={{ paddingLeft: 1, height: 30, margin: 5, width: "100%" }}>
                {tourId !== '' ?
                  <div style={{ width: "100%", height: 40, display: 'flex', flexDirection: 'row' }}>
                    <Button style={{ flex: 0.5, marginRight: 5 }}
                      onClick={() => handleUpdate()}
                      type="button"
                      variant="warning">Cập nhật</Button>
                    <Button style={{ flex: 0.5 }} onClick={() => handleShowPopupDeleteTour()} variant="danger" >Xóa</Button>
                    <PopupNote className="xoa_popub" showInfoPopup={isDeletePopup} trigger={isDeletePopup} setTrigger={setIsDeletePopup} >
                      <div
                        style={{
                          minHeight: '200px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 22
                        }}>
                        <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                          <p style={{ color: 'gray', flex: 0.9 }}> Delete Data </p>
                          <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsDeletePopup(false)}>x</Button>
                        </div>
                        <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ bị xóa khỏi dữ liệu</p>
                        <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                        <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p>
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                          <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsDeletePopup(false)}>Cancel</Button>
                          <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => deleteTourById(tourClicked)}>Start delete</Button>
                        </div>
                      </div>
                    </PopupNote>
                  </div>
                  : <Button style={{ width: 150 }} type="submit" variant="primary">Thêm</Button>
                }
              </Form.Group>

            </Form> : ""
        }
        {/* Form hoạt động */}
        {
          showFormHoatDong ?
            <Form style={{minWidth: 390, display: 'flex', flex: 0.5, backgroundColor: '#e0ffff', justifyContent: 'flex-start', flexDirection: 'column' }} className='group-control'>

              <Form.Group className='title-them-tour'  style={{width: "100%"}}>
                <Button variant="outline-danger"
                  onClick={() => setShowFormHoatDong(!showFormHoatDong)}
                  style={{ float: "right", textAlign: 'end', fontSize: 15, fontWeight: 'bold', cursor: 'pointer' }} className='btn-dong'>X </Button>
                <h5 className='label-title-tour' style={{ fontSize: 25 }}>Thông tin hoạt động</h5>
              </Form.Group>
              <Form.Group className='title-them-tour' style={{width: "100%"}}>
                <h6 className='label-title-tour'>Mã tour: {tourId}</h6>
                <h6 className='label-title-tour'>Mã hd: {maHD}</h6>
              </Form.Group>

              <Form.Group style={{ height: '50px', width: "100%" }}>
                <Form.Label style={{ height: '15px' }} className='label-ten-tour'>Tiêu đề hoạt động:</Form.Label>
                <Form.Control
                  name='tenhd'
                  style={{ height: '28px' }}
                  value={tieuDeHD}
                  onChange={e => handleChangeTieuDe(e)}
                  type="text" placeholder="tiêu đề" required />
              </Form.Group>
              <Form.Group style={{ height: '50px', width: "100%" }}>
                <Form.Label style={{ height: '15px' }} className='label-loai-tour'>Thời gian:</Form.Label>
                <Form.Control
                  name='thoigian'
                  contentEditable={"true"}
                  style={{ height: '28px' }}
                  value={thoiGianHD}
                  onChange={e => handleChangeThoiGian(e)}
                  type="text" placeholder="VD: Ngày thứ 1" required />
              </Form.Group>
              <Form.Group style={{ width: "100%"}}>
                {/* <Form.Label className='label-login'>Thông tin chi tiết: </Form.Label> */}
                <FloatingLabel controlId="floatingTextarea2" label="Thông tin chi tiết" style={{ marginTop: 10 }}>
                  <Form.Control
                    onChange={e => handleChangeThongTinHD(e)}
                    value={thongTinHD}
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: '250px' }}
                  />
                </FloatingLabel>
              </Form.Group>
              <Form.Group style={{ height: '80px', width: "100%" }}>
                <Form.Label style={{ height: '15px' }} className='label-login'>Địa chỉ :</Form.Label>
                <AddressAutofill
                  options={{
                    language: 'vi',
                    country: "vn"
                  }}
                  accessToken="pk.eyJ1IjoiZGF0bmd1eWVuMzEyMzEyIiwiYSI6ImNsZXZkbXVzYTA1bWwzcm80cmNqMDNxejAifQ.k1FIb4suetF82k91bnkRvg">
                  <Form.Control
                    style={{ height: '30px' }}
                    name='email'
                    value={viTriHD}
                    onChange={e => handleChangeDiaChiHD(e)}
                    autoComplete="strees-address"
                    type="text" placeholder="VD: 01 Công xã Paris, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh 70000" required />
                  <Button style={{ height: '34px', paddingTop: 4, marginTop: 3 }} onClick={() => handDiaChiHoatDongThanhToaDo()} type="button" variant="warning">Tìm kiếm</Button>{' '}
                </AddressAutofill>

              </Form.Group>
              <Form.Group style={{ marginTop: 10, width: "100%", display:"flex", flexDirection: "row" }}>
                <Form.Group style={{flex: 0.5}}>
                  <Form.Label className='label-loai-tour'>longitude:</Form.Label>
                  <Form.Control
                    name='longitude'
                    value={lng}
                    // onChange={e => handleChange(e)}
                    type="text" placeholder="VD: 100.1" required />
                </Form.Group>
                <Form.Group  style={{flex: 0.5, marginLeft: 5}}>
                  <Form.Label className='label-loai-tour'>latitude:</Form.Label>
                  <Form.Control
                    name='latitude'
                    value={lat}
                    // onChange={e => handleChange(e)}
                    type="text" placeholder="VD: 10.0001" required />
                </Form.Group>
              </Form.Group>

              <Form.Group style={{ width: "100%"}}>
                <Form.Label className='label-login'>Hình Ảnh (URL) :</Form.Label>
                <Form.Control
                  name='hinhanh'
                  value={hinhAnhHD}
                  onChange={e => handleChangeHinhAnhHD(e)}
                  type="text" placeholder="VD: " required />
              </Form.Group>
              <Form.Group style={{ paddingLeft: 1, margin: 5, width: "100%" }}>
                {maHD !== '' ?
                  <div style={{ width: "100%", height: 40, display: 'flex', flexDirection: 'row' }}>

                    <Button style={{ flex: 0.5, marginRight: 5 }}
                      onClick={() => handleUpdateHoatDong()}
                      type="button"
                      variant="warning">Cập nhật</Button>
                    <Button style={{ flex: 0.5 }} onClick={() => handleShowPopupDeleteHoatDong()} variant="danger">Xóa </Button>
                    <PopupNote className="xoa_popub" showInfoPopup={isDeleteHoatDongPopup} trigger={isDeleteHoatDongPopup} setTrigger={setIsDeleteHoatDongPopup} >
                      <div
                        style={{
                          minHeight: '250px',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          alignItems: 'center',
                          fontSize: 22
                        }}>
                        <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                          <p style={{ color: 'gray', flex: 0.9 }}> Delete Data </p>
                          <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsDeleteHoatDongPopup(false)}>x</Button>
                        </div>
                        <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ bị xóa khỏi dữ liệu</p>
                        <p style={{ color: "gray" }}>Mã tour: {hoatDongChecked.id}</p>
                        <p style={{ color: "gray" }}>Tên tour: {hoatDongChecked.tieuDe}</p>
                        <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                          <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsDeleteHoatDongPopup(false)}>Cancel</Button>
                          <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => deleteHoatDongById(hoatDongChecked)}>Start delete</Button>
                        </div>
                      </div>
                    </PopupNote>
                  </div>
                  : <Button type="button" variant="primary" onClick={() => handleThemHoatDong()}>Thêm</Button>
                }
              </Form.Group>

            </Form> : ""
        }
      </div>
    </Map>
  );
}

export default MapBox;
