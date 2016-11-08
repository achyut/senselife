<?php

class Heartrate extends Eloquent {
	protected $guarded = array();

	public static $rules = array(
		'user' => 'required',
		'timestamp' => 'required',
		'value' => 'required'
	);
}
