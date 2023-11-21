package com.faesa.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faesa.api.service.PresencaEventoService;

@RestController
@CrossOrigin
@RequestMapping("/presencaEvento")
public class PresencaEventoController
{
	@Autowired
	private PresencaEventoService presencaEventoService;
	
	@PostMapping
	public ResponseEntity<Void> post(int idUsuario, int idEvento)
	{
		try {
			presencaEventoService.marcarPresenca(idUsuario, idEvento);
			return ResponseEntity.ok().build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
}
