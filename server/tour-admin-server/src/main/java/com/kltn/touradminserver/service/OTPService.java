package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.OTP;

import java.util.concurrent.ExecutionException;

public interface OTPService {
    public String create(String email) throws ExecutionException, InterruptedException;
    public OTP getOTP(String email) throws ExecutionException, InterruptedException;
}
