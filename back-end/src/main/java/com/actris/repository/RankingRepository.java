package com.actris.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.actris.model.Ranking;

public interface RankingRepository extends JpaRepository<Ranking, Long>{
   public List<Ranking> findAllByOrderByScoreDesc();
   
   public List<Ranking> findAllByOrderByScoreDesc(Pageable pageable);
}
 