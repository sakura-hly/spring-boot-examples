package com.example;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.boot.autoconfigure.security.oauth2.resource.ResourceServerProperties;
import org.springframework.boot.autoconfigure.security.oauth2.resource.UserInfoTokenServices;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2ClientContext;
import org.springframework.security.oauth2.client.OAuth2RestTemplate;
import org.springframework.security.oauth2.client.filter.OAuth2ClientAuthenticationProcessingFilter;
import org.springframework.security.oauth2.client.filter.OAuth2ClientContextFilter;
import org.springframework.security.oauth2.client.token.grant.code.AuthorizationCodeResourceDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.LinkedHashMap;
import java.util.Map;

@SpringBootApplication
@RestController
@EnableOAuth2Sso
public class MyOAuthApp extends WebSecurityConfigurerAdapter {

    private final Logger logger = LoggerFactory.getLogger(MyOAuthApp.class);

    @Qualifier("oauth2ClientContext")
    @Autowired
    private OAuth2ClientContext oauth2ClientContext;

    @RequestMapping({ "/user", "/me" })
    public Map<String, String> user(Principal principal) {
        Map<String, String> map = new LinkedHashMap<>();
        map.put("name", principal.getName());
        return map;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.antMatcher("/**")
//                .authorizeRequests()
//                .and()
//                .formLogin()
//                .successHandler(successHandler)
//                .and()
//                .authorizeRequests()
//                .antMatchers("/", "/login**", "/auth/redirect", "/webjars/**", "/error**")
//                .permitAll().anyRequest()
//                .authenticated();
        http.antMatcher("/**").authorizeRequests().antMatchers("/", "/login**", "/webjars/**", "/error**").permitAll().anyRequest()
                .authenticated().and().exceptionHandling()
                .authenticationEntryPoint(new LoginUrlAuthenticationEntryPoint("/")).and().logout()
                .logoutSuccessUrl("/").permitAll().and().csrf()
                .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()).and()
                .addFilterBefore(ssoFilter(), BasicAuthenticationFilter.class);
    }


    @Bean
    public FilterRegistrationBean<OAuth2ClientContextFilter> oauth2ClientFilterRegistration(OAuth2ClientContextFilter filter) {
        FilterRegistrationBean<OAuth2ClientContextFilter> registration = new FilterRegistrationBean<OAuth2ClientContextFilter>();
        registration.setFilter(filter);
        registration.setOrder(-100);
        return registration;
    }

    private Filter ssoFilter() {
        OAuth2ClientAuthenticationProcessingFilter filter = new OAuth2ClientAuthenticationProcessingFilter("/login/github");

        OAuth2RestTemplate githubTemplate = new OAuth2RestTemplate(github(), oauth2ClientContext);
        filter.setRestTemplate(githubTemplate);

        UserInfoTokenServices tokenServices = new UserInfoTokenServices(githubResource().getUserInfoUri(),
                github().getClientId());
        tokenServices.setRestTemplate(githubTemplate);
        filter.setTokenServices(tokenServices);

        //THIS IS THE PLACE YOU CAN SET THE HANDLER
        filter.setAuthenticationSuccessHandler(successHandler());
        return filter;
    }

    @Bean
    public AuthenticationSuccessHandler successHandler() {
        return new AuthenticationSuccessHandler() {
            @Override
            public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                                Authentication authentication) throws IOException, ServletException {
                response.setContentType("application/json;charset=utf-8");

                String authUrl = request.getParameter("auth_url");
                logger.info("****************************" + authUrl + "*****************************");
                response.sendRedirect(authUrl);
            }
        };
    }
    public static void main(String[] args) {
        SpringApplication.run(MyOAuthApp.class, args);
    }

    @Bean
    @ConfigurationProperties("github.client")
    public AuthorizationCodeResourceDetails github() {
        return new AuthorizationCodeResourceDetails();
    }

    @Primary
    @Bean
    @ConfigurationProperties("github.resource")
    public ResourceServerProperties githubResource() {
        return new ResourceServerProperties();
    }
}
