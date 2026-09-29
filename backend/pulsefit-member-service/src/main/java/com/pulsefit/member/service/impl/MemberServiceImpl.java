package com.pulsefit.member.service.impl;

import com.pulsefit.member.dto.MemberRequestDto;
import com.pulsefit.member.dto.MemberResponseDto;
import com.pulsefit.member.entity.Member;
import com.pulsefit.member.exception.DuplicateEmailException;
import com.pulsefit.member.exception.MemberNotFoundException;
import com.pulsefit.member.repository.MemberRepository;
import com.pulsefit.member.service.MemberService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    public MemberServiceImpl(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    public MemberResponseDto createMember(MemberRequestDto requestDto) {
        if (memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new DuplicateEmailException("Member with email '" + requestDto.getEmail() + "' already exists");
        }

        Member member = new Member();
        member.setName(requestDto.getName());
        member.setEmail(requestDto.getEmail());
        member.setPhone(requestDto.getPhone());
        member.setAddress(requestDto.getAddress());
        member.setStatus(requestDto.getStatus() != null && !requestDto.getStatus().isBlank() ? requestDto.getStatus() : "ACTIVE");

        Member saved = memberRepository.save(member);
        return mapToResponseDto(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<MemberResponseDto> getAllMembers() {
        return memberRepository.findAll().stream()
                .map(this::mapToResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public MemberResponseDto getMemberById(Long id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(id));
        return mapToResponseDto(member);
    }

    @Override
    public MemberResponseDto updateMember(Long id, MemberRequestDto requestDto) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(id));

        if (memberRepository.existsByEmailAndIdNot(requestDto.getEmail(), id)) {
            throw new DuplicateEmailException("Member with email '" + requestDto.getEmail() + "' already exists");
        }

        member.setName(requestDto.getName());
        member.setEmail(requestDto.getEmail());
        member.setPhone(requestDto.getPhone());
        member.setAddress(requestDto.getAddress());
        if (requestDto.getStatus() != null && !requestDto.getStatus().isBlank()) {
            member.setStatus(requestDto.getStatus());
        }

        Member updated = memberRepository.save(member);
        return mapToResponseDto(updated);
    }

    @Override
    public void deleteMember(Long id) {
        if (!memberRepository.existsById(id)) {
            throw new MemberNotFoundException(id);
        }
        memberRepository.deleteById(id);
    }

    private MemberResponseDto mapToResponseDto(Member member) {
        return new MemberResponseDto(
                member.getId(),
                member.getName(),
                member.getEmail(),
                member.getPhone(),
                member.getAddress(),
                member.getStatus(),
                member.getCreatedAt(),
                member.getUpdatedAt()
        );
    }
}
