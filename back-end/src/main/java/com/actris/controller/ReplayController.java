package com.actris.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.actris.exception.ReplayNotFoundException;
import com.actris.model.Replay;
import com.actris.repository.ReplayRepository;

@RestController
public class ReplayController {
   private final ReplayRepository repository;

   ReplayController(ReplayRepository repository) {
      this.repository = repository;
   }

   @PostMapping("/replay")
   Replay newEmployee(@RequestBody Replay newReplay) {
	  System.out.println(newReplay.getRecord());
      return repository.save(newReplay);
   }

   @GetMapping("/replay/{id}")
   Replay one(@PathVariable Long id) {
      return repository.findById(id).orElseThrow(() -> new ReplayNotFoundException(id));
   }

}