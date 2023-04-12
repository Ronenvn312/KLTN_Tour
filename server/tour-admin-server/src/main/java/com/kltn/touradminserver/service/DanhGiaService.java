package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.DanhGia;

public interface DanhGiaService {
    String insert(DanhGia danhGia);

    //    public String update(DanhGia danhGia);
    String delete(String danhGiaId);

}
