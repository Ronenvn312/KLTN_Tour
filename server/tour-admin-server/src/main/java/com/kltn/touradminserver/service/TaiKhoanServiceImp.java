package com.kltn.touradminserver.service;

import java.util.concurrent.ExecutionException;

import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.TaiKhoan;

@Service
public class TaiKhoanServiceImp implements TaiKhoanService {
	Firestore dbFireStore = FirestoreClient.getFirestore();

	@Override
	public String insertTK(TaiKhoan taiKhoan) throws InterruptedException, ExecutionException {
		ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("taiKhoan").document(taiKhoan.getUserName())
				.set(taiKhoan);
		return collectionApiFuture.get().getUpdateTime().toString();
	}

	@Override
	public TaiKhoan getTK(String userName) throws InterruptedException, ExecutionException {
		DocumentReference documentReference = dbFireStore.collection("taiKhoan").document(userName);
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		TaiKhoan tk;
		if (doc.exists()) {
			tk = doc.toObject(TaiKhoan.class);
			return tk;
		}
		return null;
	}

	@Override
	public String updateTK(TaiKhoan taiKhoan) throws InterruptedException, ExecutionException {

		DocumentReference documentReference = dbFireStore.collection("taiKhoan").document(taiKhoan.getUserName());
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		if (doc.exists()) {
			ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("taiKhoan")
					.document(taiKhoan.getUserName()).set(taiKhoan);
			return collectionApiFuture.get().getUpdateTime().toString();
		}
		return null;
	}

	@Override
	public String deleteTK(String userName) {
		try {
			ApiFuture<WriteResult> writeResult = dbFireStore.collection("taiKhoan").document(userName).delete();
			return "Successfully Deleted";
		} catch (Exception e) {
			return null;
		}
	
	}

}