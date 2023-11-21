package com.faesa.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.faesa.api.model.Usuario;
import com.faesa.api.service.UsuarioService;

@RestController
@CrossOrigin
@RequestMapping("/usuario")
public class UsuarioController
{
	@Autowired
	private UsuarioService usuarioService;
	
	@GetMapping
	@ResponseBody
	public ResponseEntity<Usuario> login(
		String email,
		String senha
	){
		ResponseEntity<Usuario> response;
		
		try {
			Usuario u = usuarioService.login(email, senha);
			
			if(u != null)
				response = new ResponseEntity(u, HttpStatus.OK);
			else
				response = new ResponseEntity(null, HttpStatus.NO_CONTENT);
		}
		catch(Exception e) {
			e.printStackTrace();
			response = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
		}
		
		return response;
	}
	
	@PostMapping
	public ResponseEntity<Void> cadastro(
		@RequestBody Usuario usuario
	){
		ResponseEntity response;
		
		try {
			boolean inseriu = usuarioService.cadastro(usuario);
			
			if(inseriu)
				response = new ResponseEntity(true, HttpStatus.OK);
			else
				response = new ResponseEntity(false, HttpStatus.BAD_REQUEST);
		}
		catch(Exception e) {
			e.printStackTrace();
			response = new ResponseEntity(null, HttpStatus.BAD_REQUEST);
		}
		
		return response;
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Usuario> getById(
		@PathVariable int id
	) {
		try {
			return new ResponseEntity<Usuario>(
				usuarioService.find(id),
				HttpStatus.OK
			);
		}
		catch(Exception e) {
			return ResponseEntity.internalServerError().build();
		}
	}
}
