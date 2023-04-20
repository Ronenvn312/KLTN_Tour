package com.kltn.touradminserver.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.touradminserver.dto.TaiKhoanAdminUserDTO;
import com.kltn.touradminserver.entity.TaiKhoan;
import com.kltn.touradminserver.service.NguoiDungServiceImp;
import com.kltn.touradminserver.service.TaiKhoanServiceImp;

import lombok.NoArgsConstructor;

@RestController
@NoArgsConstructor
@RequestMapping("/taikhoan")
public class TaiKhoanController {
	static Logger logger = Logger.getLogger(AdminController.class.getName());
	@Autowired
	TaiKhoanServiceImp taikKhoanServiceImp;
	@Autowired
	private NguoiDungServiceImp nguoiDungService;
	// Đk tài khoản đầu vào là một lớp dto chứa 2 object là tk và thông tin tài
	// khoản
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/register")
	public boolean dangKyTaiKhoan(@RequestBody TaiKhoanAdminUserDTO tk_user_dto)
			throws InterruptedException, ExecutionException {
		if (taikKhoanServiceImp.getTK(tk_user_dto.getTk().getUserName()) != null) {
			logger.log(Level.SEVERE, "Erro tao tai khoan: tên tài khoản đã tồn tại!");
			return false;
		}
		try {
//			tk_user_dto.getTk().setPassword(new BCryptPasswordEncoder().encode(tk_user_dto.getTk().getPassword()));
			taikKhoanServiceImp.insertTK(tk_user_dto.getTk());
			nguoiDungService.insertNguoiDung(tk_user_dto);
			return true;
		} catch (Exception e) {
			logger.log(Level.SEVERE, "Erro tao tai khoan:" + e);
			logger.log(Level.SEVERE, "tai khoan:" + tk_user_dto);
			return false;
		}
	}

//	@CrossOrigin(origins = "http://localhost:3000")
//	@GetMapping("/get")
//	public TaiKhoan getTK(@RequestParam String username) throws InterruptedException, ExecutionException {
//		TaiKhoan tk = taikKhoanServiceImp.getTK(username);
//		if (tk != null) {
//			return tk;
//		}
//		logger.log(Level.WARNING, "Không tìm thấy tài khoản với username :" + username);
//		return null;
//	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/loggin")
	public TaiKhoan getTK(@RequestParam String username) throws InterruptedException, ExecutionException {
		TaiKhoan tk = taikKhoanServiceImp.getTK(username);
		if (tk != null) {
			return tk;
		}
		logger.log(Level.WARNING, "Không tìm thấy tài khoản với username :" + username);
		return null;
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/update")
	public boolean updateTK(@RequestBody TaiKhoan taiKhoan) throws InterruptedException, ExecutionException {
		String res = taikKhoanServiceImp.updateTK(taiKhoan);
		if (res != null) {
			return true;
		}
		logger.log(Level.WARNING, "Không thể cập nhật tài khoản :" + taiKhoan);
		return false;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/delete")
	public boolean deleteTK(@RequestParam String username) throws InterruptedException, ExecutionException {
		String res = taikKhoanServiceImp.deleteTK(username);
		if (res != null) {
			return true;
		}
		logger.log(Level.WARNING, "Không thể xóa tài khoản :" + username);
		return false;
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findAll")
	public List<TaiKhoan> findAll() throws InterruptedException, ExecutionException {
		return  taikKhoanServiceImp.findAll();
	}
}
