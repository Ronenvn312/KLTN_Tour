package com.kltn.touradminserver.service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.DanhGia;
import com.kltn.touradminserver.entity.Tour;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class DanhGiaServiceImp implements DanhGiaService {

    Firestore dbFireStore = FirestoreClient.getFirestore();

    @Override
    public DanhGia insert(DanhGia danhGia) throws ExecutionException, InterruptedException {
        dbFireStore.collection("danhGia").document().create(danhGia).get().getUpdateTime();
        return danhGia;
    }

    @Override
    public String delete(String danhGiaId) throws ExecutionException, InterruptedException {
        dbFireStore.collection("danhGia").document(danhGiaId).delete().get().getUpdateTime();
        return "Đã xóa đánh giá: " + danhGiaId;
    }

    @Override
    public List<DanhGia> getByUserId(String userId) throws ExecutionException, InterruptedException {
        return dbFireStore.collection("danhGia").whereEqualTo("nguoiDungID", userId).get().get().getDocuments().parallelStream().map(rate -> {
            final var danhgia = rate.toObject(DanhGia.class);
            return danhgia;
        }).collect(Collectors.toList());
    }
}
