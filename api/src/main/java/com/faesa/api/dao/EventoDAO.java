package com.faesa.api.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.faesa.api.connection.OracleConnector;
import com.faesa.api.model.Evento;
import com.faesa.api.model.Usuario;

public class EventoDAO extends DAO
{
	private Evento criarEvento(ResultSet rs) throws Exception
	{
		Evento e = new Evento();
		
		e.setId(rs.getInt("ID"));
		e.setNome(rs.getString("NOME"));
		e.setIdUsuarioCriador(rs.getInt("ID_USUARIO_CRIADOR"));
		e.setIdEsporte(rs.getInt("ID_ESPORTE"));
		e.setDescricao(rs.getString("DESCRICAO"));
		e.setDtEvento(this.getDate(rs, "DT_EVENTO"));
		e.setLocal(rs.getString("LOCAL"));
		e.setDtInsert(this.getDate(rs, "DT_INSERT"));
		
		e.setNomeUsuario(rs.getString("NOME_USUARIO"));
		e.setNomeEsporte(rs.getString("NOME_ESPORTE"));
		e.setQtdPresencas(rs.getInt("QTD_PRESENCAS"));
		e.setPresente(rs.getInt("PRESENTE") > 0);
		
		return e;
	}
	
	public void insert(Evento e) throws Exception
	{
		String query =
			"INSERT INTO EVENTO (ID, NOME, ID_USUARIO_CRIADOR, ID_ESPORTE, DESCRICAO, DT_EVENTO, LOCAL) " +
			"VALUES (ID_EVENTO_SEQ.NEXTVAL, ?, ?, ?, ?, ?, ?)";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setString(1, e.getNome());
			ps.setInt(2, e.getIdUsuarioCriador());
			ps.setInt(3, e.getIdEsporte());
			ps.setString(4, e.getDescricao());
			ps.setDate(5, this.getSqlDate(e.getDtEvento()));
			ps.setString(6, e.getLocal());
			
			ps.execute();
		}
	}
	
	public Evento selectById(int id, int idUsuarioSession) throws Exception
	{
		String query =
			"SELECT " +
			"	 EVENTO.* " +
			"	,USUARIO.NOME AS NOME_USUARIO " +
			"	,ESPORTE.NOME AS NOME_ESPORTE " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS QTD_PRESENCAS " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_USUARIO = ? AND SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS PRESENTE " +
			"FROM EVENTO " +
			"INNER JOIN USUARIO ON " +
			"	USUARIO.ID = EVENTO.ID_USUARIO_CRIADOR " +
			"INNER JOIN ESPORTE ON " +
			"	ESPORTE.ID = EVENTO.ID_ESPORTE " +
			"WHERE EVENTO.ID = ?";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query)
		){
			ps.setInt(1, idUsuarioSession);
			ps.setInt(2, id);
			
			ResultSet rs = ps.executeQuery();
			
			if(rs.next())
				return criarEvento(rs);
			
			return new Evento();
		}
	}
	
	public List<Evento> selectByIdUsuario(int idUsuario, int idUsuarioSession) throws Exception
	{
		String query =
			"SELECT " +
			"	 EVENTO.* " +
			"	,USUARIO.NOME AS NOME_USUARIO " +
			"	,ESPORTE.NOME AS NOME_ESPORTE " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS QTD_PRESENCAS " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_USUARIO = ? AND SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS PRESENTE " +
			"FROM EVENTO " +
			"INNER JOIN USUARIO ON " +
			"	USUARIO.ID = EVENTO.ID_USUARIO_CRIADOR " +
			"INNER JOIN ESPORTE ON " +
			"	ESPORTE.ID = EVENTO.ID_ESPORTE " +
			"WHERE EVENTO.ID_USUARIO_CRIADOR = ?";
			
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setInt(1, idUsuarioSession);
			ps.setInt(2, idUsuario);
			
			ResultSet rs = ps.executeQuery();
			
			List<Evento> eventos = new ArrayList<Evento>();
			while(rs.next())
				eventos.add(
					criarEvento(rs)
				);
			
			return eventos;
		}
	}
	
	public List<Evento> selectByIdUsuarioParticipacao(int idUsuario, int idUsuarioSession) throws Exception
	{
		String query =
			"SELECT " +
			"	 EVENTO.* " +
			"	,USUARIO.NOME AS NOME_USUARIO " +
			"	,ESPORTE.NOME AS NOME_ESPORTE " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS QTD_PRESENCAS " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_USUARIO = ? AND SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS PRESENTE " +
			"FROM EVENTO " +
			"INNER JOIN USUARIO ON " +
			"	USUARIO.ID = EVENTO.ID_USUARIO_CRIADOR " +
			"INNER JOIN ESPORTE ON " +
			"	ESPORTE.ID = EVENTO.ID_ESPORTE " +
			"INNER JOIN PRESENCA_EVENTO ON " +
			"	PRESENCA_EVENTO.ID_USUARIO = EVENTO.ID_USUARIO_CRIADOR AND " +
			"	PRESENCA_EVENTO.ID_EVENTO = EVENTO.ID " +
			"WHERE PRESENCA_EVENTO.ID_USUARIO = ?";
			
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setInt(1, idUsuarioSession);
			ps.setInt(2, idUsuario);
			
			ResultSet rs = ps.executeQuery();
			
			List<Evento> eventos = new ArrayList<Evento>();
			while(rs.next())
				eventos.add(
					criarEvento(rs)
				);
			
			return eventos;
		}
	}
	
	public List<Evento> selectByIdUsuarioFeed(int idUsuario) throws Exception
	{
		String query =
			"SELECT " +
			"	 EVENTO.* " +
			"	,USUARIO.NOME AS NOME_USUARIO " +
			"	,ESPORTE.NOME AS NOME_ESPORTE " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_USUARIO = 1 AND SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS QTD_PRESENCAS " +
			"	,(" +
			"		SELECT COUNT(*) FROM PRESENCA_EVENTO SUB_PE " +
			"		WHERE SUB_PE.ID_USUARIO = ? AND SUB_PE.ID_EVENTO = EVENTO.ID" +
			"	) AS PRESENTE " +
			"FROM EVENTO " +
			"INNER JOIN USUARIO ON " +
			"	USUARIO.ID = EVENTO.ID_USUARIO_CRIADOR " +
			"INNER JOIN ESPORTE ON " +
			"	ESPORTE.ID = EVENTO.ID_ESPORTE " +
			"WHERE EVENTO.ID_USUARIO_CRIADOR = ? AND " +
			"	EVENTO.ID NOT IN ( " +
			"		SELECT PRESENCA_EVENTO.ID_EVENTO " +
			"		FROM PRESENCA_EVENTO " +
			"		WHERE PRESENCA_EVENTO.ID_EVENTO = EVENTO.ID AND " +
			"			PRESENCA_EVENTO.ID_USUARIO = EVENTO.ID_USUARIO_CRIADOR " +
			"	)";
			
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
		){
			ps.setInt(1, idUsuario);
			ps.setInt(2, idUsuario);
			
			ResultSet rs = ps.executeQuery();
			
			List<Evento> eventos = new ArrayList<Evento>();
			while(rs.next())
				eventos.add(
					criarEvento(rs)
				);
			
			return eventos;
		}
	}
}
