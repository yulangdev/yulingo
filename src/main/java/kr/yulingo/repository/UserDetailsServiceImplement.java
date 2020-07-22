package kr.yulingo.repository;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Service
public class UserDetailsServiceImplement implements UserDetailsService {
  @Autowired private StudentRepository studentRepository;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Student student = studentRepository.findByUsername(username);
    System.out.println(student);
    return student;
  }
}
