package kr.yulingo.repository;

import lombok.Data;
import lombok.NonNull;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.time.LocalDateTime;

import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
public class Record {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer recordId;

  @NonNull
  private Integer studentId;

  @NonNull
  private Integer sentenceId;
  
  @Column(insertable=false)
  private LocalDateTime learnedDatetime;
}
