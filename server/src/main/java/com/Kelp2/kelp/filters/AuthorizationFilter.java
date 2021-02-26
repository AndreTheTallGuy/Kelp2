package com.Kelp2.kelp.filters;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@WebFilter(urlPatterns = "/**")
public class AuthorizationFilter implements Filter {
    private static final Logger logger = LoggerFactory.getLogger(AuthorizationFilter.class);
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) servletRequest;
        HttpServletResponse res = (HttpServletResponse) servletResponse;
        List<String> response = Arrays.asList(req.getServletPath().replace("/", ":").split(":"));
        if (req.getMethod().equals("POST") || req.getMethod().equals("PUT")) {
            try {
                logger.info("checking token");
                FirebaseAuth.getInstance().verifyIdToken(response.get(response.size() - 1));
            } catch (FirebaseAuthException e) {
                logger.debug(e.toString());
                res.setStatus(400);
            }
        }
    }
}

