package com.kltn.touradminserver.controller;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kltn.touradminserver.entity.AdminUser;
import com.kltn.touradminserver.service.AdminServiceImp;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminServiceImp adminService;

	public AdminController(AdminServiceImp adminService) {
		this.adminService = adminService;
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/create")
	public String createAdmin(@RequestBody AdminUser admin) throws InterruptedException, ExecutionException {
		return adminService.createAdmin(admin);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/get")
	public AdminUser getAdmin(@RequestParam String document_id) throws InterruptedException, ExecutionException {
		return adminService.getAdmin(document_id);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@PutMapping("/update")
	public String updateAdmin(@RequestBody AdminUser admin) throws InterruptedException, ExecutionException {
		return adminService.updateAdmin(admin);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/delete")
	public String deleteAdmin(@RequestParam String document_id) {
		return adminService.deleteAdmin(document_id);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/test")
	public ResponseEntity<String> testGetEntity() {
		return ResponseEntity.ok("Test Respository");
	}
}
