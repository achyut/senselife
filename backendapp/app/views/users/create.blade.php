@extends('index')

@section('title', 'Users page')

@section('page-css')
<!-- ================== BEGIN PAGE LEVEL STYLE ================== -->
<link href="{{{ asset('assets/plugins/DataTables/media/css/dataTables.bootstrap.min.css') }}}" rel="stylesheet" />
<link href="{{{ asset('assets/plugins/DataTables/extensions/Responsive/css/responsive.bootstrap.min.css') }}}" rel="stylesheet" />
<!-- ================== END PAGE LEVEL STYLE ================== -->
@endsection

@section('content')
<!-- begin #content -->
<div id="content" class="content">
	<!-- begin page-header -->
	<h1 class="page-header">Add new user</h1>
	<!-- end page-header -->
	
	<div class="row">
		<div class="col-md-12">
			
			<div class="tab-content" data-sortable-id="index-3">
				
				<div class="row">
          <div class="col-md-12">


            <div class="row">
    <div class="col-md-10 col-md-offset-2">
        
      @if ($errors->any())
          <div class="alert alert-danger">
              <ul>
                    {{ implode('', $errors->all('<li class="error">:message</li>')) }}
                </ul>
          </div>
        @endif
    </div>
</div>

{{ Form::open(array('route' => 'users.store', 'class' => 'form-horizontal')) }}

        <div class="form-group">
            {{ Form::label('firstname', 'Firstname:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::text('firstname', Input::old('firstname'), array('class'=>'form-control', 'placeholder'=>'Firstname','required'=>'true')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('lastname', 'Lastname:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::text('lastname', Input::old('lastname'), array('class'=>'form-control', 'placeholder'=>'Lastname','required'=>'true')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('dob', 'Dob:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::input('date','dob', Input::old('dob'), array('class'=>'form-control', 'placeholder'=>'Dob','required'=>'true')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('height', 'Height:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::input('number','height', Input::old('height'), array('class'=>'form-control', 'placeholder'=>'Height','required'=>'true')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('weight', 'Weight:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::input('number','weight', Input::old('weight'), array('class'=>'form-control', 'placeholder'=>'Weight','required'=>'true')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('gender', 'Gender:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::select('gender', array('male' => 'Male','female' => 'Female','other' => 'Other'),Input::old('usertype'),array('class'=>'form-control', 'placeholder'=>'Usertype')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('usertype', 'Usertype:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::select('usertype', array('patient' => 'Patient','doctor' => 'Doctor','manager' => 'Manager'),Input::old('usertype'),array('class'=>'form-control', 'placeholder'=>'Usertype','required'=>'true')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('email', 'Email:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::text('email', Input::old('email'), array('class'=>'form-control', 'placeholder'=>'Email','required'=>'true')) }}
            </div>
        </div>

        <div class="form-group">
            {{ Form::label('password', 'Password:', array('class'=>'col-md-2 control-label')) }}
            <div class="col-sm-10">
              {{ Form::text('password', Input::old('password'), array('class'=>'form-control', 'placeholder'=>'Password','required'=>'true')) }}
            </div>
        </div>


<div class="form-group">
    <label class="col-sm-2 control-label">&nbsp;</label>
    <div class="col-sm-10">
      {{ Form::submit('Create', array('class' => 'btn btn-sm btn-primary')) }}
    </div>
</div>

{{ Form::close() }}
          </div>
        </div>


      </div>
    </div>
  </div>
  <!-- end #content -->

  @endsection

  @section('page-js')
  <!-- ================== BEGIN PAGE LEVEL JS ================== -->
  <script src="{{{ asset('assets/plugins/ckeditor/ckeditor.js') }}}"></script>
  
  <script src="{{{ asset('assets/js/form-wysiwyg.demo.min.js') }}}"></script>
  <script src="{{{ asset('assets/js/apps.min.js') }}}"></script>
  <!-- ================== END PAGE LEVEL JS ================== -->

  <script>
   $(document).ready(function() {
    App.init();
			//Dashboard.init();
  
		});
	</script>
	
	@endsection
