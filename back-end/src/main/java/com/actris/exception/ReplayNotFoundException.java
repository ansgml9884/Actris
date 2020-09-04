package com.actris.exception;

public class ReplayNotFoundException extends RuntimeException {
	public ReplayNotFoundException(Long id) {
		super("Could not find replay " + id);
	}
}
