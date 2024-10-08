<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);
Route::patch('/projects/{id}/mark-completed', [ProjectController::class, 'markAsCompleted']);
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [ProjectController::class, 'index']);

Route::resource('projects', ProjectController::class);