import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import './screenThongKe.css'
import Chart from './ChartThongKe/Chart'
import PieChartExample from './ChartThongKe/PieChartExample.JS'
import axios from 'axios';
export default function ScreenThongKe() {
    const dsTour = localStorage.getItem("dsTour")
    const [listTour, setListTour] = useState([])
    const slTT = 100;
    const date = new Date();
    const handleShowListTour = () => {
        if (dsTour != null) {
            const list = JSON.parse(dsTour);
            setListTour(list)
        }
    }
    const [selectedThang, setSelectedThang] = useState(4);
    const [selectedNam, setSelectedNam] = useState(2023);
    const [listNam, setListNam] = useState([])
    const [listThang, setListThang] = useState([])
    const handleSelectChangeNam = (event) => {
        setSelectedNam(event.target.value);
        console.log(event.target.value)
    };
    const [listThongKe, setListThongKe] = useState([])
    const handleSelectChangeThang = (event) => {
        setSelectedThang(event.target.value);
        console.log(event.target.value)
    };
    const handleValue = () => {
        let listN = []
        let listT = []
        for (let index = 2023; index >= 2010; index--) {
            listN.push(index);
        }
        for (let index = 1; index <= 12; index++) {
            listT.push(index);
        }
        setListNam(listN)
        setListThang(listT)
    }
    const handleSearchThongKe = async () => {
        const result = await axios.get(`http://localhost:8080/thongKe/find`, {
            params: {
                thang: selectedThang,
                nam: selectedNam
            }
        })
        if (result.data) {
            console.log(result.data)
            setListThongKe(result.data)
        }
    }
    const handleListTourLike = () => {
        const tours = []
        listThongKe.forEach(element => {
            // console.log(element)
            axios.get(`http://localhost:8080/tour/get_tour`, {
                params: {
                    document_id: element.tourId
                }
            }).then((result) => {
                console.log(result.data)
                tours.push(result.data)
            })
        });
        setListTour(tours)
        console.log(listTour)
    }
    useEffect(() => {
        handleShowListTour()
        if (listNam.length <= 0 || listThang.length <= 0) {
            handleValue()
        }
        if (listThongKe.length > 0) {
            handleListTourLike()
        }
    }, [])
    return (
        <div className='thongke-container'>
            <div className='thongke-header'>
                <a>Home/ Thống kê</a>

            </div>
            <div className="row-fluid">
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-blue">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    {listTour.length}
                                </div>
                                <div className="desc">
                                    Tour
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-green">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    8
                                </div>
                                <div className="desc">
                                    Người dùng
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-purple">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    528
                                </div>
                                <div className="desc">
                                    Số lượng tương tác trong tháng
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
                <div className="span3 responsive" data-tablet="span6" data-desktop="span3">
                    <div className="dashboard-yellow">
                        <div className="visual">
                            <i className="icon-comments"></i>
                            <div className="details">
                                <div className="number">
                                    9
                                </div>
                                <div className="desc">
                                    Số lượng đặt tour trong tháng
                                </div>
                            </div>
                        </div>

                        <a className="more" href="#">
                            View more <i className="m-icon-swapright m-icon-white"></i>
                        </a>
                    </div>
                </div>
            </div>
            <hr />
            {/* END DASHBOARD STATS */}
            <Form style={{ flexDirection: 'row', display: "flex", marginLeft: 40 }}>
                <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11 }}>
                    <Form.Label>Chọn tháng: </Form.Label>
                    <Form.Select value={selectedThang} onChange={handleSelectChangeThang}>
                        {
                            listThang.map((item) => {
                                return <option key={item} value={item}>Tháng {item}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group controlId="exampleForm.SelectCustom" style={{ flex: 0.11, marginLeft: 20 }}>
                    <Form.Label>chọn năm: </Form.Label>
                    <Form.Select value={selectedNam} onChange={handleSelectChangeNam}>
                        {
                            listNam.map((item) => {
                                return <option value={item}>Năm {item}</option>
                            })
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group style={{ flex: 0.18, marginTop: 32, marginLeft: 20, justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'column' }}>
                    <Button
                        onClick={() => handleSearchThongKe()}
                        style={{ width: 150 }}
                        variant='info'
                        type='button'>Tìm kiếm</Button>
                </Form.Group>
            </Form>
            <div className='thongke-content'>

                <div className='thongke-fluid' >
                    <div className='thongke-fluid-left'>
                        <h5 className='thongke-fluid-left-title'>Danh sách tour có lượng tương tác cao nhất trong tháng:</h5>
                        <table className='thongke-table'>
                            <thead className='thongke-table-header'>
                                <th> STT</th>
                                <th> mã tour </th>
                                <th> tên tour</th>
                                <th> SL tương tác</th>
                            </thead>
                            <tbody className='thongke-table-tbody'>
                                {

                                    listTour.map((item, index) => {
                                        return <tr key={item.document_id} className='thongke-table-tbody-tr'>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                {item.document_id}
                                            </td>
                                            <td>
                                                {item.tenTour}
                                            </td>
                                            <td>
                                                {slTT - index}
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* <!-- BEGIN STACK CHART CONTROLS PORTLET--> */}

                    <div className='thongke-fluid-right'>
                        <h5 className='thongke-fluid-right-title'>Thống kế lượng tương tác tour trong tháng:</h5>
                        <Chart />
                        {/* <PieChartExample /> */}
                    </div>
                    {/* <!-- END STACK CHART CONTROLS PORTLET--> */}
                </div>
            </div>
        </div>
    )
}
