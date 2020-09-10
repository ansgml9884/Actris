package com.actris.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter @Getter
@NoArgsConstructor
@SequenceGenerator(name = "RANKING_SEQ_GENERATOR", sequenceName = "RANKING_SEQ", initialValue = 1, allocationSize = 1)

public class Ranking {
   
   @Id 
   @GeneratedValue(strategy = GenerationType. SEQUENCE, generator = "RANKING_SEQ_GENERATOR")
   private Long id;
   private String name;
   private int score;
   private String note;
   @Column(columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
   private Timestamp played_date;
   private Long replay_id;
   
   @Builder
   public Ranking(String name, int score, String note, Long replay_id) {
      this.name = name;
      this.score = score;
      this.note = note;
      this.replay_id = replay_id;
   }
   
}