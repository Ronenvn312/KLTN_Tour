package com.kltn.touradminserver.entity;

import com.google.cloud.firestore.annotation.DocumentId;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NguoiDung {
	@DocumentId
	private String document_id;
	private String ten;
	private String diaChi;
	private String email;
	private String sdt;
	private String avatar;
}
