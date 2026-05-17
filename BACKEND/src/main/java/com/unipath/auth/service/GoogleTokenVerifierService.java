package com.unipath.auth.service;

import com.unipath.auth.dto.GoogleTokenPayload;

public interface GoogleTokenVerifierService {

    GoogleTokenPayload verify(String idToken);
}
