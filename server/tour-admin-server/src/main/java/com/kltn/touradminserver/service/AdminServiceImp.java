package com.kltn.touradminserver.service;

import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import com.kltn.touradminserver.entity.AdminUser;

@Service
public class AdminServiceImp implements AdminUserService {
	Firestore dbFireStore = FirestoreClient.getFirestore();
	@Override
	public String createAdmin(AdminUser admin) throws InterruptedException, ExecutionException {
		
		ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("admin").document(admin.getTen()).set(admin);
		return collectionApiFuture.get().getUpdateTime().toString();
	}
	@Override
	public AdminUser getAdmin(String document_id) throws InterruptedException, ExecutionException {
		DocumentReference documentReference = dbFireStore.collection("admin").document(document_id);
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		AdminUser admin;	
		if (doc.exists()) {
			admin = doc.toObject(AdminUser.class);
			return admin;
		}
		return null;
	} 
	@Override
	public String updateAdmin(AdminUser admin) throws InterruptedException, ExecutionException {
		
		DocumentReference documentReference = dbFireStore.collection("admin").document(admin.getDocument_id());
		ApiFuture<DocumentSnapshot> future = documentReference.get();
		DocumentSnapshot doc = future.get();
		if (doc.exists()) {
			ApiFuture<WriteResult> collectionApiFuture = dbFireStore.collection("admin").document(admin.getTen()).set(admin);
			return collectionApiFuture.get().getUpdateTime().toString();
		}
		return "Admin not exists";
	}
	@Override
	public String deleteAdmin(String document_id) {
		ApiFuture<WriteResult> writeResult = dbFireStore.collection("admin").document(document_id).delete();
		
		return "Successfully Deleted";
	}

}
