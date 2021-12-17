import { Button } from '@mui/material'
import React from 'react'
import "./supply.scss"

export default function Supply() {
    return (
        <div className='supply_page'>
            <div className="supply_content">
                <div className="navig">
                    <i className="fas fa-arrow-left"></i>
                    <a>Quay lai trang truoc</a>
                </div>
                <div className="activity">
                    <div className="left_activity">
                        <div className="left_activity_item">
                            <i className="fas fa-upload"></i>
                            <a href="">Xuat file</a>
                        </div>
                        <div className="left_activity_item">
                            <i className="fas fa-upload"></i>
                            <a href="">Nhap file</a>
                        </div>
                        <div className="left_activity_item">
                            <i className="fas fa-upload"></i>
                            <a href="">Nhom nha cung cap</a>
                        </div>
                    </div>
                    <div className="right_activity">
                        <Button variant="contained"><i className="far fa-plus-square"></i>Contained</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
