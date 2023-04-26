package com.kltn.touradminserver.controller;

import com.kltn.touradminserver.entity.KhachHangTour;
import com.kltn.touradminserver.service.DatTourServiceImp;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;

@CrossOrigin()
@RestController
@RequestMapping("/datTour")
@NoArgsConstructor
public class DatTourController {

    @Autowired
    DatTourServiceImp datTourService;

    @PostMapping("/insert")
    public KhachHangTour insert(@RequestBody KhachHangTour k) {
        datTourService.insert(k);
        return k;
    }

    @GetMapping("/getAll")
    public List<KhachHangTour> getAll() throws ExecutionException, InterruptedException {
        return datTourService.getAll();
    }

    @GetMapping("/getChecked")
    public List<KhachHangTour> getChecked() throws ExecutionException, InterruptedException {
        return datTourService.getChecked();
    }

    @GetMapping("/getNotChecked")
    public List<KhachHangTour> getNotChecked() throws ExecutionException, InterruptedException {
        return datTourService.getNotCheck();
    }
}
