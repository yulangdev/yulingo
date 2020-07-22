package kr.yulingo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests().antMatchers("/login", "/registration", "/*.js").permitAll();
    http.authorizeRequests().anyRequest().authenticated();
    http.formLogin().loginPage("/login").defaultSuccessUrl("/");
    http.csrf().disable();
  }
}
