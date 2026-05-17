package com.unipath.auth.service.impl;

import com.unipath.auth.dto.GoogleTokenPayload;
import com.unipath.auth.service.GoogleTokenVerifierService;
import com.unipath.common.exception.BusinessException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class GoogleTokenVerifierServiceImpl implements GoogleTokenVerifierService {

    private final RestClient restClient;
    private final String googleClientId;

    public GoogleTokenVerifierServiceImpl(
            RestClient.Builder restClientBuilder,
            @Value("${app.oauth.google-client-id}") String googleClientId
    ) {
        this.restClient = restClientBuilder.baseUrl("https://oauth2.googleapis.com").build();
        this.googleClientId = googleClientId;
    }

    @Override
    public GoogleTokenPayload verify(String idToken) {
        if (googleClientId == null || googleClientId.isBlank()) {
            throw new BusinessException("Google login is not configured.", HttpStatus.SERVICE_UNAVAILABLE);
        }

        GoogleTokenInfo tokenInfo = restClient.get()
                .uri(uriBuilder -> uriBuilder.path("/tokeninfo").queryParam("id_token", idToken).build())
                .retrieve()
                .body(GoogleTokenInfo.class);

        if (tokenInfo == null || tokenInfo.sub() == null || tokenInfo.email() == null) {
            throw new BusinessException("Google token is invalid.", HttpStatus.UNAUTHORIZED);
        }

        if (!googleClientId.equals(tokenInfo.aud())) {
            throw new BusinessException("Google token audience is invalid.", HttpStatus.UNAUTHORIZED);
        }

        if (!Boolean.parseBoolean(tokenInfo.email_verified())) {
            throw new BusinessException("Google email is not verified.", HttpStatus.UNAUTHORIZED);
        }

        return new GoogleTokenPayload(tokenInfo.sub(), tokenInfo.email(), tokenInfo.name(), true);
    }

    private record GoogleTokenInfo(
            String sub,
            String email,
            String name,
            String aud,
            String email_verified
    ) {
    }
}
