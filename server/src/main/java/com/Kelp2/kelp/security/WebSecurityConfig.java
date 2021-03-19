package com.Kelp2.kelp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    private final CorsConfigurationProperties corsConfigurationProperties;

    /**
     * setter for corsConfigurationProperties
     * @param corsConfigurationProperties - the new CorsConfigurationProperties to be set
     */

    public WebSecurityConfig(CorsConfigurationProperties corsConfigurationProperties) {
        this.corsConfigurationProperties = corsConfigurationProperties;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception{
        http.csrf().disable().cors().configurationSource(corsConfigurationSource())
                .and()
                .authorizeRequests()
                .antMatchers("/*")
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();


    }


    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(corsConfigurationProperties.getAllowedOrigins());
        configuration.setAllowedMethods(corsConfigurationProperties.getAllowedMethods());
        configuration.setAllowedHeaders(corsConfigurationProperties.getAllowedHeaders());
        configuration.setExposedHeaders(corsConfigurationProperties.getExposedHeaders());
        configuration.setAllowCredentials(corsConfigurationProperties.isAllowCredentials());
        UrlBasedCorsConfigurationSource configurationSource = new UrlBasedCorsConfigurationSource();
        configurationSource.registerCorsConfiguration("/**", configuration);
        return configurationSource;
    }
}
