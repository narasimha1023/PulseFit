package com.pulsefit.member.service;

import com.pulsefit.member.dto.MemberRequestDto;
import com.pulsefit.member.dto.MemberResponseDto;
import com.pulsefit.member.entity.Member;
import com.pulsefit.member.exception.DuplicateEmailException;
import com.pulsefit.member.exception.MemberNotFoundException;
import com.pulsefit.member.repository.MemberRepository;
import com.pulsefit.member.service.impl.MemberServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberServiceImpl memberService;

    private Member sampleMember;
    private MemberRequestDto requestDto;

    @BeforeEach
    void setUp() {
        sampleMember = new Member(1L, "Narasimha Reddy", "narasimha@example.com", "9876543210", "Hyderabad, Club Downtown", "ACTIVE");
        sampleMember.setCreatedAt(LocalDateTime.now());
        sampleMember.setUpdatedAt(LocalDateTime.now());

        requestDto = new MemberRequestDto("Narasimha Reddy", "narasimha@example.com", "9876543210", "Hyderabad, Club Downtown", "ACTIVE");
    }

    @Test
    @DisplayName("Should create member successfully when email is unique")
    void createMember_Success() {
        when(memberRepository.existsByEmail("narasimha@example.com")).thenReturn(false);
        when(memberRepository.save(any(Member.class))).thenReturn(sampleMember);

        MemberResponseDto response = memberService.createMember(requestDto);

        assertNotNull(response);
        assertEquals(1L, response.getId());
        assertEquals("Narasimha Reddy", response.getName());
        assertEquals("narasimha@example.com", response.getEmail());
        verify(memberRepository, times(1)).save(any(Member.class));
    }

    @Test
    @DisplayName("Should throw DuplicateEmailException when email already registered")
    void createMember_DuplicateEmail_ThrowsException() {
        when(memberRepository.existsByEmail("narasimha@example.com")).thenReturn(true);

        assertThrows(DuplicateEmailException.class, () -> memberService.createMember(requestDto));
        verify(memberRepository, never()).save(any(Member.class));
    }

    @Test
    @DisplayName("Should find member by id successfully")
    void getMemberById_Success() {
        when(memberRepository.findById(1L)).thenReturn(Optional.of(sampleMember));

        MemberResponseDto response = memberService.getMemberById(1L);

        assertNotNull(response);
        assertEquals("Narasimha Reddy", response.getName());
        assertEquals("ACTIVE", response.getStatus());
    }

    @Test
    @DisplayName("Should throw MemberNotFoundException when member id does not exist")
    void getMemberById_NotFound_ThrowsException() {
        when(memberRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(MemberNotFoundException.class, () -> memberService.getMemberById(99L));
    }

    @Test
    @DisplayName("Should update member successfully")
    void updateMember_Success() {
        when(memberRepository.findById(1L)).thenReturn(Optional.of(sampleMember));
        when(memberRepository.existsByEmailAndIdNot("narasimha@example.com", 1L)).thenReturn(false);
        when(memberRepository.save(any(Member.class))).thenReturn(sampleMember);

        MemberResponseDto response = memberService.updateMember(1L, requestDto);

        assertNotNull(response);
        assertEquals("Narasimha Reddy", response.getName());
        verify(memberRepository, times(1)).save(sampleMember);
    }

    @Test
    @DisplayName("Should delete member successfully")
    void deleteMember_Success() {
        when(memberRepository.existsById(1L)).thenReturn(true);
        doNothing().when(memberRepository).deleteById(1L);

        assertDoesNotThrow(() -> memberService.deleteMember(1L));
        verify(memberRepository, times(1)).deleteById(1L);
    }

    @Test
    @DisplayName("Should throw MemberNotFoundException when deleting non-existent member")
    void deleteMember_NotFound_ThrowsException() {
        when(memberRepository.existsById(99L)).thenReturn(false);

        assertThrows(MemberNotFoundException.class, () -> memberService.deleteMember(99L));
        verify(memberRepository, never()).deleteById(99L);
    }

    @Test
    @DisplayName("Should return all members list")
    void getAllMembers_Success() {
        when(memberRepository.findAll()).thenReturn(List.of(sampleMember));

        List<MemberResponseDto> members = memberService.getAllMembers();

        assertEquals(1, members.size());
        assertEquals("Narasimha Reddy", members.get(0).getName());
    }
}
