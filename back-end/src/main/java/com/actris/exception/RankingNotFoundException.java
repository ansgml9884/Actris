package com.actris.exception;

public class RankingNotFoundException extends RuntimeException {
	public RankingNotFoundException(Long id) {
		super("Could not find ranking " + id);
	}
}
