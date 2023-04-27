import React, { useEffect, useState } from 'react'
import './ScreenTaiKhoan.css'
import { Button } from 'react-bootstrap'
import Accordion from 'react-bootstrap/Accordion';
export default function ScreenTaiKhoan(props) {
    const [nguoiDung, setNguoiDung] = useState(props.nguoiDung)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [renewPassword, setRenewPassword] = useState("")
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

    }, [])
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
                                    <img className='avatar' src={nguoiDung.avatar} alt="user avatar" />
                                    <Button variant="outline-secondary">Upload Image</Button>{' '}
                                </div>
                                <div>
                                    <p>Mã (ID) * : {nguoiDung.document_id}</p>
                                    <p>Tên người dùng {"(Full Name)"}*: {nguoiDung.ten}</p>
                                    <input type='text' value={nguoiDung.ten} />
                                    <p>Email {"(Email)"}*: {nguoiDung.email}</p>
                                    <input type='text' value={nguoiDung.email} />
                                    <p>Địa chỉ {"(Address)"}*: {nguoiDung.diaChi}</p>
                                    <input type='text' value={nguoiDung.diaChi} />
                                    <p>Điện thoại {"(Phone number)"}*: {nguoiDung.sdt}</p>
                                    <input type='text' value={nguoiDung.sdt} />
                                    <hr />
                                    <div>
                                        <Button variant="outline-secondary">Xóa trắng</Button>{' '}
                                        <Button variant='outline-warning'> Cập nhật</Button>
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
                                        <Button variant='outline-warning'> Cập nhật</Button>
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
