<?php
use Cache;
class HeartratesController extends BaseController {

	/**
	 * Heartrate Repository
	 *
	 * @var Heartrate
	 */
	protected $heartrate;
	public function __construct(Heartrate $heartrate)
	{
		$this->heartrate = $heartrate;
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$heartrates = $this->heartrate->all();

		return View::make('heartrates.index', compact('heartrates'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		return View::make('heartrates.create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$input = Input::all();
		$validation = Validator::make($input, Heartrate::$rules);

		if ($validation->passes())
		{
			$this->heartrate->create($input);

			return Redirect::route('heartrates.index');
		}

		return Redirect::route('heartrates.create')
			->withInput()
			->withErrors($validation)
			->with('message', 'There were validation errors.');
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$heartrate = $this->heartrate->findOrFail($id);

		return View::make('heartrates.show', compact('heartrate'));
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$heartrate = $this->heartrate->find($id);

		if (is_null($heartrate))
		{
			return Redirect::route('heartrates.index');
		}

		return View::make('heartrates.edit', compact('heartrate'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$input = array_except(Input::all(), '_method');
		$validation = Validator::make($input, Heartrate::$rules);

		if ($validation->passes())
		{
			$heartrate = $this->heartrate->find($id);
			$heartrate->update($input);

			return Redirect::route('heartrates.show', $id);
		}

		return Redirect::route('heartrates.edit', $id)
			->withInput()
			->withErrors($validation)
			->with('message', 'There were validation errors.');
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		$this->heartrate->find($id)->delete();

		return Redirect::route('heartrates.index');
	}
	

	public function emailGraph($id)
	{
		$url = App::make('url')->to('/');
		$url .= "/api/graph/".$id;
		$input['url'] = $url;
		$input['user'] = "Achyut";

		Mail::send('emails.invitegraph', $input, function($message) {
		    $message->to('achyut@mailinator.com', 'SenseLife')->subject('Invitation for Health Graph');
		});
		
		return $this->sendSuccessResponse($input,Lang::get('messages.success'),"dashboard");
	}

	public function viewGraph($id)
	{
		return View::make('pages.graph');
	}
}
