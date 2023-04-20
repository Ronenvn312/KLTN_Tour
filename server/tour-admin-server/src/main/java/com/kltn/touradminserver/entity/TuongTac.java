package com.kltn.touradminserver.entity;

import com.google.cloud.firestore.annotation.DocumentId;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TuongTac {
    @DocumentId
    private String document_id;
    private String tourId;
    private List<String> userDaThich;
    private List<String> userDaDat;
    private List<String>  userLenKeHoach;
}
