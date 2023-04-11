package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.ThongTinThongKe;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface ThongTinThongKeService {
    public String ínsert(ThongTinThongKe tttk) throws ExecutionException, InterruptedException;
    public String update(ThongTinThongKe tttk) throws ExecutionException, InterruptedException;
    public List<ThongTinThongKe> getTttkByThangNam(int thang, int nam) throws ExecutionException, InterruptedException;
    public ThongTinThongKe getThongTinThongKeByIdTour(String tourId) throws ExecutionException, InterruptedException;
}
