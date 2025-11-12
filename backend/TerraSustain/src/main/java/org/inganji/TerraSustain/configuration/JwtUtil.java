package org.inganji.TerraSustain.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class JwtUtil {
    @Value("${app.secret_pattern}")
    private String secret;
    //setting up the expiration time in millis that we have set in the applications.properties file
    @Value("${app.expiration}")
    private Long expires;
    //method to get the sigin key
    public SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes()); //using the HS256 algorithm
    }
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList()));
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expires))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    //method for username extraction from provided token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    //using the signing key to extract token
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token).getBody();
    }
    //token validation
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return(username.equals(userDetails.getUsername())) && ! isTokenExpired(token);
    }
    //token expiration check
    public boolean isTokenExpired(String token) {
        return expirationExtraction(token).before(new Date());
    }

    //extracting only the expiration time claim only
    public Date expirationExtraction(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}