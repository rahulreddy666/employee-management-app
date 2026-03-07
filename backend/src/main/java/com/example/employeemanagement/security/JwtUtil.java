package com.example.employeemanagement.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    // MUST be 32+ characters for HS256
    private static final String SECRET =
            "my-super-secret-key-my-super-secret-key";

    private final SecretKey key =
            Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));

    private static final long EXPIRATION =
            1000 * 60 * 60 * 10; // 10 hours


    // ===============================
    // GENERATE TOKEN
    // ===============================
    public String generateToken(String email, String role) {

        return Jwts.builder()
                .setSubject(email)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(
                        new Date(System.currentTimeMillis() + EXPIRATION)
                )
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }


    // ===============================
    // EXTRACT ALL CLAIMS (Helper)
    // ===============================
    private Claims extractAllClaims(String token) {

        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    // ===============================
    // VALIDATE TOKEN
    // ===============================
    public boolean validateToken(String token) {

        try {
            extractAllClaims(token);
            return true;
        } catch (Exception e) {
            System.out.println("TOKEN INVALID: " + e.getMessage());
            return false;
        }
    }


    // ===============================
    // GET EMAIL
    // ===============================
    public String getEmail(String token) {
        return extractAllClaims(token).getSubject();
    }


    // ===============================
    // GET ROLE
    // ===============================
    public String getRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }
}