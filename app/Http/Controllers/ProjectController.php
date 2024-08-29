<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use Response;

class ProjectController extends Controller
{
    
    public function index(Request $request)
{
    
    $showPending = $request->input('show', 'pending'); 

    if ($showPending === 'all') {       
        $projects = Project::all();
    } else {        
        $projects = Project::where('status', 'pending')->get();
    }    
    return view('projects.index', compact('projects', 'showPending'));
}

    
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|unique:projects,title', 
            'status' => ''
        ]);
    
        
        $existingProject = Project::where('title', $data['title'])->first();
    
        if ($existingProject) {
            return response()->json(['error' => 'Duplicate Found'], 400);
        }
    
       
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
