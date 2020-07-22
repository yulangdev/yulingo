package kr.yulingo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SentenceRepository extends JpaRepository<Sentence, Integer> {
  public Sentence findTopBySentenceIdNotIn(List<Integer> sentenceIdList);
  public Integer countBySentenceIdNotIn(List<Integer> sentenceIdList);
}