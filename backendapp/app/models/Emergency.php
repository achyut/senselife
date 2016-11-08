<?php

class Emergency extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'name' => 'required',
		'phone' => 'required',
		'address' => 'required',
		'relationship' => 'required'
	);
}
