package com.paperkite.gfi.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class OAuthService {
    private final GitHubOAuthClient gitHubOAuthClient;

    public AccessToken getAccessToken(String code){
        var githubOAuthToken = gitHubOAuthClient.requestAccessToken(code);
        return new AccessToken(githubOAuthToken.getAccessToken());
    }

}
