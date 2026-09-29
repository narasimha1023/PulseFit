package com.pulsefit.member.service;

import com.pulsefit.member.dto.MemberRequestDto;
import com.pulsefit.member.dto.MemberResponseDto;

import java.util.List;

public interface MemberService {

    MemberResponseDto createMember(MemberRequestDto requestDto);

    List<MemberResponseDto> getAllMembers();

    MemberResponseDto getMemberById(Long id);

    MemberResponseDto updateMember(Long id, MemberRequestDto requestDto);

    void deleteMember(Long id);
}
