package com.kltn.touradminserver.service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.controller.HoatDongController;
import com.kltn.touradminserver.entity.HoatDong;
import com.kltn.touradminserver.entity.Tour;

import lombok.var;

@Service
public class HoatDongServiceImp implements HoatDongService {

	Logger logger = Logger.getLogger(HoatDongController.class.getName());
	Firestore dbFireStore = FirestoreClient.getFirestore();
	@Autowired 
	TourService tourservice;
	@Override
	public String createHoatDong(HoatDong new_hoat_dong) throws InterruptedException, ExecutionException {
		ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("hoatDong").document().set(new_hoat_dong);
		return collectionApiFuture.get().getUpdateTime().toString();
	}

	@Override
	public HoatDong getHoatDong(String document_id) throws InterruptedException, ExecutionException {
		DocumentReference documentReference = dbFireStore.collection("hoatDong").document(document_id);
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		HoatDong hd;
		if (doc.exists()) {
			hd = doc.toObject(HoatDong.class);
			return hd;
		}
		return null;
	}

	@Override
	public String updateHoatDong(HoatDong hd) throws InterruptedException, ExecutionException {
		DocumentReference documentReference = dbFireStore.collection("hoatDong").document(hd.getId());
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		if (doc.exists()) {
			ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("hoatDong").document(hd.getId())
					.set(hd);
			return collectionApiFuture.get().getUpdateTime().toString();
		}
		return "Admin not exists";
	}

	@Override
	public String deleteHoatDong(String document_id) {
		ApiFuture<WriteResult> writeResult = dbFireStore.collection("hoatDong").document(document_id).delete();

		return "Successfully Deleted";
	}

	@Override
	public List<HoatDong> findAllsByTourId(String tourId) throws InterruptedException, ExecutionException {
		if (tourservice.getTour(tourId) != null) {
			return dbFireStore.collection("hoatDong").get().get().getDocuments().parallelStream().map(tour -> {
				final var tourDocument = tour.toObject(HoatDong.class);
				if (tourDocument.getTourId().equalsIgnoreCase(tourId)) {
					return tourDocument;
				}
				return null;
			}).collect(Collectors.toList());
		}
		logger.log(Level.SEVERE, "Không tìm thấy tour có id: " + tourId);
		return null;
	}

	@Override
	public List<HoatDong> findAlls() throws InterruptedException, ExecutionException {
		return dbFireStore.collection("hoatDong").get().get().getDocuments().parallelStream().map(tour -> {
			final var tourDocument = tour.toObject(HoatDong.class);
			return tourDocument;
		}).collect(Collectors.toList());
	}
}