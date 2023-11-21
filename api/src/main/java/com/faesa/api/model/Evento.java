package com.faesa.api.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Evento
{
	private Integer id;
	private String nome;
	private Integer idUsuarioCriador;
	private Integer idEsporte;
	private String descricao;
	private Date dtEvento;
	private String local;
	private Date dtInsert;
	
	private String nomeUsuario;
	private String nomeEsporte;
	private Integer qtdPresencas;
	private Boolean presente;
}
