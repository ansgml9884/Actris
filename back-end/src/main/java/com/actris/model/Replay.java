package com.actris.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.SequenceGenerator;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter @Getter
@NoArgsConstructor
@SequenceGenerator(name = "REPLAY_SEQ_GENERATOR", sequenceName = "REPLAY_SEQ", initialValue = 1, allocationSize = 1)

public class Replay {
	
	   @Id
	   @GeneratedValue(strategy = GenerationType. SEQUENCE, generator = "REPLAY_SEQ_GENERATOR")
	   @Column(name="replay_id")
	   private Long id;
	   @Lob
	   private String record;
	   
	   @Builder
	   public Replay(String record) {
		   this.record = record;
	   }
}


