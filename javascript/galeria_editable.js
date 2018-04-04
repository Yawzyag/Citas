var t, actual;

function select(i) {
    actual = i;

    $("nav a")
        .removeClass("on off")
        .addClass(function (j) {
            return (j === i) ? "on" : "off";
        });

    $("#persona").html(galeria[i].persona);
    $("#frase").html(galeria[i].frase);
    $("#foto").attr("src", galeria[i].foto);

    clearTimeout(t);
    t = setTimeout(function () {
        select((i + 1) % galeria.length);
    }, 2000);
}

function generar_selector() { // regenera la botonera
    var selector = $("#selector");

    selector.html("");

    galeria.forEach(function (elem, i) {
        selector.append("<li><a onClick='select(" + i + ")'></a></li>");
    });
}

$(function () {
    generar_selector();

    $("#editar").on("click", function () {
        clearTimeout(t);

        $("#persona_d").html(galeria[actual].persona);
        $("#frase_d").html(galeria[actual].frase);
        $("#foto_d").html(galeria[actual].foto);

        $("#datos").css("display", "block");
    });


    $("#nuevo").on("click", function () {
        $("#datos").css("display", "none");

        actual = galeria.push({
            persona: $("#persona_d").html(),
            frase: $("#frase_d").html(),
            foto: $("#foto_d").html()
        }) - 1;

        alert("Cita agregada");

        generar_selector();

        select(actual);
    });

    //hace editable el contenido de los div, con la posibilidad de editar su texto

    $("#guardar").on("click", function () {
        $("#persona_d").attr('contenteditable', 'true');
        $("#frase_d").attr('contenteditable', 'true');
        $("#foto_d").attr('contenteditable', 'true');
        $("#guardar").attr("title", "Haz click para editar la cita actual");
        $("#persona_d").html(galeria[actual].persona);
        $("#frase_d").html(galeria[actual].frase);
        $("#foto_d").html(galeria[actual].foto);


        generar_selector();

        select(actual);
        clearTimeout(t);
    });

    //borra el ultimo elemento del array

    $("#borrar").on("click", function () {
        if (galeria.length > 1) {
            select(0);
            galeria.splice(actual - 1, 1);
        }
        generar_selector();
        select(0);
        clearTimeout(t);
    });

    //titulo botones al sobreponer el mouse

    $("#borrar").on("mouseover", function () {
        if (galeria.length > 1) {
            $("#borrar").attr("title", "Haz click para borrar la cita");
        } else if (galeria.length === 1) {
            select(actual);
            $("#borrar").attr("title", "Haz eliminado todas las citas!");
        }
        clearTimeout(t);
    });
    $("#guardar").on("mouseover", function () {
        $("#guardar").attr("title", "Haz click para editar la cita");
    });

    $("#nuevo").on("mouseover", function () {
        $("#nuevo").attr("title", "Haz click para agregar la cita editada al carrousel");
    });

    select(0);
});