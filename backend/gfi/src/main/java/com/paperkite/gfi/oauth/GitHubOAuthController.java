package com.paperkite.gfi.oauth;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class GitHubOAuthController {
    private final OAuthService oAuthService;

    @GetMapping("/authenticate")
    public ResponseEntity<AccessToken> authenticate(@RequestParam String code){
        AccessToken token = oAuthService.getAccessToken(code);
        return ResponseEntity.ok().body(token);
    }
}
