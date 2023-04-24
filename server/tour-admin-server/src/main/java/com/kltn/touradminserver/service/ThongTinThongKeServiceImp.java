package com.kltn.touradminserver.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.ThongTinThongKe;
import com.kltn.touradminserver.entity.Tour;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.ArrayList;
//import java.util.Date;
import java.util.Date;
import java.util.List;
import java.util.concurrent.ExecutionException;

//import static jdk.internal.logger.DefaultLoggerFinder.SharedLoggers.system;

@Service
public class ThongTinThongKeServiceImp implements ThongTinThongKeService{

    Firestore dbFireStore = FirestoreClient.getFirestore();
    @Override
    public String ínsert(ThongTinThongKe tttk) throws ExecutionException, InterruptedException {
        ApiFuture<WriteResult> colleResultApiFuture = dbFireStore.collection("thongTinThongKe").document().set(tttk);
        return colleResultApiFuture.get().getUpdateTime().toString();
    }

    @Override
    public String update(ThongTinThongKe tttk) throws ExecutionException, InterruptedException {

        DocumentReference documentReference = dbFireStore.collection("thongTinThongKe").document(tttk.getDocument_id());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot doc = future.get();
        if (doc.exists()) {
            ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("thongTinThongKe").document(tttk.getDocument_id())
                    .set(tttk);
            return collectionApiFuture.get().getUpdateTime().toString();
        }
        return "Thong Tin Thong ke khong ton tai";
    }

    @Override
    public List<ThongTinThongKe> getTttkByThangNam(int thang, int nam) throws ExecutionException, InterruptedException {
        CollectionReference collectionReference = dbFireStore.collection("thongTinThongKe");
        Query query = collectionReference.orderBy("slThich");
        QuerySnapshot querySnapshot = query.get().get();
        List<ThongTinThongKe> thongTinThongKes = new ArrayList<>();
        Date new_date = new Date();

        String dateString = "1/"+thang+"/"+ nam;
        SimpleDateFormat format = new SimpleDateFormat("dd/MM/yyyy");
        Date date = null;
        try {
            date = format.parse(dateString);
            System.out.println(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        for (QueryDocumentSnapshot tttk : querySnapshot.getDocuments()) {
            ThongTinThongKe new_tttk = tttk.toObject(ThongTinThongKe.class);
            if (new_tttk.getThangNam().getMonth() == date.getMonth() && new_tttk.getThangNam().getYear() == date.getYear()) {
                thongTinThongKes.add(new_tttk);
                System.out.println(new_date);
            }
        }

        return thongTinThongKes;
    }

    @Override
    public ThongTinThongKe getThongTinThongKeByIdTour(String thongTinId) throws ExecutionException, InterruptedException {
        DocumentReference documentReference = dbFireStore.collection("thongTinThongKe").document(thongTinId);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot doc = future.get();
        ThongTinThongKe thongTinThongKe;
        if (doc.exists()) {
            thongTinThongKe = doc.toObject(ThongTinThongKe.class);
            return thongTinThongKe;
        }
        return null;
    }
}
