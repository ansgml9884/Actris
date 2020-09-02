package com.actris.repository;

import java.util.Date;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.actris.model.Ranking;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class LoadDatabase {
	//private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

	
	private Long id;
	private int score;
	private String note;
	private Date played_date;
	private Long replay_id;
	@Bean
	CommandLineRunner initDatabase(RankingRepository repository) {
		return args -> {
			log.info("Preloading " + repository.save(Ranking.builder().name("김용수").score(100).note("aaa").replay_id(1L).build()));
			log.info("Preloading " + repository.save(Ranking.builder().name("양희영").score(200).note("aaa").replay_id(2L).build()));
			log.info("Preloading " + repository.save(Ranking.builder().name("오나영").score(300).note("aaa").replay_id(3L).build()));
			log.info("Preloading " + repository.save(Ranking.builder().name("김문희").score(400).note("aaa").replay_id(4L).build()));
		};
	}
	
}
