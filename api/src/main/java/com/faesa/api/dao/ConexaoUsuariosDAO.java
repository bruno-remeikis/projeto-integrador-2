package com.faesa.api.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.faesa.api.connection.OracleConnector;
import com.faesa.api.model.ConexaoUsuarios;
import com.faesa.api.model.Usuario;

public class ConexaoUsuariosDAO extends DAO
{
	public void insert(ConexaoUsuarios c) throws Exception
	{
		String query =
			"INSERT INTO CONEXAO_USUARIOS (ID, ID_SEGUIDOR, ID_SEGUIDO) " +
			"VALUES (ID_CONEXAO_USUARIOS_SEQ.NEXTVAL, ?, ?)";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, c.getIdSeguidor());
			ps.setInt(2, c.getIdSeguido());
			
			ps.execute();
		}
	}
	
	public void delete(int idSeguido, int idUsuarioSession) throws Exception
	{
		String query =
			"DELETE FROM CONEXAO_USUARIOS " +
			"WHERE ID_SEGUIDOR = ? AND ID_SEGUIDO = ?";
			
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, idUsuarioSession);
			ps.setInt(2, idSeguido);
			
			ps.execute();
		}
	}
	
	public List<Usuario> selectSeguindo(int idUsuario) throws Exception
	{
		String query =
			"SELECT U.* " +
			"FROM USUARIO U " +
			"INNER JOIN CONEXAO_USUARIOS CU ON " +
			"	CU.ID_SEGUIDO = U.ID " +
			"WHERE CU.ID_SEGUIDOR = ?";
			
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, idUsuario);
			
			try(ResultSet rs = ps.executeQuery())
			{
				List<Usuario> usuarios = new ArrayList<Usuario>();
				
				while(rs.next()) {
					Usuario u = new Usuario();
					u.setId(rs.getInt("ID"));
					u.setNome(rs.getString("NOME"));
					usuarios.add(u);
				}
				
				return usuarios;
			}
		}
	}
	
	public List<Usuario> selectSeguidores(int idUsuario) throws Exception
	{
		String query =
			"SELECT U.* " +
			"FROM USUARIO U " +
			"INNER JOIN CONEXAO_USUARIOS CU ON " +
			"	CU.ID_SEGUIDOR = U.ID " +
			"WHERE CU.ID_SEGUIDO = ?";
			
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, idUsuario);
			
			try(ResultSet rs = ps.executeQuery())
			{
				List<Usuario> usuarios = new ArrayList<Usuario>();
				
				while(rs.next()) {
					Usuario u = new Usuario();
					u.setId(rs.getInt("ID"));
					u.setNome(rs.getString("NOME"));
					usuarios.add(u);
				}
				
				return usuarios;
			}
		}
	}
}
