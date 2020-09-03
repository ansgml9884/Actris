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

	@Bean
	CommandLineRunner initDatabase(RankingRepository repository) {
		return args -> {
			log.info("Preloading " + repository.save(Ranking.builder().name("김용수").score(100).note("aaa").replay_data("UUL").build()));
			log.info("Preloading " + repository.save(Ranking.builder().name("양희영").score(200).note("aaa").replay_data("LLL").build()));
			log.info("Preloading " + repository.save(Ranking.builder().name("오나영").score(300).note("aaa").replay_data("DDL").build()));
			log.info("Preloading " + repository.save(Ranking.builder().name("김문희").score(400).note("aaa").replay_data("EEL").build()));
		};
	}
	
}
