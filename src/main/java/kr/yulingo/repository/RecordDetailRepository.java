package kr.yulingo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordDetailRepository extends JpaRepository<RecordDetail, Integer> {
  public List<RecordDetail> findByStudentId(Integer studentId);
  public List<RecordDetail> findByStudentIdOrderBySavingRateAsc(Integer studentId);
  public RecordDetail findTopByStudentIdAndSavingRateLessThanOrderBySavingRateAsc(Integer studentId, Double savingReate);
  public Integer countByStudentId(Integer studentId);
  public Integer countByStudentIdAndSavingRateLessThan(Integer studentId, Double savingReate);
}
