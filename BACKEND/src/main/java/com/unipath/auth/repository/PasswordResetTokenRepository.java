package com.unipath.auth.repository;

import com.unipath.auth.entity.PasswordResetToken;
import com.unipath.user.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetToken, String> {

    Optional<PasswordResetToken> findByTokenHash(String tokenHash);

    List<PasswordResetToken> findAllByUserAndUsedFalse(User user);
}
