package kr.yulingo.repository;

import java.time.LocalDateTime;

import javax.persistence.Id;
import javax.persistence.Entity;

import lombok.Data;

@Data
@Entity
public class RecordDetail {
  @Id
  private Integer recordId;
  private Integer studentId;
  private Integer sentenceId;
  private Integer repeatTimes;
  private LocalDateTime firstDatetime;
  private LocalDateTime lastDatetime;
  private Integer pastMinutes;
  private Integer pastHours;
  private Integer pastDays;
  private Integer pastMonths;
  private Double savingRate;
  private String koreanSentence;
  private String englishSentence;
}
