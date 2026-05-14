package com.vinicius.membermanagement.dto;

import com.vinicius.membermanagement.entity.Member;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MemberResponseDTO {

    private Long id;
    private String name;
    private String cpf;
    private LocalDate birthDate;
    private boolean active;

    public static MemberResponseDTO from(Member member) {
        MemberResponseDTO dto = new MemberResponseDTO();
        dto.setId(member.getId());
        dto.setName(member.getName());
        dto.setCpf(member.getCpf());
        dto.setBirthDate(member.getBirthDate());
        dto.setActive(member.isActive());
        return dto;
    }
}
