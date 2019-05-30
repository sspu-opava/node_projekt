$(function(){

    function getAll() {  
        console.log(new Date());     
        $.ajax({
            url: 'http://localhost:3000/api/movies',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                $('#list').html('');
                $('#list').append(list(data));
                $('#list a').on('click', function(){
                    $('#modelId').modal('show');
                    getById($(this).data('id'));
                });
                $('button.insert').on('click', function(){
                    $('#id').val('');
                    $('#name').val('');
                    $('#year').val('');            
                });

                $('button.delete').on('click', function(){
                    remove($(this).data('id'));
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });    
    }

    function list(data) {
        var output = '';
        data.forEach(function(row,key){
            output += '<tr><td><a href="#" data-id="'+row.id+'">'+row.name+'</a></td><td>'+row.year+'</td><td><button data-id="'+row.id+'" class="delete btn btn-danger">Smazat</button></td></tr>';
        });
        return output;
    }

    function getById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/movies/'+id,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                console.log(data);                
                var movie = data;
                $('#id').val(movie.id);
                $('#name').val(movie.name);
                $('#year').val(movie.year);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });                
    }

    function remove(id) {
        $.ajax({
            url: 'http://localhost:3000/api/movies/'+id,
            type: 'DELETE',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                console.log(data);                
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });                        
    }

    function insert(data) {
        $.ajax({
            url: 'http://localhost:3000/api/movies',
            type: 'POST',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(data); 
                getAll();                           
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });                        
    }

    function update(id, data) {
        $.ajax({
            url: 'http://localhost:3000/api/movies/'+id,
            type: 'PUT',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(data); 
                getAll();                           
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });                        
    }

    $('#submit').on('click', function(){
        var json = {};
        json.name = $('#name').val();
        json.year = $('#year').val();
        var data = JSON.stringify(json);
        if ( $('#id').val() ) {
            update($('#id').val(), data);
        } else {
            insert(data);
        }
    });
    
    getAll();
})