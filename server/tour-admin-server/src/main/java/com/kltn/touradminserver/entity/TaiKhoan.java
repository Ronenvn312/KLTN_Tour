package com.kltn.touradminserver.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class TaiKhoan {
	private String userName;
	private String password;
	private boolean status;// mặc định flase --. verify sang true
	private boolean isAdmin;// amind hay ko
	private String code;
}
