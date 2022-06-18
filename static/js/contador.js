$.getJSON("http://127.0.0.1:3000/api/jsondeprueba", function(data){

    cantidad = `${data.cantidad}`

    porcentaje = cantidad/500*100;

    document.getElementById("progreso_mensual").style.width = `${porcentaje}%`;
});