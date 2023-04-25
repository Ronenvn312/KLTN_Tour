package com.kltn.touradminserver.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.TuongTac;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class TuongTacServiceImp implements  TuongTacService{
    Firestore dbFireStore = FirestoreClient.getFirestore();

    CollectionReference collectionReference = dbFireStore.collection("tuongTac");
    @Override
    public String insert(TuongTac tuongTac) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("tuongTac").document().set(tuongTac);
        return collectionApiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String update(TuongTac tuongTac) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = dbFireStore.collection("tuongTac").document(tuongTac.getDocument_id());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot doc = future.get();
        if (doc.exists()) {
            ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("tour").document(tuongTac.getDocument_id())
                    .set(tuongTac);
            return collectionApiFuture.get().getUpdateTime().toString();
        }
        return "Tuong Tac not exists";
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
