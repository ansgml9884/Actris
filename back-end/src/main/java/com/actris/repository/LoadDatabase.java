package com.actris.repository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.actris.model.Ranking;
import com.actris.model.Replay;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class LoadDatabase {

	@Bean
	CommandLineRunner initDatabase(RankingRepository rankingRepository, ReplayRepository replayRepository) {
		return args -> {
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김용수").score(100).note("aaa").replay_id(1L).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("양희영").score(200).note("aaa").replay_id(2L).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("오나영").score(300).note("aaa").replay_id(3L).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김문희").score(400).note("aaa").replay_id(4L).build()));
			
			log.info("Preloading " + replayRepository.save(Replay.builder().record("UUU").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("FFF").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("CCC").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("AAA").build()));

		
		};
	}
	
}
