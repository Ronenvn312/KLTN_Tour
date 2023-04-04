import React, { useEffect, useState } from 'react'
import './screenThongKe.css'
import Chart from './ChartThongKe/Chart'
import PieChartExample from './ChartThongKe/PieChartExample.JS'
export default function ScreenThongKe() {
    const dsTour = localStorage.getItem("dsTour")
    const [listTour, setListTour] = useState([])
    const slTT = 100;
    const handleShowListTour = () => {
        if (dsTour != null) {
            const list = JSON.parse(dsTour);
            setListTour(list)
        }
    }
    useEffect(() => {
        handleShowListTour()
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
            <hr/>
            {/* END DASHBOARD STATS */}
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
                                        return <tr className='thongke-table-tbody-tr'>
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
                                                {slTT-index}
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
