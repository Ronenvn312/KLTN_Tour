package com.kltn.touradminserver.service;

import java.util.concurrent.ExecutionException;

import com.kltn.touradminserver.dto.TaiKhoanAdminUserDTO;
import com.kltn.touradminserver.entity.NguoiDung;
import com.kltn.touradminserver.entity.TaiKhoan;

public interface NguoiDungService {

	public String insertNguoiDung(TaiKhoanAdminUserDTO tk_user_dto) throws InterruptedException, ExecutionException;

	public String insert(NguoiDung tk_user_dto) throws InterruptedException, ExecutionException;

	public NguoiDung getNguoiDung(String document_id) throws InterruptedException, ExecutionException;
	public NguoiDung getNguoiDungByEmail(String email) throws InterruptedException, ExecutionException;

	public String updateNguoiDung(NguoiDung adminUser) throws InterruptedException, ExecutionException;

	public String deleteNguoiDung(String document_id);
}
