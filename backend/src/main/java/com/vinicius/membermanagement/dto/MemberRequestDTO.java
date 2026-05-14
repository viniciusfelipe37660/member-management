package com.vinicius.membermanagement.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberRequestDTO {

    @NotBlank(message = "Nome é obrigatório.")
    private String name;

    @NotBlank(message = "CPF é obrigatório.")
    private String cpf;

    @NotNull(message = "Data de nascimento é obrigatória.")
    private LocalDate birthDate;

    private boolean active = true;
}
