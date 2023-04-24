package com.kltn.touradminserver.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.TuongTac;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
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
}
