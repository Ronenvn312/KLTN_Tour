package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.TuongTac;


import java.util.List;
import java.util.concurrent.ExecutionException;
public interface TuongTacService {
    String insert(TuongTac tuongTac) throws ExecutionException, InterruptedException;
    String update(TuongTac tuongTac) throws ExecutionException, InterruptedException;
    List<String> getTourIdPlaned(String userId) throws ExecutionException, InterruptedException;
    List<String> getTourIdLiked(String userId) throws ExecutionException, InterruptedException;
    List<String> getTourIdBooked(String userId) throws ExecutionException, InterruptedException;
}
