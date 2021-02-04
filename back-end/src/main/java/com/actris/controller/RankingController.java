package com.actris.controller;

import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.actris.exception.ReplayNotFoundException;
import com.actris.model.Ranking;
import com.actris.model.Replay;
import com.actris.repository.RankingRepository;
import com.actris.repository.ReplayRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class RankingController {
   private final RankingRepository rankingRepository;
   
   private final ReplayRepository replayRepository;

   RankingController(RankingRepository rankingRepository, ReplayRepository replayRepository) {
      this.rankingRepository = rankingRepository;
      this.replayRepository = replayRepository;
   }

   @GetMapping("/rankings/{pageNo}")
   public List<Ranking> pageAll(@PathVariable int pageNo) {
      Pageable page = PageRequest.of(pageNo, 5);
      return rankingRepository.findAllByOrderByScoreDesc(page);
   }

   @PostMapping("/rankings")
   public Ranking newRanking(@RequestBody Map<String, Object> param) throws JsonMappingException, JsonProcessingException {
	   //replay save
	   Replay newReplay = replayRepository.save(Replay.builder().record((String)param.get("record")).build());
	   //System.out.println((String)param.get("record"));
	   
	   //ranking save
	   ObjectMapper mapper = new ObjectMapper();
	   Ranking newRanking = mapper.readValue((String)(param.get("ranking")), Ranking.class);
	   newRanking.setPlayed_date(new Timestamp(System.currentTimeMillis()));
	   newRanking.setReplay_id(newReplay.getId());
	   return rankingRepository.save(newRanking);
   }

   @GetMapping("/replay/{id}")
   Replay replayOne(@PathVariable Long id) {
      return replayRepository.findById(id).orElseThrow(() -> new ReplayNotFoundException(id));
   }
   
   @RequestMapping("/enter")
   public ModelAndView enter(@RequestParam("score") String score, @RequestParam("record") String record) {
      return new ModelAndView("enter");
   }
}