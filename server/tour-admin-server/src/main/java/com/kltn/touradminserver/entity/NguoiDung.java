package com.kltn.touradminserver.entity;

import com.google.cloud.firestore.annotation.DocumentId;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NguoiDung {
	private String document_id;// username của tk
	private String ten;
	private String diaChi;
	private String email;
	private String sdt;
}
