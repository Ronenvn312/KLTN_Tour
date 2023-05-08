import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import './TourContent.css'
import axios from 'axios'
import PopupInfo from '../Popup/PopupInfo';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import FormThem from '../tabheader/FormThem';
import { AppContext } from '../../context/AppContext';
import PopupNote from '../Popup/PopupNote';
import PopupTuongTac from '../Popup/PopupTuongTac';
import { Accordion } from 'react-bootstrap';
import TuongTacTour from '../tuongTacTour/TuongTacTour';

export default function TourContent() {
    const [showInfoPopup, setshowInfoPopup] = useState(false)
    const [showLocatePopup, setshowLocatePopup] = useState(false)
    const [showPopupTuongTac, setShowPopupTuongTac] = useState(false)
    const [tuongTac, setTuongTac] = useState({
        "document_id": "obWMJ9pcrGiz8f6TYGVd",
        "tourId": "EzdyimgA7g3pEub8yo1r",
        "userDaThich": [
            "ok"
        ],
        "userDaDat": [],
        "userLenKeHoach": [
            "ok"
        ]
    })
    const navigate = useNavigate()
    const [resultData, setResultData] = useState([]);
    const [tourAlter, setTourAlter] = useState(null)
    const [tourcheckeds, setTourCheckeds] = useState([])
    const [isDeletePopup, setIsDeletePopup] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState()
    // const { setTourChecked } = useContext(AppContext)
    const handleGetAllTuongTac = async (tourId) => {
        const result = await axios.get(`http://localhost:8080/tuongtac/findAll`, {
            params: {
                "tourId": tourId
            }
        })

        if (result != null) {
            setTuongTac(result)
            console.log(tuongTac)
        } else {
            console.log("Không thể tìm thấy tương tác này!")
        }
        hanleShowPopupTuongTac()
    }
    const hanleShowPopupTuongTac = () => {
        setShowPopupTuongTac(!showPopupTuongTac)
    }
    const handleResultData = async () => {
        const result = await axios.get('http://localhost:8080/tour/findAlls')
        if (result) {
            localStorage.setItem("dsTour", JSON.stringify(result.data))
            setResultData(result.data)
            console.log(result)
        } else {
            console.log("không thể load data")
        }
    }
    const handShowPopupThem = () => {
        if (tourcheckeds.length == 1) {
            localStorage.setItem("tourChecked", JSON.stringify(tourcheckeds[0]))
            setshowInfoPopup(!showInfoPopup)
        }

    }
    const handShowPopupXoa = () => {
        setIsDeletePopup(!isDeletePopup)

    }
    const handleDeleteTour = async () => {
        await tourcheckeds.forEach((tour) => {
            axios.delete(`http://localhost:8080/tour/delete`, {
                params: {
                    document_id: tour.document_id
                }
            }).then((result) => {
                handleResultData();
            }).catch((error) => console.log(error))
        })
        setTourCheckeds([])
    }
    //HandlClickDelete 
    // click check box
    const handClickCheckBox = (e, item) => {
        if (e.target.checked) {
            tourcheckeds.push(item)
        }
        else {
            tourcheckeds.forEach((tour, index) => {
                if (tour.document_id == item.document_id) {
                    tourcheckeds.splice(index, 1)
                }
            });
        }
        console.log(tourcheckeds)
    }
    // onChange value search tour
    const handleSearchTour = async (e) => {
        const result = await axios.get(`http://localhost:8080/tour/searchs`, {
            params: {
                tourName: e.target.value
            }
        })
        setSearchValue(e.target.value)
        if (result != null) {
            // console.log(result.data)
            setSearchResult(result.data)
        }
        else {
            console.log("No data filter!")
        }
    }


    useEffect(() => {
        handleResultData();
    }, [tourAlter])
    return (
        <div className='tour-content'>

            {/* <Button className='btn_Them' variant="info" onClick={() => handShowPopupThem()}>THÊM</Button>{' '} */}
            <div className='content-root' >
                <div >
                    <h4 className='title_danhsach'>DANH SÁCH TOUR DU LỊCH</h4>
                    <Form style={{ width: '100%', height: 60 }} className='group-control'>
                        <Form.Group style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Button
                                onClick={() => handShowPopupXoa()}
                                type='button' variant="danger" className='btn_xoa' >
                                Xóa nhiều
                                <img style={{ marginLeft: 10, marginBottom: 5, width: 28, height: 28 }} src={require('../../assets/deleteicon.png')} alt='icon-locate' />
                            </Button>{' '}
                            <label style={{ color: "wheat", marginRight: 20 }}> Tìm kiếm </label>
                            <Form.Control
                                name='search'
                                // value={" Tour Nha Trang 36h"}
                                onChange={e => handleSearchTour(e)}
                                style={{ width: 800 }}
                                type="text" placeholder="VD: Thành phố Hồ Chí Minh" required />
                            <Button variant="outline-secondary" style={{ marginLeft: 10, width: 80 }}>
                                <img style={{ width: 30, height: 30 }} src={require('./../../assets/search_icon.png')} />
                            </Button>
                            {/* <Button

                                type='button' variant="outline-warning" className='btn_sua'>
                                SỬA
                                <img style={{ paddingLeft: 10, width: 30, height: 30 }} src={require('../../assets/icon_sua.png')} alt='icon-locate' />
                            </Button>{' '} */}
                            <br />

                            <br />

                        </Form.Group>
                    </Form>
                    <div className='search-result'>
                        {
                            searchValue != "" ?
                                searchResult.map((item, index) => {
                                    return <div key={index} className='search-item'>
                                        <div style={{
                                            height: 100,
                                            width: 100,
                                            backgroundImage: `url(${item.hinhAnh[0]})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'cover',
                                            padding: '10px'
                                        }} >
                                        </div>
                                        <p>{item.tenTour}</p>
                                    </div>
                                }) : ""
                        }
                    </div>
                </div>
                <div className='content-left'>
                    <div id="table-scroll">
                        <Table striped bordered hover size="sm"  >
                            <thead className='thead_table'>
                                <tr>
                                    <th className='col_stt' scope="col">#</th>
                                    <th className='col_ten' scope="col">Tour</th>
                                    <th className='col_anh' scope="col">Ảnh</th>
                                    <th className='col_thong_tin' scope="col">Thông tin</th>
                                    <th className='col_info' scope="col">Mô tả</th>
                                </tr>
                            </thead>
                            <tbody className='tbody_table' style={{ height: '500px', overflow: 'scroll' }}>
                                {resultData.map((item, index) => {
                                    return <tr key={item.document_id}>
                                        <th style={{ textAlign: 'center', color: 'white', backgroundColor: 'white' }} scope="row"> <p style={{ color: 'black' }}>{index + 1}</p>
                                            <input style={{ width: 25, height: 25 }} type="checkbox" value={item} onClick={e => handClickCheckBox(e, item)} />
                                        </th>
                                        <td>
                                            <p>id: {item.document_id}</p>
                                            <p>{item.tenTour}</p>
                                            <Button style={{ marginRight: 20 }} variant='info' onClick={() => handleGetAllTuongTac(item.document_id)}>Danh Sách tương tác</Button>
                                            <PopupNote className="xoa_popub" showInfoPopup={showPopupTuongTac} trigger={showPopupTuongTac} setTrigger={setShowPopupTuongTac} >
                                                <div
                                                    style={{
                                                        minHeight: '200px',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        justifyContent: 'center',
                                                        fontSize: 22
                                                    }}>
                                                    <h1>Danh sách tương tác</h1>
                                                    <div style={{ width: "100%", flexDirection: "row", display: "flex", justifyContent: "center" }}>
                                                        <p style={{ color: 'gray', flex: 0.9 }}> Thông tin tuongTac {tuongTac.tourId} </p>
                                                        <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setShowPopupTuongTac(false)}>x</Button>
                                                    </div>
                                                    <div>

                                                    </div>
                                                </div>
                                            </PopupNote>
                                        </td>
                                        <td>
                                            <div style={{ height: '250px', backgroundImage: `url(${item.hinhAnh[0]})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', padding: '10px' }} >

                                            </div>
                                        </td>
                                        <td className='col_mota' style={{ textAlign: 'start' }}>
                                            <p>Địa chỉ: {item.viTri}</p>
                                            <p>longitude: {item.longitude} latitude: {item.latitude}</p>
                                            <p>Thể loại:
                                                {item.theLoai.map((tl) => {
                                                    return " " + tl + ", "
                                                })
                                                }
                                            </p>
                                            <p>Số ngày: {item.soNgay}</p>
                                            <p>Phổ biến: {item.phoBien ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />} Xu hướng: {item.xuHuong ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</p>
                                            <p>Đánh giá: {item.danhGia}</p>
                                        </td>
                                        <td className='col_mota' style={{ textAlign: 'start' }}>
                                            <p>Thông tin: {item.thongTin}</p>

                                        </td>
                                    </tr>
                                })
                                }
                            </tbody>

                        </Table>
                    </div>
                </div>
            </div>
            <PopupInfo className="infor_popub" showInfoPopup={showInfoPopup} trigger={showInfoPopup} setTrigger={setshowInfoPopup} >
                <FormThem tourChecked={tourAlter} />
            </PopupInfo>

            {
                tourcheckeds.length > 0 ?
                    <PopupNote className="xoa_popub" showInfoPopup={isDeletePopup} trigger={isDeletePopup} setTrigger={setIsDeletePopup} >
                        <div
                            style={{
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 22
                            }}>
                            <p style={{ color: 'red' }}>Bạn có muốn xóa những tour này? ( số tour: {tourcheckeds.length}) </p>
                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => handleDeleteTour()}>Yes</Button>
                                <Button style={{ marginRight: 20, width: 140 }} variant='warning' onClick={() => setIsDeletePopup(false)}>No</Button>
                            </div>
                        </div>
                    </PopupNote> :
                    <PopupNote className="xoa_popub" showInfoPopup={isDeletePopup} trigger={isDeletePopup} setTrigger={setIsDeletePopup} >
                        <div
                            style={{
                                height: '200px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 22
                            }}>
                            <p style={{ color: 'red' }}>Bạn chưa chọn tour cần xóa? ( số tour: {tourcheckeds.length}) </p>
                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <Button style={{ marginRight: 20, width: 140 }} variant='warning' onClick={() => setIsDeletePopup(false)}>OK</Button>
                            </div>
                        </div>
                    </PopupNote>
            }




        </div >
    )
}
