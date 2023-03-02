package com.kltn.touradminserver.entity;

import java.io.Serializable;
import java.util.List;

import com.google.cloud.firestore.annotation.DocumentId;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Tour implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 9220956547091492679L;
	private String document_id;
	private String tenTour;
	private String thongTin;
	private String viTri;
	private int soNgay;
	private List<String> hinhAnh;
	private String theLoai;
	private String danhGia;
	private boolean phoBien;
	private boolean xuHuong;
}
