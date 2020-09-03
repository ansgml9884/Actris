package com.actris.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter @Getter
@NoArgsConstructor
public class Ranking {
   
   @Id @GeneratedValue
   private Long id;
   private String name;
   private int score;
   private String note;
   @Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
   private Timestamp played_date;
   private Long replay_id;
   
   @Builder
   public Ranking(int score, String name, String note, Long replay_id) {
      this.name = name;
      this.score = score;
      this.note = note;
      this.replay_id = replay_id;
   }
   
}