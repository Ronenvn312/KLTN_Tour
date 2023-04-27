import React, { useEffect, useState } from 'react'
import './ScreenTaiKhoan.css'
import { Alert, Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
import { getDownloadURL } from 'firebase/storage'
import { firebase } from '../../util/config';
import axios from 'axios';

export default function ScreenTaiKhoan(props) {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false)
    const storage = firebase.storage()
    const storageRef = firebase.storage().ref();

    const [nguoiDung, setNguoiDung] = useState(props.nguoiDung)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [renewPassword, setRenewPassword] = useState("")
    // thông tin người dùng
    const [ten, setTen] = useState(nguoiDung.ten)
    const [diaChi, setDiaChi] = useState(nguoiDung.diaChi)
    const [email, setEmail] = useState(nguoiDung.email)
    const [sdt, setSdt] = useState(nguoiDung.sdt)
    const [url, setUrl] = useState(nguoiDung.avatar);

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
        } else {
            console.log("Update Error")
        }
    }
    // handle update Password
    const handleUpdatePassword = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:8080/taikhoan/loggin`, {
            params: {
                username: email
            }
        }).then((res) => {
            if (res.data && oldPassword != newPassword) {
                res.data.password = newPassword
                console.log(res.data)
                axios.put('http://localhost:8080/taikhoan/update', res.data)
                    .then((result) => {
                        console.log(result.data)
                    })
                    .catch((error) => console.log(error))
            }

        })
    };
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
                                        <Button variant="outline-secondary">Xóa trắng</Button>{' '}
                                        <Button variant='outline-warning' onClick={() => updateNguoiDung()}> Cập nhật</Button>
                                    </div>
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
                                        onChange={e => onChangeOldPassword(e)}
                                        value={oldPassword} />
                                    <p>Mật khẩu mới {"(New Password)"}*:</p>
                                    <input
                                        type='password'
                                        onChange={e => onChangeNewPassword(e)}
                                        value={newPassword} />
                                    <p>Nhập lại mật khẩu mới {"(New Password)"}*:</p>
                                    <input
                                        type='password'
                                        onChange={e => onChangeRenewPassword(e)}
                                        value={renewPassword} />
                                    <hr />
                                    <div>
                                        <Button variant="outline-secondary">Xóa trắng</Button>{' '}
                                        <Button variant='outline-warning' onClick={(e) => handleUpdatePassword(e)}> Cập nhật</Button>
                                    </div>
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
