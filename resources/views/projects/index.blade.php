<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="csrf-token" content="{{ csrf_token() }}">

  <title>ToDo App</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

</head>

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
  }

  .container {
    max-width: 600px;   
    margin-top: 200px;
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  h4 {
    color: #3e6a99;
  }

  .task-input {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }

  .task-input input[type="text"] {
    border: 1px solid #ddd;
    border-radius: 4px;
  }

  .task-input button {
    padding: 5px 10px;
    font-size: 16px;
    color: #fff;
    background-color: #3e6a99;
    border: none;
    border-radius: 4px;
    margin-left: 10px;
    cursor: pointer;
  }

  .task-input button:hover {
    background-color: #0056b3;
  }

  .toast-container {
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1050;
  }

  .toast {
    min-width: 300px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
</head>

<body>
  <div class="container">   
  <h4 class="header">
    <b>PHP - Simple To Do List App</b>
    <button id="toggle-status" class="btn btn-secondary" data-show-pending="{{ $showPending === 'all' ? 'true' : 'false' }}">
        {{ $showPending === 'all' ? 'Show Pending Tasks' : 'Show All Tasks' }}
    </button>
</h4>
    <hr>

    <form data-action="{{ route('projects.store') }}" method="POST" enctype="multipart/form-data" id="add-project-form">
     
      <div class="modal-body">
        @csrf
        <div class="task-input">
          <input type="text" id="title"   name="title" class="form-control" style="display: inline-block; width: auto;">
          <button id="addTaskButton" type="submit" class="btn btn-primary">Add Task</button>
        </div>
      </div>
    </form>


    

    
    <table class="table" id="projects-table">
    <thead>
        <tr>
            <th>#</th>
            <th style="text-align: left;">Task</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        @foreach($projects as $project)
        <tr data-id="{{ $project->id }}">
            <th scope="row">{{ $project->id }}</th>
            <td>{{ $project->title }}</td>
            <td>{{ $project->status }}</td>
            
            <td>
              @if($project->status === "pending")
                  <i class="fa fa-pencil-square-o btn btn-primary edit-btn"></i>
              @else
                  <!-- Show a blank td if the status is not pending -->
              @endif
              <i class="fa fa-close btn btn-danger ms-2 delete-btn"></i>
          </td>
        </tr>
        @endforeach
    </tbody>
</table>

  </div>

 
    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"></script>
    <script src="{{ asset('js/projects.js') }}" defer></script>

  </body>
</html>
