package com.faesa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faesa.api.model.Usuario;
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
	
	@GetMapping("/participantes/{idEvento}")
	public ResponseEntity<List<Usuario>> getParticipantes(
		@PathVariable int idEvento
	) {
		try {
			return ResponseEntity.ok(
				presencaEventoService.listParticipantes(idEvento)
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
}
