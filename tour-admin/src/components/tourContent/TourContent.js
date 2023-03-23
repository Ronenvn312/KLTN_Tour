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

export default function TourContent() {
    const [showInfoPopup, setshowInfoPopup] = useState(false)
    const [showLocatePopup, setshowLocatePopup] = useState(false)
    const navigate = useNavigate()
    const [resultData, setResultData] = useState([]);
    const [tourAlter, setTourAlter] = useState(null)
    const [tourcheckeds, setTourCheckeds] = useState([])
    const [isDeletePopup, setIsDeletePopup] = useState(false)
    // const { setTourChecked } = useContext(AppContext)
    const handleResultData = async () => {
        const result = await axios.get('http://localhost:8080/tour/findAlls')
        if (result) {
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
    useEffect(() => {
        handleResultData();
    }, [tourAlter])
    return (
        <div className='tour-content'>

            {/* <Button className='btn_Them' variant="info" onClick={() => handShowPopupThem()}>THÊM</Button>{' '} */}
            <div className='content-root' style={{ display: 'flex', flexDirection: 'column', }}>
                <div >
                    <h4 className='title_danhsach'>DANH SÁCH TOUR DU LỊCH</h4>
                    <Form style={{ width: '100%', height: 60 }} className='group-control'>
                        <Form.Group style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Form.Control
                                name='search'
                                // value={" Tour Nha Trang 36h"}
                                // onChange={e => handleChange(e)}
                                style={{ width: 800 }}
                                type="text" placeholder="VD: Thành phố Hồ Chí Minh" required />
                            <Button variant="outline-secondary" style={{ marginLeft: 10, width: 80 }}>
                                <img style={{ width: 30, height: 30 }} src={require('./../../assets/search_icon.png')} />
                            </Button>
                            <Button

                                type='button' variant="outline-warning" className='btn_sua'>
                                SỬA
                                <img style={{ paddingLeft: 10, width: 30, height: 30 }} src={require('../../assets/icon_sua.png')} alt='icon-locate' />
                            </Button>{' '}
                            <br />
                            <Button
                                onClick={() => handShowPopupXoa()}
                                type='button' variant="outline-danger" className='btn_xoa' >
                                XÓA
                                <img style={{ paddingLeft: 10, width: 30, height: 30 }} src={require('../../assets/deleteicon.png')} alt='icon-locate' />
                            </Button>{' '}
                            <br />
                            <Button
                                onClick={() => handShowPopupThem()}
                                type='button' style={{ height: 45 }} variant="outline-info" className='bnt_them_hd' >THÊM HOẠT ĐỘNG</Button>{' '}
                        </Form.Group>

                    </Form>
                </div>
                <div className='content-left'>
                    <div id="table-scroll">
                        <Table striped bordered hover size="sm">
                            <thead className='thead_table'>
                                <tr>
                                    <th className='col_stt' scope="col">#</th>
                                    <th className='col_info' scope="col">Tên Tour</th>
                                    <th className='col_info' scope="col">Ảnh</th>
                                    <th className='col_info' scope="col">Mô tả</th>
                                    <th className='col_info' scope="col">Địa chỉ</th>
                                    <th className='col_info' scope="col">Xu hướng</th>
                                    <th className='col_info' scope="col">Tác vụ</th>
                                </tr>
                            </thead>
                            <tbody className='tbody_table' style={{ height: '500px', overflow: 'scroll' }}>
                                {resultData.map((item, index) => {
                                    return <tr key={item.document_id}>
                                        <th style={{textAlign: 'center'}} scope="row">{index + 1}
                                            <input style={{ width: 25, height: 25, marginLeft: 4 }} type="checkbox" value={item} onClick={e => handClickCheckBox(e, item)}  />
                                        </th>
                                        <td> {item.tenTour}</td>
                                        <td>
                                            <img className='image-item' src={item.hinhAnh[0]} />
                                        </td>
                                        <td className='col_mota' style={{ textAlign: 'start' }}>
                                            <p>id: {item.document_id}</p>
                                            <p>Thông tin: {item.thongTin}</p>
                                        </td>
                                        <td style={{ textAlign: 'start' }}>
                                            <p>Địa chỉ: {item.viTri}</p>
                                            <p>longitude: {item.longitude}</p>
                                            <p>latitude: {item.latitude}</p></td>
                                        <td>
                                            Phổ biến: {item.phoBien ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}
                                            <br />
                                            Xu hướng: {item.xuHuong ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}
                                            <p>Đánh giá: {item.danhGia}</p>
                                        </td>

                                        <td className='col_mota' style={{ textAlign: 'start' }}>
                                            <p>Thể loại: {item.theLoai}</p>
                                            <p>Số ngày: {item.soNgay}</p>
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
