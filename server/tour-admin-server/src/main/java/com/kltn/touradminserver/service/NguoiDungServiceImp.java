package com.kltn.touradminserver.service;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.api.core.ApiFutureCallback;
import com.google.api.core.ApiFutures;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.dto.TaiKhoanAdminUserDTO;
import com.kltn.touradminserver.entity.NguoiDung;

@Service
public class NguoiDungServiceImp implements NguoiDungService {
	Firestore dbFireStore = FirestoreClient.getFirestore();
	@Autowired
	private TaiKhoanServiceImp tkDB;
	
	@Override
	public String insertNguoiDung(TaiKhoanAdminUserDTO tk_user_dto) throws InterruptedException, ExecutionException {
		ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("nguoiDung").document(tk_user_dto.getNguoiDung().getDocument_id()).set(tk_user_dto.getNguoiDung());
		return collectionApiFuture.get().getUpdateTime().toString();
	}
	@Override
	public NguoiDung getNguoiDung(String document_id) throws InterruptedException, ExecutionException {
		DocumentReference documentReference = dbFireStore.collection("nguoiDung").document(document_id);
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		NguoiDung admin;	
		if (doc.exists()) {
			admin = doc.toObject(NguoiDung.class);
			return admin;
		}
		return null;
	} 
	@Override
	public String updateNguoiDung(NguoiDung nguoiDung) throws InterruptedException, ExecutionException {
		
		DocumentReference documentReference = dbFireStore.collection("nguoiDung").document(nguoiDung.getDocument_id());
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		if (doc.exists()) {
			ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("nguoiDung").document(nguoiDung.getDocument_id()).set(nguoiDung);
			return collectionApiFuture.get().getUpdateTime().toString();
		}
		return null;
	}
	@Override
	public String deleteNguoiDung(String document_id) {
		ApiFuture<WriteResult> writeResult = dbFireStore.collection("nguoiDung").document(document_id).delete();
		 //Oncomplete listener to check when the above^ write has been completed
	
		return "Successfully Deleted";
		
	}

}
