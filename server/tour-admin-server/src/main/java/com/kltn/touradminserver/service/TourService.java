package com.kltn.touradminserver.service;

import java.util.List;
import java.util.concurrent.ExecutionException;

import com.kltn.touradminserver.entity.Tour;


public interface TourService {
	public String insertTour(Tour tour) throws InterruptedException, ExecutionException;
	public Tour getTour(String document_id) throws InterruptedException, ExecutionException;
	public String updateTour(Tour tour) throws InterruptedException, ExecutionException;
	public String deleteTour(String document_id) throws InterruptedException, ExecutionException;
	public List<Tour> findAlls() throws InterruptedException, ExecutionException;
	
}
