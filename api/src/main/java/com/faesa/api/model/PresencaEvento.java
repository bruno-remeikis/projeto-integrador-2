package com.faesa.api.model;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PresencaEvento
{
	private Integer id;
	private int idUsuario;
	private int idEvento;
	private int resposta;
	private Date dtInsert;
}
