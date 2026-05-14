package com.vinicius.membermanagement.service;

import com.vinicius.membermanagement.dto.MemberRequestDTO;
import com.vinicius.membermanagement.dto.MemberResponseDTO;
import com.vinicius.membermanagement.entity.Member;
import com.vinicius.membermanagement.exception.BusinessException;
import com.vinicius.membermanagement.repository.MemberRepository;
import com.vinicius.membermanagement.validator.CpfValidator;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public List<MemberResponseDTO> findAll() {
        return memberRepository.findAll()
                .stream()
                .map(MemberResponseDTO::from)
                .toList();
    }

    public MemberResponseDTO findById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Membro não encontrado.", HttpStatus.NOT_FOUND));
        return MemberResponseDTO.from(member);
    }

    public MemberResponseDTO create(MemberRequestDTO dto) {
        String cleanCpf = CpfValidator.clean(dto.getCpf());

        if (!CpfValidator.isValid(cleanCpf)) {
            throw new BusinessException("CPF inválido.", HttpStatus.BAD_REQUEST, "cpf");
        }

        if (memberRepository.existsByCpf(cleanCpf)) {
            throw new BusinessException("CPF já cadastrado.", HttpStatus.CONFLICT, "cpf");
        }

        validateAge(dto.getBirthDate());

        Member member = Member.builder()
                .name(dto.getName())
                .cpf(cleanCpf)
                .birthDate(dto.getBirthDate())
                .active(dto.isActive())
                .build();

        return MemberResponseDTO.from(memberRepository.save(member));
    }

    public MemberResponseDTO update(Long id, MemberRequestDTO dto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Membro não encontrado.", HttpStatus.NOT_FOUND));

        String cleanCpf = CpfValidator.clean(dto.getCpf());

        if (!CpfValidator.isValid(cleanCpf)) {
            throw new BusinessException("CPF inválido.", HttpStatus.BAD_REQUEST, "cpf");
        }

        // allow same CPF for the same member, reject if belongs to another
        memberRepository.findByCpf(cleanCpf).ifPresent(existing -> {
            if (!existing.getId().equals(id)) {
                throw new BusinessException("CPF já cadastrado.", HttpStatus.CONFLICT, "cpf");
            }
        });

        validateAge(dto.getBirthDate());

        member.setName(dto.getName());
        member.setCpf(cleanCpf);
        member.setBirthDate(dto.getBirthDate());
        member.setActive(dto.isActive());

        return MemberResponseDTO.from(memberRepository.save(member));
    }

    public void delete(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new BusinessException("Membro não encontrado.", HttpStatus.NOT_FOUND);
        }
        memberRepository.deleteById(id);
    }

    public MemberResponseDTO toggleStatus(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new BusinessException("Membro não encontrado.", HttpStatus.NOT_FOUND));
        member.setActive(!member.isActive());
        return MemberResponseDTO.from(memberRepository.save(member));
    }

    private void validateAge(LocalDate birthDate) {
        int age = Period.between(birthDate, LocalDate.now()).getYears();
        if (age < 18) {
            throw new BusinessException("O membro deve ter no mínimo 18 anos.", HttpStatus.BAD_REQUEST, "birthDate");
        }
    }
}
