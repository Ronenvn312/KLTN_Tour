package com.kltn.touradminserver.entity;

import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.Date;

@Getter
@Setter
public class DanhGia {
    private String nguoiDungID;
    private String tourId;
    private String binhLuan;
    private int danhGia;
    private String hoatDongID;
    private Date thoiGian;
    private boolean status;

}
