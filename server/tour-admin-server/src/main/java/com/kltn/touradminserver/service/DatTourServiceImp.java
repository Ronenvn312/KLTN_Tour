package com.kltn.touradminserver.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.KhachHangTour;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class DatTourServiceImp implements DatTourService {

    Firestore dbFireStore = FirestoreClient.getFirestore();

    @Override
    public KhachHangTour insert(KhachHangTour k) {
        dbFireStore.collection("khachHangTour").document().create(k);
        return k;
    }

    @Override
    public boolean update(KhachHangTour k) {
        return false;
    }

    @Override
    public List<KhachHangTour> getAll() throws ExecutionException, InterruptedException {
        return dbFireStore.collection("khachHangTour").get().get().getDocuments().parallelStream().map(tour -> {
            final var tourDocument = tour.toObject(KhachHangTour.class);
            return tourDocument;
        }).collect(Collectors.toList());
    }

    @Override
    public List<KhachHangTour> getNotCheck() throws ExecutionException, InterruptedException {
        return dbFireStore.collection("khachHangTour").whereEqualTo("status", false).get().get().getDocuments().parallelStream().map(tour -> {
            final var tourDocument = tour.toObject(KhachHangTour.class);
            return tourDocument;
        }).collect(Collectors.toList());
    }

    @Override
    public List<KhachHangTour> getChecked() throws ExecutionException, InterruptedException {
        return dbFireStore.collection("khachHangTour").whereEqualTo("status", true).get().get().getDocuments().parallelStream().map(tour -> {
            final var tourDocument = tour.toObject(KhachHangTour.class);
            return tourDocument;
        }).collect(Collectors.toList());
    }
}
