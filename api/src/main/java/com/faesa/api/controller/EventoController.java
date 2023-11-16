package com.faesa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.faesa.api.model.Evento;
import com.faesa.api.service.EventoService;

@RestController
@CrossOrigin
@RequestMapping("/evento")
public class EventoController
{
	@Autowired
	private EventoService eventoService;
	
	@PostMapping
	@ResponseBody
	public ResponseEntity<Void> post(
		@RequestBody Evento evento
	) {
		try {
			eventoService.create(evento);
			return ResponseEntity.ok().build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Evento> get(
		@PathVariable int id
	) {
		try {
			Evento e = eventoService.findById(id);
			
			if(e == null)
				return new ResponseEntity("null", HttpStatus.OK);
			
			return new ResponseEntity<Evento>(
				e,
				HttpStatus.OK
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/eventosUsuario/{idUsuario}")
	public ResponseEntity<List<Evento>> getEventosUsuario(
		@PathVariable int idUsuario
	) {
		try {
			return ResponseEntity.ok(
				eventoService.findByIdUsuario(idUsuario)
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/eventosParticipacaoUsuario/{idUsuario}")
	public ResponseEntity<List<Evento>> getEventosParticipacaoUsuario(
		@PathVariable int idUsuario
	) {
		try {
			return ResponseEntity.ok(
				eventoService.findByIdUsuarioParticipacao(idUsuario)
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
	
	@GetMapping("/feed/{idUsuario}")
	public ResponseEntity<List<Evento>> getFeed(
		@PathVariable int idUsuario
	) {
		try {
			return ResponseEntity.ok(
				eventoService.findByIdUsuarioFeed(idUsuario)
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
}