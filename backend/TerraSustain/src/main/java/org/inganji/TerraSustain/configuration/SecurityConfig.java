package org.inganji.TerraSustain.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http.
                authorizeHttpRequests(auth->auth
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/NGO").hasRole("NGO")
                        .requestMatchers("/gov").hasRole("GOVERNMENT_PERSONAL")
                        .requestMatchers("/user").hasRole("CITIZEN"))
                .sessionManagement(session-> session.sessionCreationPolicy
                        (SessionCreationPolicy.STATELESS))
                .logout(logout->logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/home"))
                .build();
    }
}
