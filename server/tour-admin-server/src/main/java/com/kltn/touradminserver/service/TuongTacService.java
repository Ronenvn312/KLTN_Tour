package com.kltn.touradminserver.service;

import com.kltn.touradminserver.entity.TuongTac;

import java.util.concurrent.ExecutionException;

public interface TuongTacService {
    String insert(TuongTac tuongTac) throws ExecutionException, InterruptedException;
    String update(TuongTac tuongTac) throws ExecutionException, InterruptedException;

}
