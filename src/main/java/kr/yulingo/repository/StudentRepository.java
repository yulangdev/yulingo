package kr.yulingo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
  public Student findByUsername(String username);
}