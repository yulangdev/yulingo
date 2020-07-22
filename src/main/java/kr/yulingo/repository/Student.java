package kr.yulingo.repository;

import lombok.Data;

import java.util.Collection;

import javax.persistence.Id;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.SpringSecurityCoreVersion;

@Data
@Entity
public class Student implements UserDetails {
	private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer studentId;
	private String username;
  private String password;
  
	@Override
	public boolean isAccountNonLocked() {
		return true;
  }
  
  @Override
	public boolean isEnabled() {
		return true;
  }
  
  @Override
	public boolean isCredentialsNonExpired() {
		return true;
  }
  
  @Override
	public Collection<GrantedAuthority> getAuthorities() {
		return null;
  }
  
  @Override
	public boolean isAccountNonExpired() {
		return true;
	}
}
