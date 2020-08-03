package kr.yulingo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import kr.yulingo.repository.Student;
import kr.yulingo.repository.StudentRepository;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Controller
public class PageController implements ErrorController {
	@Autowired StudentRepository studentRepository;

	@GetMapping("/")
	public String index() {
		return "app";
	}

	@GetMapping("/error")
	public String handleError(HttpServletResponse response) {
		response.setStatus(200);
		return "app";
	}

	@Override
	public String getErrorPath() {
		return "/error";
  }

  @PostMapping("/registration")
  public String insertStudent(Student student) {
		if (studentRepository.findByUsername(student.getUsername()) != null)
			return "redirect:/registration?duplicated";
		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		student.setPassword(encoder.encode(student.getPassword()));
		studentRepository.saveAndFlush(student);
		return "redirect:/login?registration";
  }
}
