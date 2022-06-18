const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
    datos: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	codigo: /^\d{16}$/, // 16 numeros.
    cantidad: /^\d{1,3}$/ // 1 a 3 numeros.
}

const campos = {
    email: false,
    codigo: false,
    cantidad: false,
    datos: true
}

const validarFormulario = (e) => {
    switch(e.target.name){
        case "email":
            validarCampo(expresiones.correo, e.target.value, e.target.name);
        break;
        case "codigo":
            validarCampo(expresiones.codigo, e.target.value, e.target.name);
        break;
        case "cantidad":
            validarCampo(expresiones.cantidad, e.target.value, e.target.name);
            if (e.target.value == 0){
                eliminarCantidad()
            } else {
                actualizarCantidad(e.target.value);
            }
        break;
    }
}

const actualizarCantidad = (valor) => {
    final = valor * 0.85;
    document.getElementById("formulario__recibes").classList.remove("formulario__recibes");
    document.getElementById("formulario__recibes").classList.add("formulario__recibes-activo");
    document.getElementById("formulario__grupo-btn-enviar").classList.remove("formulario__grupo-btn-enviar-2col");
    document.getElementById("formulario__btn").style.width = "60%"; 
    document.getElementById("cantidad_enviamos").innerHTML = `: ${final}`;
}

const eliminarCantidad = () => {
    document.getElementById("formulario__recibes").classList.add("formulario__recibes");
    document.getElementById("formulario__recibes").classList.remove("formulario__recibes-activo");
    document.getElementById("formulario__grupo-btn-enviar").classList.add("formulario__grupo-btn-enviar-2col");
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input)){
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;
    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-circle-xmark');
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-circle-check');
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        campos[campo] = false;
    }
}


inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario)
    input.addEventListener('blur',  validarFormulario)
})

formulario.addEventListener('submit', (e) => {
    /* sustituir por enviar formulario php 
    e.preventDefault();*/

    const terminos = document.getElementById('terminos');
    if (campos.email && campos.codigo && campos.cantidad /*&& campos.datos*/ && terminos.checked){
        /* enviar formulario php
        formulario.reset() */
        
        document.getElementById('formulario__mensaje-error').classList.remove('formulario__mensaje-error-activo')
        document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activado')
        setTimeout(() => {
            document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activado')
        }, 5000) 
        
        document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
            icono.classList.remove('formulario__grupo-correcto')
        })
    } else {
        document.getElementById('formulario__mensaje-error').classList.add('formulario__mensaje-error-activo');
        setTimeout(() => {
            document.getElementById('formulario__mensaje-error').classList.remove('formulario__mensaje-error-activo')
        }, 3000) 
    }

})