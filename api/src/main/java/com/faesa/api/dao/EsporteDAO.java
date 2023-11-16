package com.faesa.api.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.faesa.api.connection.OracleConnector;
import com.faesa.api.model.Esporte;

public class EsporteDAO extends DAO
{
	public List<Esporte> selectAll() throws Exception
	{
		String query = "SELECT * FROM ESPORTE";
		
		try(
			Connection con = OracleConnector.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
			ResultSet rs = ps.executeQuery();
		) {
			List<Esporte> esportes = new ArrayList<Esporte>();
			
			while(rs.next())
			{
				Esporte e = new Esporte();
				e.setId(rs.getInt("ID"));
				e.setNome(rs.getString("NOME"));
				e.setDtInsert(this.getDate(rs, "DT_INSERT"));
				
				esportes.add(e);
			}
			
			return esportes;
		}
	}
}
