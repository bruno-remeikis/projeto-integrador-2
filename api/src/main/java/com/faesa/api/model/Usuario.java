package com.faesa.api.model;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getSenha() {
		return senha;
	}
	public void setSenha(String senha) {
		this.senha = senha;
	}
	public String getBio() {
		return bio;
	}
	public void setBio(String bio) {
		this.bio = bio;
	}
	public byte[] getFoto() {
		return foto;
	}
	public void setFoto(byte[] foto) {
		this.foto = foto;
	}
	public byte[] getFotoCapa() {
		return fotoCapa;
	}
	public void setFotoCapa(byte[] fotoCapa) {
		this.fotoCapa = fotoCapa;
	}
	public Date getDtInsert() {
		return dtInsert;
	}
	public void setDtInsert(Date dtInsert) {
		this.dtInsert = dtInsert;
	}
}
