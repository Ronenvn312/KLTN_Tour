package com.kltn.touradminserver.controller;

import com.kltn.touradminserver.dto.ThongTinThongKeThangDTO;
import com.kltn.touradminserver.entity.ThongTinThongKe;
import com.kltn.touradminserver.entity.Tour;
import com.kltn.touradminserver.service.ThongTinThongKeServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin()
@RestController
@RequestMapping("/thongKe")
public class ThongTinThongKeController {
    @Autowired
    private ThongTinThongKeServiceImp dbTttk;

    public ThongTinThongKeController(ThongTinThongKeServiceImp dbTttk) {
         this.dbTttk = dbTttk;
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/insert")
    public String insertTour(@RequestBody ThongTinThongKe tttk) throws InterruptedException, ExecutionException {
        return dbTttk.ínsert(tttk);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/find")
    public List<ThongTinThongKe> findByThang(@RequestParam int thang, int nam) throws InterruptedException, ExecutionException {
        return dbTttk.getTttkByThangNam(thang, nam);
    }
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findByNam")
    public List<ThongTinThongKeThangDTO> findAllThangInNam(int nam) throws InterruptedException, ExecutionException {
        return dbTttk.thongKeCacThangTrongNam(nam);
    }
}
