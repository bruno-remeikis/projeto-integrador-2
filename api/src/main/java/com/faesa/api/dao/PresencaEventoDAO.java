package com.faesa.api.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;

import com.faesa.api.connection.OracleConnector;
import com.faesa.api.model.PresencaEvento;
import com.faesa.api.model.Usuario;

public class PresencaEventoDAO extends DAO
{	
	public PresencaEvento select(int idUsuario, int idEvento) throws Exception
	{
		String query =
			"SELECT * FROM PRESENCA_EVENTO WHERE ID_USUARIO = ? AND ID_EVENTO = ?";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, idUsuario);
			ps.setInt(2, idEvento);
			
			try(ResultSet rs = ps.executeQuery())
			{
				if(rs.next())
				{
					PresencaEvento pe = new PresencaEvento();
					pe.setId(rs.getInt("ID"));
					pe.setIdUsuario(rs.getInt("ID_USUARIO"));
					pe.setIdEvento(rs.getInt("ID_EVENTO"));
					pe.setResposta(rs.getInt("RESPOSTA"));
					pe.setDtInsert(this.getDate(rs, "DT_INSERT"));
					return pe;
				}
				
				return null;
			}
		}
	}
	
	public void insert(PresencaEvento presencaEvento) throws Exception
	{
		String query =
			"INSERT INTO PRESENCA_EVENTO(ID, ID_USUARIO, ID_EVENTO, RESPOSTA) " +
			"VALUES (ID_PRESENCA_EVENTO_SEQ.NEXTVAL, ?, ?, ?)";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, presencaEvento.getIdUsuario());
			ps.setInt(2, presencaEvento.getIdEvento());
			ps.setInt(3, presencaEvento.getResposta());
			
			ps.execute();
		}
	}
	
	public void delete(int id) throws Exception
	{
		String query =
			"DELETE FROM PRESENCA_EVENTO WHERE ID = ?";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, id);
			
			ps.execute();
		}
	}
	
	public List<Usuario> selectParticipantes(int idEvento) throws Exception
	{
		String query =
			"SELECT USUARIO.* FROM USUARIO " +
			"INNER JOIN PRESENCA_EVENTO ON " +
			"	USUARIO.ID = PRESENCA_EVENTO.ID_USUARIO " +
			"WHERE PRESENCA_EVENTO.ID_EVENTO = ?";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		) {
			ps.setInt(1, idEvento);
				
			try(ResultSet rs = ps.executeQuery())
			{
				List<Usuario> participantes = new LinkedList<Usuario>();
				
				while(rs.next())
				{
					Usuario u = new Usuario();
					
					u.setId(rs.getInt("ID"));
					u.setNome(rs.getString("NOME"));
					u.setFoto(rs.getBytes("FOTO"));
					u.setDtInsert(this.getDate(rs, "DT_INSERT"));
					
					participantes.add(u);
				}
				
				return participantes;
			}
		}
	}
}
