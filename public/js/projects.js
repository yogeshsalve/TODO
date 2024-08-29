$(document).ready(function() {
    var table = '#projects-table';
    var modal = '#add-project-modal';
    var form = '#add-project-form';
    
    // Set up CSRF token
    var token = $('meta[name="csrf-token"]').attr('content');
    
    // Add CSRF token to AJAX requests
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': token
        }
    });

    

     // Handle form submission
// $(form).on('submit', function(event) {
//     event.preventDefault();
    
//     var url = $(this).attr('data-action');
    
//     $.ajax({
//         url: url,
//         method: 'POST',
//         data: new FormData(this),
//         dataType: 'JSON',
//         contentType: false,
//         cache: false,
//         processData: false,
//         success: function(response) {
//             if (response.error) {
//                 if (response.error === 'Duplicate Found') {
//                     alert('Duplicate Found: A project with this title already exists.');
//                 } else {
//                     alert('An error occurred: ' + response.error);
//                 }
//             } else {

//                 var newOrderNumber = $('#projects-table tbody tr').length + 1;
//                 var row = '<tr data-id="' + response.id + '">';
//                 row += '<th scope="row">' + newOrderNumber + '</th>';
//                     row += '<td>' + response.title + '</td>';
//                     row += '<td> pending </td>';
//                     row += '<td><i class="fa fa-pencil-square-o btn btn-primary edit-btn"></i> <i class="fa fa-close btn btn-danger ms-2 delete-btn"></i></td>';
//                 row += '</tr>';
        
//                 $('#projects-table tbody').append(row); // Append the new row to the tbody
        
//                 $(form).trigger("reset"); // Reset the form
//                 $(modal).modal('hide'); // Hide the modal (if using a modal)
//             }
//         },
//         error: function(xhr) {
//             // Handle the error
//             alert('An error occurred: ' + xhr.responseText);
//         }
//     });
// });


//     // Handle delete button click
//     $(document).on('click', '.delete-btn', function() {
//         var row = $(this).closest('tr');
//         var projectId = row.data('id');

//         if (confirm('Are you sure you want to delete this project?')) {
//             $.ajax({
//                 url: '/projects/' + projectId, // Adjust this URL if needed
//                 method: 'DELETE',
//                 dataType: 'JSON',
//                 success: function(response) {
//                     row.remove(); // Remove the row from the table
//                 },
//                 error: function(xhr) {
//                     // Handle the error
//                     alert('An error occurred: ' + xhr.responseText);
//                 }
//             });
//         }
//     });
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
                // Append the new row
                var row = '<tr data-id="' + response.id + '">';
                    row += '<th scope="row"></th>'; // Leave the order number empty for now
                    row += '<td>' + response.title + '</td>';
                    row += '<td> pending </td>';
                    row += '<td><i class="fa fa-pencil-square-o btn btn-primary edit-btn"></i> <i class="fa fa-close btn btn-danger ms-2 delete-btn"></i></td>';
                row += '</tr>';
        
                $('#projects-table tbody').append(row); // Append the new row to the tbody

                renumberTasks(); // Renumber all tasks after adding a new one

                $(form).trigger("reset"); // Reset the form
                $(modal).modal('hide'); // Hide the modal (if using a modal)
            }
        },
        error: function(xhr) {
            // Handle the error
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
            url: '/projects/' + projectId, // Adjust this URL if needed
            method: 'DELETE',
            dataType: 'JSON',
            success: function(response) {
                if (response.success) {
                    row.remove(); // Remove the row from the table
                    renumberTasks(); // Renumber all tasks after deletion
                } else {
                    alert('An error occurred: ' + response.message);
                }
            },
            error: function(xhr) {
                // Handle the error
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
            url: '/projects/' + projectId + '/mark-completed', // Adjust this URL if needed
            method: 'PATCH',
            dataType: 'JSON',
            success: function(response) {
                if (response.success) {
                    row.remove(); 
                    renumberTasks();// Remove the row from the table
                }
            },
            error: function(xhr) {
                // Handle the error
                alert('An error occurred: ' + xhr.responseText);
            }
        });
    }
});



$(document).ready(function() {

    // Function to renumber tasks
    function renumberTasks() {
        $('#projects-table tbody tr').each(function(index) {
            $(this).find('th').text(index + 1); // Set the new order number
        });
    }

    // Handle toggle button click
    $('#toggle-status').on('click', function() {
        var showPending = $(this).data('show-pending'); // Get the current state

        if (showPending) {
            // Switch to showing only pending tasks
            window.location.href = '/projects?show=pending';
            
        } else {
            // Switch to showing all tasks
            window.location.href = '/projects?show=all';
            
        }
        
    });
    renumberTasks();
});

// Renumber all tasks
function renumberTasks() {
    $('#projects-table tbody tr').each(function(index) {
        $(this).find('th').text(index + 1); // Set the new order number
    });
}


});




