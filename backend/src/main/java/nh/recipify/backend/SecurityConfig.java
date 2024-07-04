package nh.recipify.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.web.util.matcher.AntPathRequestMatcher.antMatcher;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(jsr250Enabled = true)
class SecurityConfig {

    @Bean
    public SecurityFilterChain resourceServerFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement(c -> c.sessionCreationPolicy(SessionCreationPolicy.NEVER))
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers(antMatcher(HttpMethod.GET, "/api/hello")).permitAll();
                auth.anyRequest().authenticated();
            })
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
        ;
        http.csrf(Customizer.withDefaults());
        return http.build();
    }

    @Bean
    JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.
            withIssuerLocation("http://localhost:21081/realms/hello-auth-realm")
            .build();
    }

//    @Bean
//    public SecurityEvaluationContextExtension securityEvaluationContextExtension() {
//        return new SecurityEvaluationContextExtension();
//    }
}