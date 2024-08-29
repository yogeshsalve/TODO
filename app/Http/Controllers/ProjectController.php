<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Response;

class ProjectController extends Controller
{
    
    // public function index()
    // {
    //     $projects = Project::where('status', 'pending')->get();
    //     return view('projects.index')->with(compact('projects'));
    // }

    public function index(Request $request)
{
    // Check if the request has a 'show' query parameter
    $showPending = $request->input('show', 'pending'); // Default to 'pending'

    if ($showPending === 'all') {
        // Fetch all tasks (both pending and completed)
        $projects = Project::all();
    } else {
        // Fetch only pending tasks
        $projects = Project::where('status', 'pending')->get();
    }

    // Return the view with the projects and the current filter status
    return view('projects.index', compact('projects', 'showPending'));
}

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|unique:projects,title', // Ensure the title is unique
            'status' => ''
        ]);
    
        // Check if a project with the same title already exists
        $existingProject = Project::where('title', $data['title'])->first();
    
        if ($existingProject) {
            return response()->json(['error' => 'Duplicate Found'], 400);
        }
    
        // Create a new project if no duplicate is found
        $project = Project::create($data);
    
        return response()->json($project);
    }

   
    
    public function destroy($id)
    {
        $project = Project::findOrFail($id);
        $project->delete();
    
        return response()->json(['success' => true]);
    }

    public function markAsCompleted($id)
{
    $project = Project::findOrFail($id);
    $project->status = 'completed'; 
    $project->save();

    return response()->json(['success' => true]);
}
    
    

    
}
