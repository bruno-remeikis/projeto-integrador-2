package com.faesa.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.faesa.api.model.Esporte;
import com.faesa.api.service.EsporteService;

@RestController
@CrossOrigin
@RequestMapping("/esporte")
public class EsporteController
{
	@Autowired
	private EsporteService esporteService;
	
	@GetMapping
	public ResponseEntity<List<Esporte>> get()
	{
		try {
			return ResponseEntity.ok(
				esporteService.list()
			);
		}
		catch(Exception e) {
			e.printStackTrace();
			return ResponseEntity.badRequest().build();
		}
	}
}
