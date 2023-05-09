package com.kltn.touradminserver.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.kltn.touradminserver.entity.HoatDong;
import com.kltn.touradminserver.entity.Tour;


public interface TourService {
    Tour insertTour(Tour tour) throws InterruptedException, ExecutionException;

    Tour getTour(String document_id) throws InterruptedException, ExecutionException;

    String updateTour(Tour tour) throws InterruptedException, ExecutionException;

    String updateRatingTour(List<Integer> ratinglist, String tourId) throws InterruptedException, ExecutionException;

    String deleteTour(String document_id) throws InterruptedException, ExecutionException;

    List<Tour> findAlls() throws InterruptedException, ExecutionException;

    List<Tour> searchTourByName(String tourName) throws InterruptedException, ExecutionException;

    List<Tour> findByCategory(String cate) throws ExecutionException, InterruptedException;

    List<Tour> findTrending() throws ExecutionException, InterruptedException;

    List<Tour> findPopular() throws ExecutionException, InterruptedException;

    List<Tour> findByNameAndCate(String name, String cate) throws ExecutionException, InterruptedException;
}
