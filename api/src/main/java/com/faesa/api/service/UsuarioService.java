package com.faesa.api.service;

import org.springframework.stereotype.Service;

import com.faesa.api.dao.UsuarioDAO;
import com.faesa.api.model.Usuario;

@Service
public class UsuarioService
{
	public Usuario login(String email, String senha) throws Exception
	{
		Usuario u = new UsuarioDAO().selectLogin(email, senha);
		return u;
	}
	
	public boolean cadastro(Usuario u) throws Exception
	{
		return new UsuarioDAO().insert(u);
	}
	
	public Usuario find(int id) throws Exception
	{
		return new UsuarioDAO().select(id);
	}
}
