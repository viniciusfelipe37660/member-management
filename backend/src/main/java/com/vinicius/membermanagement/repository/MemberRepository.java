package com.vinicius.membermanagement.repository;

import com.vinicius.membermanagement.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByCpf(String cpf);

    Optional<Member> findByCpf(String cpf);
}
