package com.actris.model;

import java.sql.Timestamp;

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
public class Replay {
	
	   @Id @GeneratedValue
	   private Long id;
	   @Lob
	   private String record;
	   
	   @Builder
	   public Replay(Long id, String record) {
		   this.id = id;
		   this.record = record;
	   }
}


