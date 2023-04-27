package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.DanhGia;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface DanhGiaService {
    DanhGia insert(DanhGia danhGia) throws ExecutionException, InterruptedException;

    List<DanhGia> getDanhGia(String userId) throws ExecutionException, InterruptedException;

    //    public String update(DanhGia danhGia);
    String delete(String danhGiaId) throws ExecutionException, InterruptedException;

    String update(int rate, String comment, String id) throws ExecutionException, InterruptedException;

    List<String> getByUserId(String userId, boolean status) throws ExecutionException, InterruptedException;

    List<Integer> getForRatingTour(String tourId) throws ExecutionException, InterruptedException;
}
