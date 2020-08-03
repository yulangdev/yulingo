package kr.yulingo.repository;

import java.time.LocalDateTime;

import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Column;
import javax.persistence.Entity;

import lombok.Data;

@Data
@Entity
public class RecordStatistic {
  @Id
  private Integer recordId;
  private Integer studentId;
  @Column(insertable = false, updatable = false)
  private Integer sentenceId;
  @ManyToOne
  @JoinColumn(name="sentenceId")
  private Sentence sentence;
  private Integer repeatTimes;
  private LocalDateTime firstDatetime;
  private LocalDateTime lastDatetime;
  private Integer pastMinutes;
  private Integer pastHours;
  private Integer pastDays;
  private Integer pastMonths;
  private Double savingRate;
}
