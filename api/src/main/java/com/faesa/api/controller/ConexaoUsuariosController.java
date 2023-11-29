package com.faesa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faesa.api.model.ConexaoUsuarios;
import com.faesa.api.model.Usuario;
import com.faesa.api.service.ConexaoUsuariosService;

@RestController
@CrossOrigin
@RequestMapping("/conexaoUsuarios")
public class ConexaoUsuariosController
{
	@Autowired
	private ConexaoUsuariosService conexaoUsuariosService;
	
	@PostMapping
	public ResponseEntity<Void> post(
		@RequestBody ConexaoUsuarios c	
	) {
		try {
			conexaoUsuariosService.create(c);
			return ResponseEntity.ok().build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@DeleteMapping
	public ResponseEntity<Void> delete(
		int idSeguido,
		@RequestHeader("user") int idUsuarioSession
	) {
		try {
			conexaoUsuariosService.delete(idSeguido, idUsuarioSession);
			return ResponseEntity.ok().build();
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping("/seguindo/{idUsuario}")
	public ResponseEntity<List<Usuario>> getSeguindo(
		@PathVariable int idUsuario
	) {
		try {
			return ResponseEntity.ok(
				conexaoUsuariosService.listSeguindo(idUsuario)
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
	
	@GetMapping("/seguidores/{idUsuario}")
	public ResponseEntity<List<Usuario>> getSeguidores(
		@PathVariable int idUsuario
	) {
		try {
			return ResponseEntity.ok(
				conexaoUsuariosService.listSeguidores(idUsuario)
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().build();
		}
	}
}
