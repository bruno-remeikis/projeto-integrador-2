package com.faesa.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.faesa.api.dao.PresencaEventoDAO;
import com.faesa.api.model.PresencaEvento;
import com.faesa.api.model.Usuario;

@Service
public class PresencaEventoService
{
	public void marcarPresenca(int idUsuario, int idEvento) throws Exception
	{
		PresencaEventoDAO dao = new PresencaEventoDAO();
		
		PresencaEvento pe = dao.select(idUsuario, idEvento);
		
		if(pe == null)
		{
			pe = new PresencaEvento();
			pe.setIdUsuario(idUsuario);
			pe.setIdEvento(idEvento);
			pe.setResposta(1);
			
			dao.insert(pe);
		}
		else
			dao.delete(pe.getId());
	}
	
	public List<Usuario> listParticipantes(int idEvento) throws Exception
	{
		return new PresencaEventoDAO().selectParticipantes(idEvento);
	}
	
	public void deleteByEvento(int idEvento) throws Exception
	{
		new PresencaEventoDAO().deleteByEvento(idEvento);
	}
}
