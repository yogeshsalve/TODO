$(document).ready(function() {
    var table = '#projects-table';
    var modal = '#add-project-modal';
    var form = '#add-project-form';
    
    // Set up CSRF token
    var token = $('meta[name="csrf-token"]').attr('content');
    
   
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': token
        }
    });

    

    
$(form).on('submit', function(event) {
    event.preventDefault();
    
    var url = $(this).attr('data-action');
    
    $.ajax({
        url: url,
        method: 'POST',
        data: new FormData(this),
        dataType: 'JSON',
        contentType: false,
        cache: false,
        processData: false,
        success: function(response) {
            if (response.error) {
                if (response.error === 'Duplicate Found') {
                    alert('Duplicate Found: A project with this title already exists.');
                } else {
                    alert('An error occurred: ' + response.error);
                }
            } else {
               
                var row = '<tr data-id="' + response.id + '">';
                    row += '<th scope="row"></th>'; // Leave the order number empty for now
                    row += '<td>' + response.title + '</td>';
                    row += '<td> pending </td>';
                    row += '<td><i class="fa fa-pencil-square-o btn btn-primary edit-btn"></i> <i class="fa fa-close btn btn-danger ms-2 delete-btn"></i></td>';
                row += '</tr>';
        
                $('#projects-table tbody').append(row); 

                renumberTasks(); 

                $(form).trigger("reset"); 
                $(modal).modal('hide'); 
            }
        },
        error: function(xhr) {            
            alert('An error occurred: ' + xhr.responseText);
        }
    });
});

// Handle task deletion
$(document).on('click', '.delete-btn', function() {
    var row = $(this).closest('tr');
    var projectId = row.data('id');

    if (confirm('Are you sure you want to delete this task?')) {
        $.ajax({
            url: '/projects/' + projectId, 
            method: 'DELETE',
            dataType: 'JSON',
            success: function(response) {
                if (response.success) {
                    row.remove(); 
                    renumberTasks(); 
                } else {
                    alert('An error occurred: ' + response.message);
                }
            },
            error: function(xhr) {
                
                alert('An error occurred: ' + xhr.responseText);
            }
        });
    }
});




   // Handle edit button click
$(document).on('click', '.edit-btn', function() {
    var row = $(this).closest('tr');
    var projectId = row.data('id');

    if (confirm('Are you sure you want to mark this project as completed?')) {
        $.ajax({
            url: '/projects/' + projectId + '/mark-completed',
            method: 'PATCH',
            dataType: 'JSON',
            success: function(response) {
                if (response.success) {
                    row.remove(); 
                    renumberTasks();
                }
            },
            error: function(xhr) {
               
                alert('An error occurred: ' + xhr.responseText);
            }
        });
    }
});



$(document).ready(function() {

    // Function to renumber tasks
    function renumberTasks() {
        $('#projects-table tbody tr').each(function(index) {
            $(this).find('th').text(index + 1); 
        });
    }

    // Handle toggle button click
    $('#toggle-status').on('click', function() {
        var showPending = $(this).data('show-pending'); 

        if (showPending) {
           
            window.location.href = '/projects?show=pending';
            
        } else {
            
            window.location.href = '/projects?show=all';
            
        }
        
    });
    renumberTasks();
});

// Renumber all tasks
function renumberTasks() {
    $('#projects-table tbody tr').each(function(index) {
        $(this).find('th').text(index + 1); 
    });
}


});




