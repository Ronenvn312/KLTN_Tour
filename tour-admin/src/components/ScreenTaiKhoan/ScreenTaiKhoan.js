import React, { useEffect, useState } from 'react'
import './ScreenTaiKhoan.css'
import { Alert, Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { getDownloadURL } from 'firebase/storage'
import { firebase } from '../../util/config';
import axios from 'axios';
import PopupNote from '../Popup/PopupNote';

export default function ScreenTaiKhoan(props) {
    const [image, setImage] = useState(null);
    const storage = firebase.storage()
    const [nguoiDung, setNguoiDung] = useState(props.nguoiDung)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [renewPassword, setRenewPassword] = useState("")
    const [isUpdatePopup, setIsUpdatePopup] = useState(false)
    const [isErrorUpdate, setIsErrorUpdate] = useState(false)
    const [isUpdateMatKhauPopup, setIsUpdateMatKhauPopup] = useState(false)
    // thông tin người dùng
    const [ten, setTen] = useState(nguoiDung.ten)
    const [diaChi, setDiaChi] = useState(nguoiDung.diaChi)
    const [email, setEmail] = useState(nguoiDung.email)
    const [sdt, setSdt] = useState(nguoiDung.sdt)
    const [url, setUrl] = useState(nguoiDung.avatar);

    const handleShowPopupUpdateTaiKhoan = () => {
        setIsUpdatePopup(!isUpdatePopup)
    }
    const onChangeOldPassword = (e) => {
        setOldPassword(e.target.value)
    }
    const onChangeNewPassword = (e) => {
        setNewPassword(e.target.value)
    }
    const onChangeRenewPassword = (e) => {
        setRenewPassword(e.target.value)
    }
    useEffect(() => {
        setNguoiDung(props.nguoiDung)
    }, [])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                // progress function
            },
            (error) => {
                // error function
                console.log(image)
                console.log(error);
            },
            () => {
                // complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then((url) => {
                        setUrl(url);
                        console.log(url)
                    });
            }
        );
    };
    const updateNguoiDung = async () => {
        let user = ({
            "document_id": nguoiDung.document_id,
            "ten": ten,
            "diaChi": diaChi,
            "email": email,
            "sdt": sdt,
            "avatar": url
        })
        const result = await axios.put(`http://localhost:8080/admin/update`, user)
        if (result.data) {
            console.log(result.data)
            console.log(user)
            props.setThongTinUser(user)
            setIsUpdatePopup(false)
        } else {
            console.log("Update Error")
        }
    }
    // handle update Password
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        const res = await axios.get(`http://localhost:8080/taikhoan/logginUser`, {
            params: {
                userName: email,
                password: oldPassword
            }
        })
        if (res.data && oldPassword != newPassword) {
            res.data.password = newPassword
            console.log(res.data)
            axios.put('http://localhost:8080/taikhoan/updateMK', res.data)
                .then((result) => {
                    console.log(result.data)
                    setIsUpdateMatKhauPopup(false)
                })
                .catch((error) => {
                    setIsUpdateMatKhauPopup(false)
                    setIsErrorUpdate(true)
                    console.log(error)
                })
        } else {
            setIsUpdateMatKhauPopup(false)
            setIsErrorUpdate(true)
            console.log("Loi doi mật khẩu")
        }
    };
    const handleRespacePW = () => {
        setOldPassword("")
        setNewPassword("")
        setRenewPassword("")
    }
    const handleRespaceUser = () => {
        setTen("")
        setDiaChi("")
        setSdt("")
    }
    return (
        <div className='tai-khoan-container'>
            <div className='thongke-header'>
                <a>Home/ Quản lý tài khoản</a>
            </div>
            <div className='info-tai-khoan'>
                <h5>Quản lý tài khoản & thông tin người dùng</h5>
                <hr />
                <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Thông tin người dùng</Accordion.Header>
                        <Accordion.Body>
                            <div className='info-content'>
                                <div className='avatar-view'>
                                    <img className='avatar' src={url} alt="user avatar" />
                                    <input type='file' onChange={handleChange} alt='uri image' ></input>
                                    <Button variant="outline-secondary" onClick={handleUpload}>Upload Image</Button>{' '}
                                </div>
                                <div>
                                    <p>Mã (ID) * : {nguoiDung.document_id}</p>
                                    <p>Email {"(Email)"}*: {email}</p>
                                    <p>Tên người dùng {"(Full Name)"}*: {ten}</p>
                                    <input type='text' onChange={(e) => setTen(e.target.value)} value={ten} />
                                    <p>Địa chỉ {"(Address)"}*: {diaChi}</p>
                                    <input type='text' onChange={(e) => setDiaChi(e.target.value)} value={diaChi} />
                                    <p>Điện thoại {"(Phone number)"}*: {sdt}</p>
                                    <input type='text' onChange={(e) => setSdt(e.target.value)} value={sdt} />
                                    <hr />
                                    <div>
                                        <Button variant="outline-secondary" onClick={() => handleRespaceUser()}>Xóa trắng</Button>{' '}
                                        <Button variant='outline-warning' onClick={() => handleShowPopupUpdateTaiKhoan()}> Cập nhật</Button>
                                    </div>
                                    <PopupNote className="update_popup" showInfoPopup={isUpdatePopup} trigger={isUpdatePopup} setTrigger={setIsUpdatePopup} >
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
                                                <p style={{ color: 'gray', flex: 0.9 }}> Update Data </p>
                                                <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsUpdatePopup(false)}>x</Button>
                                            </div>
                                            <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ cập nhật vào dữ liệu</p>
                                            {/* <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                                            <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p> */}
                                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsUpdatePopup(false)}>Cancel</Button>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={() => updateNguoiDung()}>Start Update</Button>
                                            </div>
                                        </div>
                                    </PopupNote>

                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Cập nhật mật khẩu</Accordion.Header>
                        <Accordion.Body>
                            <div className='cap-nhat-mat-khau-view'>
                                <div className='title-cap-nhat-mat-khau'>
                                    <h5>Cập nhật mật khẩu</h5>
                                </div>
                                <div>
                                    <p>ID tài khoản (document_id) * : {nguoiDung.email}</p>
                                    <p>Mật khẩu cũ (Older Password) * : </p>
                                    <input
                                        type='password'
                                        placeholder='Aa87654321'
                                        onChange={e => onChangeOldPassword(e)}
                                        value={oldPassword} />
                                    <p>Mật khẩu mới {"(New Password)"}*:</p>
                                    <input
                                         placeholder='Aa12345678'
                                        type='password'
                                        onChange={e => onChangeNewPassword(e)}
                                        value={newPassword} />
                                    <p>Nhập lại mật khẩu mới {"(New Password)"}*:</p>
                                    <input
                                        placeholder='Aa12345678'
                                        type='password'
                                        onChange={e => onChangeRenewPassword(e)}
                                        value={renewPassword} />
                                    <hr />
                                    <div>
                                        <Button variant="outline-secondary" onClick={() => handleRespacePW()}>Xóa trắng</Button>{' '}
                                        <Button variant='outline-warning' onClick={() => setIsUpdateMatKhauPopup(true)}> Cập nhật</Button>
                                    </div>
                                    <PopupNote className="updateMK_popub" showInfoPopup={isUpdateMatKhauPopup} trigger={isUpdateMatKhauPopup} setTrigger={setIsUpdateMatKhauPopup} >
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
                                                <p style={{ color: 'gray', flex: 0.9 }}> Update Data </p>
                                                <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsUpdateMatKhauPopup(false)}>x</Button>
                                            </div>
                                            <p style={{ color: "red", fontSize: 14 }}>Thông tin tour sẽ cập nhật vào dữ liệu</p>
                                            {/* <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                                            <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p> */}
                                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsUpdateMatKhauPopup(false)}>Cancel</Button>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='danger' onClick={(e) => handleUpdatePassword(e)}>Start Update</Button>
                                            </div>
                                        </div>
                                    </PopupNote>
                                    <PopupNote className="erro_popup" showInfoPopup={isErrorUpdate} trigger={isErrorUpdate} setTrigger={setIsErrorUpdate} >
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
                                                <p style={{ color: 'gray', flex: 0.9 }}> Update Error! </p>
                                                <Button variant="danger" style={{ fontSize: 16 }} onClick={() => setIsErrorUpdate(false)}>x</Button>
                                            </div>
                                            <p style={{ color: "red", fontSize: 14 }}>Thông tin nhập vào không chính xác!</p>
                                            {/* <p style={{ color: "gray" }}>Mã tour: {tourClicked.document_id}</p>
                                            <p style={{ color: "gray" }}>Tên tour: {tourClicked.tenTour}</p> */}
                                            <div style={{ marginTop: 30, display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                <Button style={{ marginRight: 20, width: 140 }} variant='outline-secondary' onClick={() => setIsErrorUpdate(false)}>OK</Button>
                                            </div>
                                        </div>
                                    </PopupNote>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Danh sách tài khoản người dùng</Accordion.Header>
                        <Accordion.Body>
                            <div className='cap-nhat-mat-khau-view'>
                                <div className='title-cap-nhat-mat-khau'>
                                    <h5>Tài khoản sử dụng ứng dụng Dream Trip</h5>
                                </div>
                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>STT</th>
                                                <th>tên tài khoản</th>
                                                <th>password</th>
                                                <th>status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>nguoidung07@gmail.com</td>
                                                <td>Aa12345678</td>
                                                <td>true</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className='thong-tin-nguoi-dung'>
                    {/* Begin thông tin người dùng */}

                    {/* begin form update */}
                </div>
            </div>

        </div>
    )
}
