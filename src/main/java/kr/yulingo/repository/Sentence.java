package kr.yulingo.repository;

import javax.persistence.Id;
import javax.persistence.Entity;

import lombok.Data;

@Data
@Entity
public class Sentence {
  @Id
  private Integer sentenceId;
  private String englishSentence;
  private String koreanSentence;
}
