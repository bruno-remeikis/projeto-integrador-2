package com.faesa.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.faesa.api.dao.EsporteDAO;
import com.faesa.api.model.Esporte;

@Service
public class EsporteService
{
	public List<Esporte> list() throws Exception
	{
		return new EsporteDAO().selectAll();
	}
}
