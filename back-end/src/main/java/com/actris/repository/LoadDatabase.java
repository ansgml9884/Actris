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
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김용수").score(500).note("내가 바로 빛용수").replay_id(1L).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김동주").score(400).note("플레이데이터 귀요미").replay_id(2L).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("양희영").score(300).note("서른에꿈이생겼다..액트리스정복!").replay_id(3L).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("오나영").score(200).note("텐텐 ㄱㄱ").replay_id(4L).build()));
			log.info("Preloading " + rankingRepository.save(Ranking.builder().name("김문희").score(100).note("나문희").replay_id(4L).build()));
			
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 2304 0 171 0 2 192 0 2 193 0 2 194 0 2 195 0 2 196 0 2 197 0 2 198 0 2 199 0 2").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 565 0 70 0 2 91 0 2 92 0 2 93 0 2 94 0 2 95 0 2 96 0 2 97 0 2 98 0 2 99 0 2 10").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 3402 0 106 0 2 142 0 2 169 0 2 237 4 80 424 0 1 506 0 1 574 0 1 595 0 1 596 0").build()));
			log.info("Preloading " + replayRepository.save(Replay.builder().record("0 2672 0 45 0 4 66 0 4 112 0 4 165 0 8 224 0 4 279 0 4 302 0 4 421 0 32 576 1 80").build()));
		};
	}
	
}
