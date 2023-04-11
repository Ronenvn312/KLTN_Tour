package com.kltn.touradminserver;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.Serializable;
import java.security.SecureRandom;
import java.util.Arrays;
import java.util.Objects;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@SpringBootApplication
public class TourAdminServerApplication implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public static void main(String[] args) throws IOException {
		ClassLoader classLoader = TourAdminServerApplication.class.getClassLoader();
		File file = new File(Objects.requireNonNull(classLoader.getResource("serviceAccountKey.json")).getFile());
		SecureRandom random = new SecureRandom();
		try {
			FileInputStream serviceAcount = new FileInputStream(file.getAbsolutePath());
			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(serviceAcount))
					.setDatabaseUrl("https://tourapp-d8ea8-default-rtdb.asia-southeast1.firebasedatabase.app").build();
			String name = String.valueOf(random.nextInt());
			FirebaseApp myApp = FirebaseApp.initializeApp(options);
		} catch (Exception e) {
			e.printStackTrace();
		}
		SpringApplication.run(TourAdminServerApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/greeting-javaconfig").allowedOrigins("http://localhost:8080");
			}
		};
	}
	 @Bean
	    public CorsConfigurationSource corsConfiguration() {
	        CorsConfiguration corsConfig = new CorsConfiguration();
	        corsConfig.applyPermitDefaultValues();
	        corsConfig.setAllowCredentials(true);
	        corsConfig.addAllowedMethod("GET");
            corsConfig.addAllowedMethod("PUT");
	        corsConfig.addAllowedMethod("PATCH");
	        corsConfig.addAllowedMethod("POST");
	        corsConfig.addAllowedMethod("OPTIONS");
	        corsConfig.setAllowedOrigins(Arrays.asList("http://localhost:8080"));
	        corsConfig.setAllowedHeaders(Arrays.asList("Authorization", "Requestor-Type"));
	        corsConfig.setExposedHeaders(Arrays.asList("X-Get-Header"));
	        UrlBasedCorsConfigurationSource source =
	                new UrlBasedCorsConfigurationSource();
	        source.registerCorsConfiguration("/**", corsConfig);
	        return source;
	    }
}
