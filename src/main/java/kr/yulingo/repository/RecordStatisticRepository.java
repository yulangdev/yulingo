package kr.yulingo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordStatisticRepository extends JpaRepository<RecordStatistic, Integer> {
  public List<RecordStatistic> findByStudentId(Integer studentId);
  public List<RecordStatistic> findByStudentIdOrderByLastDatetimeDesc(Integer studentId);
  public RecordStatistic findTopByStudentIdAndSavingRateLessThanOrderByLastDatetimeDesc(Integer studentId, Double savingReate);
  public Integer countByStudentId(Integer studentId);
  public Integer countByStudentIdAndSavingRateLessThan(Integer studentId, Double savingReate);
}