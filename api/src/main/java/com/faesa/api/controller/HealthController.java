package com.faesa.api.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/health")
public class HealthController
{
	@GetMapping
	public String health()
	{
		return "API status: OK";
	}
   
   /*
   
   GET
   POST
   PUT
   DELETE
   
   */
}
