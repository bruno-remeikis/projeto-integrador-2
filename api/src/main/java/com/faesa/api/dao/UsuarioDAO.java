package com.faesa.api.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.faesa.api.connection.OracleConnector;
import com.faesa.api.model.Usuario;

public class UsuarioDAO extends DAO
{
	public Usuario selectLogin(String email, String senha) throws Exception
	{
		String query =
			"SELECT * FROM USUARIO WHERE EMAIL = ? AND SENHA = ?";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setString(1, email);
			ps.setString(2, senha);
			
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				Usuario u = new Usuario();
				u.setId(rs.getInt("ID"));
				u.setNome(rs.getString("NOME"));
				u.setEmail(rs.getString("EMAIL"));
				
				return u;
			}
			
			return null;
		}
	}
	
	public boolean insert(Usuario u) throws Exception
	{
		String query =
			"INSERT INTO USUARIO (ID, NOME, EMAIL, SENHA) " +
			"VALUES (ID_USUARIO_SEQ.NEXTVAL, ?, ?, ?)";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setString(1, u.getNome());
			ps.setString(2, u.getEmail());
			ps.setString(3, u.getSenha());
			
			return ps.executeUpdate() == 1;
		}
	}
	
	public Usuario select(int id) throws Exception
	{
		String query =
			"SELECT * FROM USUARIO WHERE ID = ?";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setInt(1, id);
			
			ResultSet rs = ps.executeQuery();
			
			if(rs.next()) {
				Usuario u = new Usuario();
				u.setId(rs.getInt("ID"));
				u.setNome(rs.getString("NOME"));
				u.setEmail(rs.getString("EMAIL"));
				u.setBio(rs.getString("BIO"));
				u.setDtInsert(this.getDate(rs, "DT_INSERT"));
				return u;
			}
			
			return null;
		}
	}
}
