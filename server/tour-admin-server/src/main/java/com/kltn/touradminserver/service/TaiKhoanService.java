package com.kltn.touradminserver.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.kltn.touradminserver.entity.NguoiDung;
import com.kltn.touradminserver.entity.TaiKhoan;

public interface TaiKhoanService {

	public String insertTK(TaiKhoan taiKhoan) throws InterruptedException, ExecutionException;

	public TaiKhoan getTK(String userName) throws InterruptedException, ExecutionException;

	public String updateTK(TaiKhoan taiKhoan) throws InterruptedException, ExecutionException;

	public String deleteTK(String userName);
	public List<TaiKhoan> findAll() throws ExecutionException, InterruptedException;
}
