package kr.yulingo.controller;

import kr.yulingo.repository.Record;
import kr.yulingo.repository.RecordRepository;
import kr.yulingo.repository.RecordDetail;
import kr.yulingo.repository.RecordDetailRepository;
import kr.yulingo.repository.Sentence;
import kr.yulingo.repository.SentenceRepository;
import kr.yulingo.repository.Statistic;
import kr.yulingo.repository.Student;
import kr.yulingo.repository.StudentRepository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

@Transactional
@RestController
@RequestMapping("/api")
public class APIController {
  @Autowired private RecordRepository recordRepository;
  @Autowired private StudentRepository studentRepository;
  @Autowired private SentenceRepository sentenceRepository;
  @Autowired private RecordDetailRepository recordDetailRepository;

  private Student getCurrentStudent() {
    Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UserDetails userDetails = (UserDetails)principal;   
    String username = userDetails.getUsername();
    return studentRepository.findByUsername(username);
  }

  @GetMapping("/statistic")
  public Statistic selectStatistic() {
    Student student = getCurrentStudent();
    Integer studentId = student.getStudentId();
    List<RecordDetail> recordDetailList = recordDetailRepository.findByStudentId(studentId);
    List<Integer> sentenceIdList = new ArrayList<>();
    sentenceIdList.add(0);
    for (RecordDetail recordDetail: recordDetailList)
      sentenceIdList.add(recordDetail.getSentenceId());
    return new Statistic(
      student.getUsername(),
      sentenceRepository.countBySentenceIdNotIn(sentenceIdList),
      recordDetailRepository.countByStudentIdAndSavingRateLessThan(studentId, 60.0),
      recordDetailRepository.countByStudentId(studentId)
    );
  }

  @GetMapping("/learn")
  public Sentence selectLearningSentence() {
    Integer studentId = getCurrentStudent().getStudentId();
    List<RecordDetail> recordDetailList = recordDetailRepository.findByStudentId(studentId);
    List<Integer> sentenceIdList = new ArrayList<>();
    sentenceIdList.add(0);
    for (RecordDetail recordDetail: recordDetailList)
      sentenceIdList.add(recordDetail.getSentenceId());
    return sentenceRepository.findTopBySentenceIdNotIn(sentenceIdList);
  }

  @GetMapping("/review")
  public RecordDetail selectReviewingSentence() {
    Integer studentId = getCurrentStudent().getStudentId();
    return recordDetailRepository.findTopByStudentIdAndSavingRateLessThanOrderBySavingRateAsc(studentId, 60.0);
  }

  @GetMapping("/record/list")
  public List<RecordDetail> selectRecord() {
    Integer studentId = getCurrentStudent().getStudentId();
    return recordDetailRepository.findByStudentIdOrderBySavingRateAsc(studentId);
  }

  @GetMapping("/record/{sentenceId}")
  public Record insertRecord(@PathVariable int sentenceId) {
    Integer studentId = getCurrentStudent().getStudentId();
    return recordRepository.saveAndFlush(new Record(studentId, sentenceId));
  }
}
