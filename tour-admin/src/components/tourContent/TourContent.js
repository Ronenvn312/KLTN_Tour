import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import './TourContent.css'
import axios from 'axios'
export default function TourContent() {
    const [resultData, setResultData] = useState([]);
    const handleResultData = async () => {
        axios.get('http://localhost:8080/tour/findAll')
            .then((result) => { setResultData(result.data) })
            .then((err) => console.log("Hello"))
    }

    useEffect(() => {
        handleResultData();
    })
    return (
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
            <tbody>
                {resultData.map((item) => {
                    return (
                        <tr>
                            <th scope="row">1</th>
                            <td> {item.tenTour}</td>
                            <td>
                                <img className='image-item' src={item.hinhAnh[0]} />
                            </td>
                            <td>
                                <p>{item.thongTin}</p>
                                <p>{item.theLoai}</p>
                                <p>{item.soNgay}</p>
                                <p>{item.viTri}</p>
                                <p>{item.danhGia}</p>s
                            </td>
                            <td>{item.phoBien? <input type="checkbox" checked disabled/> :<input type="checkbox" disabled/>}</td>
                            <td>{item.xuHuong?  <input type="checkbox" checked disabled/> :<input type="checkbox" disabled/>}</td>
                            <td>
                                <Button variant="success" onClick={() => handleResultData()}>UPDATE</Button>{' '}
                                <Button variant="danger">DELETE</Button>{' '}
                            </td>
                        </tr>
                    )
                })
                }
            </tbody>
        </table>
    )
}
