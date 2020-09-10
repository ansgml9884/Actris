package com.actris.repository;

import java.sql.Timestamp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.actris.exception.RankingNotFoundException;
import com.actris.model.Ranking;
import com.actris.model.Replay;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class LoadDatabase {

	@Bean
	CommandLineRunner initDatabase(RankingRepository rankingRepository, ReplayRepository replayRepository) {
		return args -> {
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김용수").score(5000).note("내가 바로 빛용수!").replay_id(1L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김동주").score(4000).note("☞플레이데이터 귀요미☜").replay_id(2L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("양희영").score(3000).note("서른에꿈이생겼다..액트리스정복★").replay_id(3L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("오나영").score(2000).note("텐텐 ㄱㄱ??").replay_id(4L).played_date(new Timestamp(System.currentTimeMillis())).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김문희").score(1000).note("호박고구마아").replay_id(5L).played_date(new Timestamp(System.currentTimeMillis())).build()));

			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 2304 0 171 0 2 192 0 2 193 0 2 194 0 2 195 0 2 196 0 2 197 0 2 198 0 2 199 0 2").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 565 0 70 0 2 91 0 2 92 0 2 93 0 2 94 0 2 95 0 2 96 0 2 97 0 2 98 0 2 99 0 2 10").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 3402 0 106 0 2 142 0 2 169 0 2 237 4 80 424 0 1 506 0 1 574 0 1 595 0 1 596 0").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 2672 0 45 0 4 66 0 4 112 0 4 165 0 8 224 0 4 279 0 4 302 0 4 421 0 32 576 1 80").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 240 0 0 0 2 21 3 17 42 0 1 43 0 1 44 0 1 45 0 1 46 0 1 47 0 1 48 0 1 51 0 1 56").build()));
		};
	}
	
}
