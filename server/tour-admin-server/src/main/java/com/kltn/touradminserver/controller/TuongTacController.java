package com.kltn.touradminserver.controller;

import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.Tour;
import com.kltn.touradminserver.entity.TuongTac;
import com.kltn.touradminserver.service.TuongTacService;
import com.kltn.touradminserver.service.TuongTacServiceImp;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

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

    @PutMapping("/update")
    public String update(@RequestBody TuongTac tuongTac) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.insert(tuongTac);
    }

    @PutMapping("/like")
    public String like(@RequestParam String tourId,@RequestParam String userId) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.like(tourId,userId);
    }

    @PutMapping("/unlike")
    public String unlike(@RequestParam String tourId,@RequestParam String userId) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.unLike(tourId,userId);
    }

    @PutMapping("/plan")
    public String plan(@RequestParam String tourId,@RequestParam String userId) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.plan(tourId,userId);
    }

    @PutMapping("/dropOurPlan")
    public String dropPlan(@RequestParam String tourId,@RequestParam String userId) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.dropOutPlan(tourId,userId);
    }

    @PutMapping("/book")
    public String book(@RequestParam String tourId,@RequestParam String userId) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.book(tourId,userId);
    }

    @GetMapping("/check")
    public boolean checkLiked(@RequestParam String tourId,@RequestParam String userId) throws InterruptedException, ExecutionException {
        return tuongTacServiceImp.checkLike(tourId,userId);
    }

}
