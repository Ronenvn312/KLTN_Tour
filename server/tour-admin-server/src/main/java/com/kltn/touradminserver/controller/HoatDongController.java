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

import com.kltn.touradminserver.entity.HoatDong;
import com.kltn.touradminserver.service.HoatDongService;
import com.kltn.touradminserver.service.HoatDongServiceImp;

import lombok.NoArgsConstructor;

@CrossOrigin()
@RestController
@RequestMapping("/hoatdong")
@NoArgsConstructor
public class HoatDongController {
	Logger logger = Logger.getLogger(HoatDongController.class.getName());
	@Autowired
	HoatDongServiceImp dbHoatDong;

	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/insert")
	public boolean insertHoatDong(@RequestBody HoatDong hd) throws InterruptedException, ExecutionException {
		dbHoatDong.createHoatDong(hd);
		logger.log(Level.INFO, "Hoạt động: " + hd);
		return true;
	}

	@CrossOrigin(origins = {"http://localhost:3000", "http:/192.168.1.116:8081"})
	@GetMapping("/find")
	public List<HoatDong> getHoatDong(@RequestParam String tourID) throws InterruptedException, ExecutionException {
		List<HoatDong> listHD = dbHoatDong.getHoatDong(tourID);
		if (listHD != null) {
			return listHD;
		}
		logger.log(Level.WARNING, "Không tìm thấy hoạt động nào");
		return null;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/update")
	public boolean updateHoatDong(@RequestBody HoatDong hd) throws InterruptedException, ExecutionException {
		String res = dbHoatDong.updateHoatDong(hd);
		if (res != null) {
			return true;
		}
		logger.log(Level.WARNING, "ERRO: Lỗi cập nhật thông tin hoạt động : " + hd);
		return false;
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/delete")
	public boolean deleteHoatDong(@RequestParam String document_id) throws InterruptedException, ExecutionException {
		if (dbHoatDong.getHoatDong(document_id) == null) {
			logger.log(Level.SEVERE, "Erro xóa tai khoan: tài khoản không tồn tại!");
			return false;
		}
		try {
			dbHoatDong.deleteHoatDong(document_id);
			return true;
		} catch (Exception e) {
			logger.log(Level.SEVERE, "Erro xóa hoạt động:" + e);
			return false;
		}
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findbyTourId")
	public List<HoatDong> findAllHDofTourID(@RequestParam String tourId)
			throws InterruptedException, ExecutionException {
		return dbHoatDong.findAllsByTourId(tourId);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/findalls")
	public List<HoatDong> findAlls() throws InterruptedException, ExecutionException {
		return dbHoatDong.findAlls();
	}
}
