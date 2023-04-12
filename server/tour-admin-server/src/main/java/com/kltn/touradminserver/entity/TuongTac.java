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
    private String nguoiDungId;
    private List<String> tourDaThich;
    private List<String> tourDaDat;
    private List<String>  tourKeHoach;
}
