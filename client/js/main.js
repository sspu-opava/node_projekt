$(function(){
    function getAll() {  
        console.log(new Date());     
        $.ajax({
            url: 'http://localhost:3000/students',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                $('#list').html('');
                $('#list').append(list(data));
                view(data[0]);
                $('#list a').on('click', function(){
                    getById($(this).attr('id'));
                });
                $('#list .delete').on('click', function(){
                    remove($(this).attr('id'));
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });    
    }

    function list(data) {
        var output = '<ul>';
        data.forEach(function(row,key){
            output += '<li><a href="#" id="'+row.id+'">'+row.prijmeni+', '+row.jmeno+'</a> [<a href="#" id="'+row.id+'" class="delete">X</a>]</li>';
        });
        output += '</ul>';
        return output;
    }

    function getById(id) {
        $.ajax({
            url: 'http://localhost:3000/students/'+id,
            type: 'GET',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                console.log(data);                
                var student = data[0];
                view(student);
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log('Error in Operation');
            }
        });                
    }

    function view(student) {
        $('#view').html('');
        $('#view').append('<h4>'+student.jmeno+' '+student.prijmeni+'</h4>');
        $('#view').append('<p>Narozen/a: <b>'+student.narozeni+'</b></p>');
        $('#view').append('<p>Absence: <b>'+ (student.absence == null ? '---' : student.absence) +'</b></p>');
        $('#view').append('<p>Průměrný prospěch: <b>'+ (student.prospech == null ? '---' : student.prospech) +'</b></p>');
        $('#view').append('<p>Poznámka: <b>'+ (student.poznamka == null ? '---' : student.poznamka) +'</b></p>');
    }

    function remove(id) {
        $.ajax({
            url: 'http://localhost:3000/students/'+id,
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
    
    getAll();
})