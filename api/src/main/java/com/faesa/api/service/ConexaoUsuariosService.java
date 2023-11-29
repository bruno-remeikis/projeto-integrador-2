package com.faesa.api.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.faesa.api.dao.ConexaoUsuariosDAO;
import com.faesa.api.model.ConexaoUsuarios;
import com.faesa.api.model.Usuario;

@Service
public class ConexaoUsuariosService
{
	private ConexaoUsuariosDAO dao = new ConexaoUsuariosDAO();
	
	public void create(ConexaoUsuarios c) throws Exception {
		dao.insert(c);
	}
	
	public void delete(int idSeguido, int idUsuarioSession) throws Exception {
		dao.delete(idSeguido, idUsuarioSession);
	}
	
	public List<Usuario> listSeguindo(int idUsuario) throws Exception {
		return dao.selectSeguindo(idUsuario);
	}
	
	public List<Usuario> listSeguidores(int idUsuario) throws Exception {
		return dao.selectSeguidores(idUsuario);
	}
}
