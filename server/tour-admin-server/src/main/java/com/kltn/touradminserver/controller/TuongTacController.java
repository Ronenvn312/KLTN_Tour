package com.kltn.touradminserver.controller;

import com.kltn.touradminserver.entity.Tour;
import com.kltn.touradminserver.entity.TuongTac;
import com.kltn.touradminserver.service.TuongTacService;
import com.kltn.touradminserver.service.TuongTacServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@CrossOrigin()
@RestController
@RequestMapping("/tuongtac")
public class TuongTacController {
    @Autowired
    TuongTacServiceImp tuongTacServiceImp;

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/insert")
    public String insertTour(@RequestBody TuongTac tuongTac) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.insert(tuongTac);
    }
}
