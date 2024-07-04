package nh.recipify.backend;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {
private static final Logger log = LoggerFactory.getLogger( MyController.class );
    @GetMapping("/api/hello")
    String hello(@AuthenticationPrincipal Jwt auth) {
        log.info("/api/hello called! Jwt {}", auth);
        return "Hello!";
    }

    @GetMapping("/api/money")
    String money(@AuthenticationPrincipal Jwt auth) {
        log.info("/api/money called! Subject: '{}' expires: {}", auth.getSubject(), auth.getExpiresAt());
        return "Money! Money! Money! Must be funny!";
    }
}
