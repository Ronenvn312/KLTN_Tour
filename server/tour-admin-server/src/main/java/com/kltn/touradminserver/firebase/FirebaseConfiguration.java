//package com.kltn.touradminserver.firebase;
//
//import java.io.IOException;
//import java.io.Serializable;
//
//import javax.annotation.PostConstruct;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.core.io.Resource;
//
//import com.google.auth.oauth2.GoogleCredentials;
//import com.google.firebase.FirebaseApp;
//import com.google.firebase.FirebaseOptions;
//import com.google.firebase.auth.FirebaseAuth;
//
//
//@Configuration
//public class FirebaseConfiguration implements Serializable{
//	/**
//	 * 
//	 */
//	private static final long serialVersionUID = 1L;
//	@Value("classpath:serviceAccountKey.json")
//	Resource resourceFile;
//	@Bean
//	public FirebaseAuth firebaseAuth() {
////		FirebaseOptions options = FirebaseOptions.builder()
//		return FirebaseAuth.getInstance();
//	}
//	@PostConstruct
//	public void initalzeFirebaseApp() throws IOException {
//		FirebaseOptions options = FirebaseOptions.builder()
//				.setCredentials(GoogleCredentials.fromStream(resourceFile.getInputStream()))
//				.setServiceAccountId("firebase-adminsdk-l6gmf@tourapp-d8ea8.iam.gserviceaccount.com")
//				.build();
//		FirebaseApp.initializeApp(options);
//	}
//}
