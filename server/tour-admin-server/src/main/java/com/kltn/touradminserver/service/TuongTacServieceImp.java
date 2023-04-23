package com.kltn.touradminserver.service;

import com.google.cloud.firestore.CollectionReference;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.Query;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.Tour;
import com.kltn.touradminserver.entity.TuongTac;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class TuongTacServieceImp implements TuongTacService{

    Firestore dbFireStore = FirestoreClient.getFirestore();

    CollectionReference collectionReference = dbFireStore.collection("tuongTac");

    @Override
    public String insert(TuongTac tuongTac) {
        return null;
    }

    @Override
    public String update(TuongTac tuongTac) {
        return null;
    }

    @Override
    public List<String> getTourIdPlaned(String userId) throws ExecutionException, InterruptedException {
        return collectionReference.whereArrayContains("userLenKeHoach", userId).get().get().getDocuments().parallelStream().map(id -> {
            final var tourId= id.toObject(TuongTac.class).getTourId();
            return tourId;
        }).collect(Collectors.toList());
    }

    @Override
    public List<String> getTourIdLiked(String userId) throws ExecutionException, InterruptedException {
        return collectionReference.whereArrayContains("userDaThich", userId).get().get().getDocuments().parallelStream().map(id -> {
            final var tourId= id.toObject(TuongTac.class).getTourId();
            return tourId;
        }).collect(Collectors.toList());
    }

    @Override
    public List<String> getTourIdBooked(String userId) throws ExecutionException, InterruptedException {
        return collectionReference.whereArrayContains("userDaDat", userId).get().get().getDocuments().parallelStream().map(id -> {
            final var tourId= id.toObject(TuongTac.class).getTourId();
            return tourId;
        }).collect(Collectors.toList());
    }
}
