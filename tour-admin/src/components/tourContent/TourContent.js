import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import './TourContent.css'
import axios from 'axios'
import Popup from '../Popup/Popup';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { useNavigate } from 'react-router-dom';
export default function TourContent() {
    const [showInfoPopup, setshowInfoPopup] = useState(false)
    const [showLocatePopup, setshowLocatePopup] = useState(false)
    const navigate = useNavigate()
    const [resultData, setResultData] = useState([]);
    const handleResultData = async () => {
        axios.get('http://localhost:8080/tour/findAlls')
            .then((result) => {
                setResultData(result.data)
                console.log(result)
            })
            .catch((err) => console.log(err))
    }
    const handShowPopupThem = async () => {
        setshowInfoPopup(!showInfoPopup)
    }
    const handShowPopupLocate = async () => {
        setshowLocatePopup(!showLocatePopup)
    }
    useEffect(() => {
        handleResultData();
    }, [])
    return (
        <div className='tour-content'>
            <h4 style={{ borderBottom: '1px solid' }}>DANH SÁCH TOUR DU LỊCH</h4>
            {/* <Button className='btn_Them' variant="info" onClick={() => handShowPopupThem()}>THÊM</Button>{' '} */}
            <div className='content-root'>
                <div className='content-left'>
                    <div id="table-scroll">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Tên </th>
                                    <th scope="col">ảnh</th>
                                    <th scope="col">mô tả</th>
                                    <th scope="col">phổ biến</th>
                                    <th scope="col">xu hướng</th>
                                    <th scope="col">Tác vụ</th>

                                </tr>
                            </thead>
                            <tbody style={{ height: '500px', overflow: 'scroll' }}>
                                {resultData.map((item, index) => {
                                    return <tr key={item.document_id}>
                                        <th scope="row">{index + 1}</th>
                                        <td> {item.tenTour}</td>
                                        <td>
                                            <img className='image-item' src={item.hinhAnh[0]} />
                                        </td>
                                        <td>
                                            <p>Thông tin: {item.thongTin}</p>
                                            <p>id: {item.document_id}</p>
                                            <p>Thể loại: {item.theLoai}</p>
                                            <p>Số ngày: {item.soNgay}</p>
                                            <p>Vị trí: {item.viTri}</p>
                                            <p>Đánh giá: {item.danhGia}</p>
                                            <p>longitude: {item.longitude}</p>
                                            <p>latitude: {item.latitude}</p>
                                        </td>
                                        <td>{item.phoBien ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                                        <td>{item.xuHuong ? <input type="checkbox" checked disabled /> : <input type="checkbox" disabled />}</td>
                                        <td>
                                            <Button variant="success" onClick={() => handleResultData()}>SỬA</Button>{' '}
                                            <Button variant="danger">XÓA</Button>{' '}
                                        </td>
                                    </tr>
                                })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Popup className="infor_popub" showInfoPopup={showInfoPopup} trigger={showInfoPopup} setTrigger={setshowInfoPopup}>
                <div style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-start' }}>
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
                                // value={" Tour Nha Trang 36h"}
                                // onChange={e => handleChange(e)}
                                type="email" placeholder="VD: Gia đình, tổ chức, hẹn hò, thư dãn, tổ chức tiệc,..." required />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label className='label-login'>Số ngày: </Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option>Số ngày muốn đi</option>
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
                                type="email" placeholder="VD:Tour Nha Trang, Tour Đà Nẵng" required />
                        </Form.Group>
                        <Form.Group style={{ marginTop: 10 }}>
                            <Form.Label className='label-locate'>vị trí trên bản đồ: </Form.Label>
                            <ButtonGroup aria-label="Basic example">
                                <Button
                                    onClick={() => handShowPopupLocate()}
                                    name='label-locate'
                                    id='label-locate' variant="info"
                                    size="sm" style={{ marginLeft: 10, color: 'white', fontSize: 17, fontWeight: 'bold' }}>
                                    Locate
                                    <img style={{ paddingLeft: 10, width: 30, height: 30 }} src={require('../../assets/mapbox-icon.png')} alt='icon-locate' />
                                </Button>{' '}

                            </ButtonGroup>

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

                        <Form.Group style={{ paddingLeft: 200 }}>
                            <Button variant="primary">Thêm</Button>{' '}

                            <Button variant="danger" onClick={() => handShowPopupThem()}>Đóng</Button>{' '}
                        </Form.Group>
                    </Form>
                </div>
            </Popup>

        </div >
    )
}
