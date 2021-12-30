package com.sapo.storemanagement.security;

import com.sapo.storemanagement.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
            .csrf().disable()
            .authorizeRequests()
            .antMatchers("/login", "/register").permitAll()
            .antMatchers("/products/**", "/variants/**", "/orders/**").hasAnyAuthority("ADMIN", "STORAGE_KEEPER")
            .antMatchers("/suppliers/**", "/import-receipts/**").hasAnyAuthority("ADMIN", "STORAGE_KEEPER")
            .antMatchers("/payment-invoices/**").hasAnyAuthority("ADMIN", "ACCOUNTANT")
            .anyRequest().authenticated()
            .and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

//    private void storageKeeperConfig(HttpSecurity http) throws Exception {
//        http.authorizeRequests().antMatchers("/products/**", "/variants/**", "/orders/**").hasAnyAuthority("ADMIN", "STORAGE_KEEPER");
//        http.authorizeRequests().antMatchers("/suppliers/**", "/import-receipts/**").hasAnyAuthority("ADMIN", "STORAGE_KEEPER");
//    }
//
//    private void accountantConfig(HttpSecurity http) throws Exception {
//        http.authorizeRequests().antMatchers("/payment-invoices/**").hasAnyAuthority("ADMIN", "ACCOUNTANT");
//    }
}
