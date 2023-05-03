package com.kltn.touradminserver.controller;

import com.kltn.touradminserver.entity.OTP;
import com.kltn.touradminserver.entity.TaiKhoan;
import com.kltn.touradminserver.security.PasswordEncoder;
import com.kltn.touradminserver.service.OTPServiceImp;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;
import java.util.logging.Level;

@RestController
@NoArgsConstructor
@RequestMapping("/otp")
public class OTPController {

    @Autowired
    OTPServiceImp otpService;

    @PostMapping("/create")
    public String createOTP(@RequestParam String email) throws InterruptedException, ExecutionException {
        return otpService.create(email);
    }

    @GetMapping("/get")
    public OTP getOTP(@RequestParam String email) throws InterruptedException, ExecutionException {
        return otpService.getOTP(email);
    }
}
