package com.faesa.api.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class Usuario
{
	private int id;
	private String nome;
	private String email;
	private String senha;
	private String bio;
	private byte[] foto;
	private byte[] fotoCapa;
	private Date dtInsert;
	
	private Integer qtdSeguidores;
	private Integer qtdSeguindo;
}
