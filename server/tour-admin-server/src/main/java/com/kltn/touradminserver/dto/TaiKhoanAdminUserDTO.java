package com.kltn.touradminserver.dto;

import com.kltn.touradminserver.entity.NguoiDung;
import com.kltn.touradminserver.entity.TaiKhoan;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Data
@NoArgsConstructor
public class TaiKhoanAdminUserDTO {
	private TaiKhoan tk;
	private NguoiDung nguoiDung;
	
}
