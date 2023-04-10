package com.kltn.touradminserver.controller;

import java.util.List;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
	@PutMapping("/update")
	public String updateTour(@RequestBody Tour tour) throws InterruptedException, ExecutionException {
		return dbTour.updateTour(tour);
	}

	@CrossOrigin(origins = "http://localhost:3000")
	@DeleteMapping("/delete")
	public String deleteTour(@RequestParam String document_id) throws InterruptedException, ExecutionException {
		return dbTour.deleteTour(document_id);
	}

	@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
	@GetMapping("/findAlls")
	public ResponseEntity<List<Tour>> findAllTour() throws InterruptedException, ExecutionException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Get-Header", "ExampleHeader");
		return ResponseEntity.ok().headers(headers).body(dbTour.findAlls());
	}

	@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
	@GetMapping("/searchs")
	public List<Tour> searchTourByName(@RequestParam String tourName) throws InterruptedException, ExecutionException {
		return dbTour.searchTourByName(tourName);
	}

	@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
	@GetMapping("/findByCate")
	public ResponseEntity<List<Tour>> findByCate(@RequestParam String cate) throws InterruptedException, ExecutionException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Get-Header", "ExampleHeader");
		return ResponseEntity.ok().headers(headers).body(dbTour.findByCategory(cate));
	}

	@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
	@GetMapping("/findTrending")
	public ResponseEntity<List<Tour>> findTrending() throws InterruptedException, ExecutionException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Get-Header", "ExampleHeader");
		return ResponseEntity.ok().headers(headers).body(dbTour.findTrending());
	}

	@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
	@GetMapping("/findPopular")
	public ResponseEntity<List<Tour>> findPopular() throws InterruptedException, ExecutionException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Get-Header", "ExampleHeader");
		return ResponseEntity.ok().headers(headers).body(dbTour.findPopular());
	}

	@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "Requestor-Type", exposedHeaders = "X-Get-Header")
	@GetMapping("/findFilter")
	public ResponseEntity<List<Tour>> findByNameAndCate(@RequestParam String cate, @RequestParam String name) throws InterruptedException, ExecutionException {
		HttpHeaders headers = new HttpHeaders();
		headers.set("X-Get-Header", "ExampleHeader");
		if (name == null) {
			return ResponseEntity.ok().headers(headers).body(dbTour.findByCategory(cate));
		}
		if (cate.equals("all")) {
			return ResponseEntity.ok().headers(headers).body(dbTour.searchTourByName(name));
		}
		return ResponseEntity.ok().headers(headers).body(dbTour.findByNameAndCate(name, cate));
	}
}


