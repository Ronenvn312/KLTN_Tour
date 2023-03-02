package com.kltn.touradminserver.service;

import java.util.concurrent.ExecutionException;

import com.kltn.touradminserver.entity.AdminUser;

public interface AdminUserService {

	public String createAdmin(AdminUser admin) throws InterruptedException, ExecutionException;

	public AdminUser getAdmin(String document_id) throws InterruptedException, ExecutionException;

	public String updateAdmin(AdminUser admin) throws InterruptedException, ExecutionException;

	public String deleteAdmin(String document_id);
}
