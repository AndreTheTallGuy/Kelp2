package com.Kelp2.kelp.filters;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class AuthorizationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(AuthorizationFilter.class);
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getMethod().equals("POST") || request.getMethod().equals("PUT")) {
            try {
                // Verify the ID token while checking if the token is revoked by passing checkRevoked
                // as true.
                logger.info("checking token");
                FirebaseAuth.getInstance().verifyIdToken(request.getHeader("Authorization"));
            } catch (FirebaseAuthException e) {
                logger.info(e.toString());
                response.setStatus(401);
            }
        }
        filterChain.doFilter(request, response);
    }
}

