package kr.yulingo.repository;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class Statistic {
  private String username;
  private int learn;
  private int review;
  private int record;
}