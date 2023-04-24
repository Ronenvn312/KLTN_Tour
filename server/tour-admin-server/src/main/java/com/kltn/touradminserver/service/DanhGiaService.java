package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.DanhGia;
import java.util.List;
import java.util.concurrent.ExecutionException;

public interface DanhGiaService {
    DanhGia insert(DanhGia danhGia) throws ExecutionException, InterruptedException;

    //    public String update(DanhGia danhGia);
    String delete(String danhGiaId) throws ExecutionException, InterruptedException;

    List<DanhGia> getByUserId(String userId) throws ExecutionException, InterruptedException;
}
