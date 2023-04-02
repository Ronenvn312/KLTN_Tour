package com.kltn.touradminserver.service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;
import com.kltn.touradminserver.entity.Tour;

import lombok.var;

@Service
public class TourServiceImp implements TourService {

	Firestore dbFireStore = FirestoreClient.getFirestore();

	CollectionReference collectionReference = dbFireStore.collection("tour");
	Query query = collectionReference.orderBy("tenTour");
	
	
	@Override
	public String insertTour(Tour tour) throws InterruptedException, ExecutionException {
		ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("tour").document().set(tour);
		return collectionApiFuture.get().getUpdateTime().toString();
	}

	@Override
	public Tour getTour(String document_id) throws InterruptedException, ExecutionException {
		Firestore dbFireStore = FirestoreClient.getFirestore();
		DocumentReference documentReference = dbFireStore.collection("tour").document(document_id);
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		Tour tour;
		if (doc.exists()) {
			tour = doc.toObject(Tour.class);
			return tour;
		}
		return null;
	}

	@Override
	public String updateTour(Tour tour) throws InterruptedException, ExecutionException {
		DocumentReference documentReference = dbFireStore.collection("tour").document(tour.getDocument_id());
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		if (doc.exists()) {
			ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("tour").document(tour.getDocument_id())
					.set(tour);
			return collectionApiFuture.get().getUpdateTime().toString();
		}
		return "Tour not exists";
	}

	@Override
	public String deleteTour(String document_id) {

		ApiFuture<WriteResult> writeResult = dbFireStore.collection("tour").document(document_id).delete();
		return "Successfully Deleted tour : " + document_id;
	}

	@Override
	public List<Tour> findAlls() throws InterruptedException, ExecutionException {

		return dbFireStore.collection("tour").get().get().getDocuments().parallelStream().map(tour -> {
			final var tourDocument = tour.toObject(Tour.class);
			return tourDocument;
		}).collect(Collectors.toList());
	}

	public List<Tour> searchTourByName(String tourName) throws InterruptedException, ExecutionException {
		QuerySnapshot querySnapshot = query.get().get();
		List<Tour> tours = new ArrayList<>();
		for (QueryDocumentSnapshot tour : querySnapshot.getDocuments()) {
			Tour new_tour = tour.toObject(Tour.class);
			if (new_tour.getTenTour().toLowerCase().contains(tourName.toLowerCase())) {
				tours.add(new_tour);
			}
		}
		return tours;
	}
}
