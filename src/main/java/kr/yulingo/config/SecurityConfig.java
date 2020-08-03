package kr.yulingo.config;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
  @Autowired DataSource dataSource;

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests().antMatchers("/login", "/registration", "/*.js", "/*.map", "/*.ico").permitAll();
    http.authorizeRequests().anyRequest().authenticated();
    http.formLogin().loginPage("/login").defaultSuccessUrl("/");
    http.csrf().disable();
  }

  @Override //사용자의 권한정보, 계정정보를 설정
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.jdbcAuthentication()
        .dataSource(dataSource)
        .usersByUsernameQuery("select username, password, 1 as enabled from Student where username=?")  // 계정 활성화 여부
        .authoritiesByUsernameQuery("SELECT username, 1 as roleId FROM Student where username=?")       // 사용자 권한
        .passwordEncoder(new BCryptPasswordEncoder());
     
  }
}
