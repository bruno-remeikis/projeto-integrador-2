package com.faesa.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.faesa.api.dao.EventoDAO;
import com.faesa.api.model.Evento;

@Service
public class EventoService
{
	public int create(Evento e) throws Exception
	{
		return new EventoDAO().insert(e);
	}
	
	public Evento findById(int id, int idUsuarioSession) throws Exception
	{
		return new EventoDAO().selectById(id, idUsuarioSession);
	}
	
	public List<Evento> findByIdUsuario(int idUsuario, int idUsuarioSession) throws Exception
	{
		return new EventoDAO().selectByIdUsuario(idUsuario, idUsuarioSession);
	}
	
	public List<Evento> findByIdUsuarioParticipacao(int idUsuario) throws Exception
	{
		return new EventoDAO().selectByIdUsuarioParticipacao(idUsuario);
	}
	
	public List<Evento> findByIdUsuarioFeed(int idUsuario) throws Exception
	{
		return new EventoDAO().selectByIdUsuarioFeed(idUsuario);
	}
}
