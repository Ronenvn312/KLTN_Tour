package com.kltn.touradminserver.entity;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class KhachHangTour {
    private String nguoiDungId;
    private String tourId;
    private String sdt;
    private int nguoiLon;
    private int treEm;
    private Date ngayDi;
    private boolean status;
}
