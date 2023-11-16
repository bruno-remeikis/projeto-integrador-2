package com.faesa.api.dao;

import java.sql.ResultSet;
import java.sql.SQLException;

public abstract class DAO
{
	/**
	 * Pega uma coluna {@code col} do {@code ResultSet} {@code rs} no formato {@code java.util.Date).
	 * @param rs {@code ResultSet}
	 * @param col {@code String} Nome da coluna/campo.
	 * @return {@code java.util.Date} util Date
	 * @throws SQLException
	 */
	protected java.util.Date getDate(ResultSet rs, String col) throws SQLException
	{
		return new java.util.Date(rs.getDate(col).getTime());
	}
	
	/**
	 * Converte uma {@code util Date} para {@code sql Date}.
	 * @param utilDate {@code java.util.Date} util Date
	 * @return {@code java.sql.Date} sql Date
	 */
	protected java.sql.Date getSqlDate(java.util.Date utilDate)
	{
		return new java.sql.Date(utilDate.getTime());
	}
}
