package com.pulsefit.subscription.repository;

import com.pulsefit.subscription.entity.Subscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubscriptionRepository extends JpaRepository<Subscription, Long> {

    List<Subscription> findByMemberId(Long memberId);

    Optional<Subscription> findFirstByMemberIdAndStatusOrderByEndDateDesc(Long memberId, String status);
}
