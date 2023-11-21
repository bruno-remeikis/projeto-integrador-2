package com.faesa.api.service;

import org.springframework.stereotype.Service;

import com.faesa.api.dao.PresencaEventoDAO;
import com.faesa.api.model.PresencaEvento;

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
}
