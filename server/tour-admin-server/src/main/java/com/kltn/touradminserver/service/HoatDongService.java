package com.kltn.touradminserver.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.kltn.touradminserver.entity.HoatDong;

public interface HoatDongService {
	public String createHoatDong(HoatDong new_hoat_dong) throws InterruptedException, ExecutionException;
	public HoatDong getHoatDong(String document_id) throws InterruptedException, ExecutionException;
	public String updateHoatDong(HoatDong hd) throws InterruptedException, ExecutionException;
	public String deleteHoatDong(String document_id);
	public List<HoatDong> findAllsByTourId(String tourId) throws InterruptedException, ExecutionException;
	List<HoatDong> findAlls() throws InterruptedException, ExecutionException;
}