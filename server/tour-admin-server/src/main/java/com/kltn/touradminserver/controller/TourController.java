package com.kltn.touradminserver.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.cloud.firestore.DocumentSnapshot;
import com.kltn.touradminserver.entity.Tour;

import com.kltn.touradminserver.service.TourServiceImp;
@CrossOrigin()
@RestController
@RequestMapping("/tour")
public class TourController {
	@Autowired
	TourServiceImp dbTour;
 
	public TourController(TourServiceImp dbTour) {
		this.dbTour = dbTour;
	} 
	@CrossOrigin(origins = "http://localhost:3000")
	@PostMapping("/insert")
	public String insertTour(@RequestBody Tour tour) throws InterruptedException, ExecutionException {
		return dbTour.insertTour(tour);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/get_tour")
	public Tour getTour(@RequestParam String document_id) throws InterruptedException, ExecutionException {
		return dbTour.getTour(document_id);
	} 
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/update_tour")
	public String updateTour(@RequestBody Tour tour) throws InterruptedException, ExecutionException {
		return dbTour.updateTour(tour);
	}
	@CrossOrigin(origins = "http://localhost:3000")
	@GetMapping("/delete_tour")
	public String deleteTour(@RequestParam String document_id) throws InterruptedException, ExecutionException {
		return dbTour.deleteTour(document_id);
	}
	@CrossOrigin(origins = "http://localhost:3000" , allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
	@GetMapping("/findAll")
	public ResponseEntity<List<Tour>> findAllTour() throws InterruptedException, ExecutionException {
		 HttpHeaders headers = new HttpHeaders();
	        headers.set("X-Get-Header", "ExampleHeader");
	        return ResponseEntity.ok().headers(headers).body(dbTour.findAlls());
	}

}
