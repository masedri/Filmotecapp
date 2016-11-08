  $(function(){

    init();
    getFilms();

  });

  function init(){

    $('#addImg').click(function(){

      if ($('#url').val() == "") {

        Materialize.toast('Inserte una imagen', 1300, 'red');
      }else{
        $('#agregarImg').html("<img src=\'"+$('#url').val()+"\' height='400'>");
      }
    });

    $("#add").click(function(){


      if ($("#pelicula").val() == "" || $('#director').val() == "" ||
        $('#url').val() == "" || $("#fecha").val() == "" || $('#trailer').val() == "" ||
        $("#textarea").val() == "")
      {

      } else {

        addFilms();

      }

    });

    $("#edit").click(function(){

      if ($("#pelicula").val() == "" || $('#director').val() == "" ||
        $('#url').val() == "" || $("#fecha").val() == "" || $('#trailer').val() == "" ||
        $("#textarea").val() == "")
      {

      } else {

        modificarFilms(id);

      }

    });

    $('#close').click(function(){

      $('#edit').hide();
      $('#ocultar').show();

    });

  }

  function getFilms(){

    $.ajax({

      url: "../peliculas.json",

      type: "GET",

      dataType: "json",

      success: terminado,

      error: error,

    });
  }

  function terminado(json){

    console.log("Datos recibidos");
    console.log(json);

    for (var pelicula of json.peliculas){
        console.log('dentro');
      var templateString = `<ul class="col l4 m6 s12" id="`+pelicula.id+`">
      <div class="card sticky-action hoverable">
      <div class="card-image waves-effect waves-block waves-light">
      <img id="urlSelect`+pelicula.id+`" class="activator" src="`+pelicula.url+`" height="250">
      </div>
      <div class="card-content">
      <span class="card-title activator grey-text text-darken-4" id="titulo`+pelicula.id+`">`+pelicula.titulo+`</span><br>
      <span id="directorSelect`+pelicula.id+`">`+pelicula.director+`</span>
      <span id="fechaSelect`+pelicula.id+`">`+pelicula.fecha+`</span>
      </div>
      <div class='card-action right-align'>
      <div class="left">
      <a id="trailetSelect`+pelicula.id+`" href="`+pelicula.trailer+`?autoplay=1" target="_new"class="btn-floating btn-small waves-effect waves-light blue"><i class="material-icons">play_arrow</i></a>
      </div>
      <a class="modificar btn-floating btn-small waves-effect waves-light green"><i class="material-icons">edit</i></a>
      <a class="eliminar btn-floating btn-small waves-effect waves-light red"><i class="material-icons">delete</i></a>
      </div>
      <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">`+pelicula.titulo+`<i class="material-icons right">close</i></span>
      <p id="textareaSelect`+pelicula.id+`">`+pelicula.sinopsis+`</p>
      <div class="video-container">
      <iframe src="`+pelicula.trailer+`" frameborder="0" allowfullscreen></iframe>
      </div><br>
      </div>
      </div>
      </ul>`;
      $('#cardView').append(templateString);

    }

    $('.eliminar').click(function(){
      $(this).parents('ul').remove();

      id =  $(this).parents('ul').attr('id');

      deleteFilms(id);

    });

    $('.modificar').click(function(){
      id = $(this).parents('ul').attr('id');
      console.log(id);
      $("label").addClass('active');

      var peliculaSelect = $("#titulo"+id).text();
      var directorSelect = $("#directorSelect"+id).text();
      var fechaSelect = $("#fechaSelect"+id).text();
      var urlSelect = $("#urlSelect"+id).attr("src");
      var trailetSelect = $("#trailetSelect"+id).attr('href');
      var textareaSelect = $("#textareaSelect"+id).text();

      $("#pelicula").val(peliculaSelect);
      $("#director").val(directorSelect);
      $("#fecha").val(fechaSelect);
      $('#url').val(urlSelect);
      $('#trailer').val(trailetSelect);
      $("#textarea").val(textareaSelect);

      $('#ocultar').hide();
      $('#edit').show();

      $('html, body').animate({
        scrollTop: 0
      }, 300);

    });

  }

  function error(xhr, status, strErr){

    console.log('Error al ejecutar');
    console.log(xhr);
    console.log(status);
    console.log(strErr);
  }

  function addFilms(){

    let codigo = $('#trailer').val().substring(32);

    let base = 'https://www.youtube.com/embed/'+codigo;

    let array = { titulo:$("#pelicula").val(),director:$("#director").val(),
    fecha:$("#fecha").val(),url:$('#url').val(),trailer:base,
    sinopsis:$("#textarea").val() };

    $.ajax({

      data: array,

      url: "../peliculas.json",

      type: "POST",

      datatype: "json",

    });

  }

  function deleteFilms(id){

    $.ajax({

      url:"../peliculas/"+id,

      type:"DELETE",

      dataType:"json",

      success: completado,

      error: error

    });

  }

  function completado(){

    console.log('realizado');
  }

  function modificarFilms(id){

    let codigo2 = $('#trailer').val().substring(32);

    let base2 = 'https://www.youtube.com/embed/'+codigo2;

    let array2 = { titulo:$("#pelicula").val(),director:$("#director").val(),
    fecha:$("#fecha").val(),url:$('#url').val(),trailer:base2,
    sinopsis:$("#textarea").val() };

    $.ajax({

      data: array2,

      url: "../peliculas/"+id,

      type: "PUT",

      datatype: "json",

      success: completado,

      error: error

    });

  }



