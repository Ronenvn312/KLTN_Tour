package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.KhachHangTour;

import java.util.List;
import java.util.concurrent.ExecutionException;

public interface DatTourService {
    KhachHangTour insert(KhachHangTour k);
    boolean update(KhachHangTour k);
    List<KhachHangTour> getAll() throws ExecutionException, InterruptedException;
    List<KhachHangTour> getNotCheck() throws ExecutionException, InterruptedException;
    List<KhachHangTour> getChecked() throws ExecutionException, InterruptedException;
}
