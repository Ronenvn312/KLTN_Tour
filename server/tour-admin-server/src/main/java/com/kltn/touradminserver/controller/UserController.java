package com.kltn.touradminserver.controller;

import com.kltn.touradminserver.entity.NguoiDung;
import com.kltn.touradminserver.entity.TaiKhoan;
import com.kltn.touradminserver.security.PasswordEncoder;
import com.kltn.touradminserver.service.NguoiDungServiceImp;
import com.kltn.touradminserver.service.TaiKhoanServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    NguoiDungServiceImp nguoiDungService;

    @Autowired
    TaiKhoanServiceImp taiKhoanService;


    @GetMapping("/login")
    public NguoiDung login(@RequestParam String username, @RequestParam String password) throws InterruptedException, ExecutionException {
        TaiKhoan tk = taiKhoanService.getTK(username);
        String hashedPassword = PasswordEncoder.encode(password);
        if (tk != null && hashedPassword.equals(tk.getPassword())) {
            return nguoiDungService.getNguoiDungByEmail(tk.getUserName());
        }
        return null;
    }

    @GetMapping("/loginEmail")
    public NguoiDung loginByEmail(@RequestParam String email, @RequestParam String name, @RequestParam String avatar) throws InterruptedException, ExecutionException {
        if (nguoiDungService.getNguoiDungByEmail(email) == null) {
            taiKhoanService.insertTK(new TaiKhoan(email, "0000", false, false));
            nguoiDungService.insert(new NguoiDung(name, "", email, "", avatar));
        }
        return nguoiDungService.getNguoiDungByEmail(email);
    }

    @GetMapping("/get")
    public NguoiDung getById(@RequestParam String email) throws InterruptedException, ExecutionException {
        return nguoiDungService.getNguoiDungByEmail(email);
    }
}
