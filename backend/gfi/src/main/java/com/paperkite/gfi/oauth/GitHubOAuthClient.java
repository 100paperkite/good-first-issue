package com.paperkite.gfi.oauth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.client.RestTemplate;

@Component
public class GitHubOAuthClient {
    private static final String ACCESS_TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";
    private final String clientId;
    private final String clientSecret;

    public GitHubOAuthClient(
        @Value("${spring.security.oauth2.client.registration.github.clientId}") String clientId,
        @Value("${spring.security.oauth2.client.registration.github.clientSecret}") String clientSecret
    ){
        this.clientId = clientId;
        this.clientSecret = clientSecret;
    }

    public GitHubOAuthTokenResponse requestAccessToken(String code){
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_VALUE);

        LinkedMultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("client_id", this.clientId);
        params.add("client_secret", this.clientSecret);
        params.add("code", code);

        var request = new HttpEntity<>(params, httpHeaders);
        return restTemplate.postForObject(ACCESS_TOKEN_ENDPOINT, request, GitHubOAuthTokenResponse.class);
    }
}
