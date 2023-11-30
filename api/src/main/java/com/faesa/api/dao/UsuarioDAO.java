package com.faesa.api.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

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
	
	public Usuario select(int id, int idSession) throws Exception
	{
		String query =
			"SELECT " +
			"	 U.* " +
			"	,( " +
			"		SELECT COUNT(*) FROM CONEXAO_USUARIOS SEGUIDOR " +
			"		WHERE SEGUIDOR.ID_SEGUIDO = U.ID " +
			"	) AS QTD_SEGUIDORES " +
			"	,(" +
			"		SELECT COUNT(*) FROM CONEXAO_USUARIOS SEGUIDO " +
			"		WHERE SEGUIDO.ID_SEGUIDOR = U.ID " +
			"	) AS QTD_SEGUINDO " +
			"	,CASE " +
			"		WHEN SESSION_SEGUINDO.ID IS NOT NULL THEN 'TRUE' " +
			"		ELSE 'FALSE' " +
			"	END AS SESSION_SEGUINDO " +
			"FROM USUARIO U " +
			"LEFT JOIN CONEXAO_USUARIOS SESSION_SEGUINDO ON " +
			"	SESSION_SEGUINDO.ID_SEGUIDOR = ? AND " +
			"	SESSION_SEGUINDO.ID_SEGUIDO = U.ID " +
			"WHERE U.ID = ?";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setInt(1, idSession);
			ps.setInt(2, id);
			
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
			{
				Usuario u = new Usuario();
				
				u.setId(rs.getInt("ID"));
				u.setNome(rs.getString("NOME"));
				u.setEmail(rs.getString("EMAIL"));
				u.setBio(rs.getString("BIO"));
				u.setDtInsert(this.getDate(rs, "DT_INSERT"));
				
				u.setQtdSeguidores(rs.getInt("QTD_SEGUIDORES"));
				u.setQtdSeguindo(rs.getInt("QTD_SEGUINDO"));
				u.setSessionSeguindo(rs.getBoolean("SESSION_SEGUINDO"));
				
				return u;
			}
			
			return null;
		}
	}
	
	public List<Usuario> selectByName(String pesquisa) throws Exception
	{
		String query =
			"SELECT * FROM USUARIO WHERE UPPER(NOME) LIKE '%' || UPPER(?) || '%'";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setString(1, pesquisa);
			
			try(ResultSet rs = ps.executeQuery())
			{
				List<Usuario> usuarios = new ArrayList<Usuario>();
				
				while(rs.next())
				{
					Usuario u = new Usuario();
					
					u.setId(rs.getInt("ID"));
					u.setNome(rs.getString("NOME"));
					u.setEmail(rs.getString("EMAIL"));
					//u.setSessionSeguindo(rs.getBoolean("SESSION_SEGUINDO"));
					
					usuarios.add(u);
				}
			
				return usuarios;
			}
		}
	}
}
