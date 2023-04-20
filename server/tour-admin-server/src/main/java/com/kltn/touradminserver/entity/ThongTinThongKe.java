package com.kltn.touradminserver.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
public class ThongTinThongKe implements Serializable {

    @DocumentId
    private String document_id;
    private  String tourId;
    private Date thangNam;
    private int slThich;
    private int slDatTour;
    private int slThemKeHoach;

}
