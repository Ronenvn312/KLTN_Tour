package com.kltn.touradminserver.service;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.DanhGia;
import com.kltn.touradminserver.entity.HoatDong;
import com.kltn.touradminserver.entity.Tour;
import lombok.var;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<DanhGia> getDanhGia(String userId) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = dbFireStore.collection("danhGia").whereEqualTo("nguoiDungID", userId).whereEqualTo("status", true).get().get();
        List<DanhGia> list = new ArrayList<>();
        for (QueryDocumentSnapshot hd : querySnapshot.getDocuments()) {
            DanhGia dg = hd.toObject(DanhGia.class);
            list.add(dg);
        }
        return list;
    }

    @Override
    public String delete(String danhGiaId) throws ExecutionException, InterruptedException {
        dbFireStore.collection("danhGia").document(danhGiaId).delete().get().getUpdateTime();
        return "Đã xóa đánh giá: " + danhGiaId;
    }

    @Override
    public List<String> getByUserId(String userId, boolean status) throws ExecutionException, InterruptedException {
        QuerySnapshot querySnapshot = dbFireStore.collection("danhGia").whereEqualTo("nguoiDungID", userId).whereEqualTo("status", status).get().get();
        List<String> list = new ArrayList<>();
        for (QueryDocumentSnapshot hd : querySnapshot.getDocuments()) {
            String dg = hd.toObject(DanhGia.class).getHoatDongID();
            list.add(dg);
        }
        return list;
    }
}
