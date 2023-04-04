//package com.kltn.touradminserver.controller;
//
//
//import java.util.concurrent.ExecutionException;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.kltn.touradminserver.entity.TaiKhoan;
//import com.kltn.touradminserver.service.TaiKhoanServiceImp;
//
//@RestController
//public class AuthController {
//
//    @Autowired
//    private TaiKhoanServiceImp tkService;
//
//    @PostMapping("/register")
//    public String register(@RequestBody TaiKhoan taiKhoan) throws InterruptedException, ExecutionException{
//    	taiKhoan.setPassword(new BCryptPasswordEncoder().encode(taiKhoan.getPassword()));
//        return tkService.insertTK(taiKhoan);
//    }
//
//    @PostMapping("/login")
//    public ResponseEntity<?> login(@RequestBody TaiKhoan taiKhoan) throws InterruptedException, ExecutionException{
//
//        TaiKhoan taiKhoan2 =
//                tkService.getTK(taiKhoan.getUserName());
//        
//        if ( taiKhoan2 == null || !new BCryptPasswordEncoder()
//                .matches(taiKhoan.getPassword(), taiKhoan2.getPassword())) {
//
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
//                    .body("Account or password is not valid!");
//        }
//
//        return ResponseEntity.ok(taiKhoan);
//    }
////
////    @GetMapping("/hello")
////    @PreAuthorize("hasAnyAuthority('TaiKhoan_READ')")
////    public ResponseEntity hello(){
////        return ResponseEntity.ok("hello");
////    }
//
//
//
//
////    Object principal = SecurityContextHolder
////            .getContext().getAuthentication().getPrincipal();
////
////        if (principal instanceof TaiKhoanDetails) {
////        TaiKhoanPrincipal TaiKhoanPrincipal = (TaiKhoanPrincipal) principal;
////    }
//
//}
