package com.actris.controller;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.actris.exception.RankingNotFoundException;
import com.actris.model.Ranking;
import com.actris.repository.RankingRepository;

@RestController
public class RankingController {
   private final RankingRepository repository;

   RankingController(RankingRepository repository) {
      this.repository = repository;
   }

   @GetMapping("/rankings/{pageNo}")
   public List<Ranking> pageAll(@PathVariable int pageNo) {
      Pageable page = PageRequest.of(pageNo, 5);
      return repository.findAllByOrderByScoreDesc(page);
   }

   @PostMapping("/rankings")
   Ranking newEmployee(@RequestBody Ranking newRanking) {
      newRanking.setPlayed_date(new Timestamp(System.currentTimeMillis()));
      return repository.save(newRanking);
   }

   @GetMapping("/rankings/replay/{id}")
   Ranking one(@PathVariable Long id) {
      return repository.findById(id).orElseThrow(() -> new RankingNotFoundException(id));
   }

}