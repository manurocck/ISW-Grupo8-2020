const formulario = document.getElementById('formulario');
const inputs 	 = document.querySelectorAll('#formulario input');


const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.		
	calle:  /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	numero: /^[Z0-9\-]{1,5}$/, // numeros, guion medio
	password: /^.{4,12}$/, // 4 a 12 digitos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}

const campos = {
	calle: false,
	numero: false,
	ciudad: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "calle":
			validarCampo(expresiones.calle, e.target, 'calle');
		break;
		case "numero":
			validarCampo(expresiones.numero, e.target, 'numero');
		break;				
		case "ciudad":
			validarCiudad();
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[indexOf(campo)] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[indexOf(campo)] = false;
	}
}
const validarCiudad =() =>{
	const indice = document.getElementById("ciudad").selectedIndex;
	
	if( indice.value == null || indice.value == "0" ) 
	{
		document.getElementById(`grupo__ciudad`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__ciudad`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__ciudad i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__ciudad i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__ciudad .formulario__input-error`).classList.add('formulario__input-error-activo');		
		campos[indexOf("ciudad")] = false;
	}
	else
	{
		document.getElementById(`grupo__ciudad`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__ciudad`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__ciudad i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__ciudad i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__ciudad .formulario__input-error`).classList.remove('formulario__input-error-activo');		
		campos[indexOf("ciudad")] = true;	
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
	input.addEventListener('change', validarFormulario);
});



formulario.addEventListener('submit', (e) => {
	e.preventDefault();
	const terminos = document.getElementById('terminos');
	if(campos.calle && campos.numero && terminos.checked ){
		formulario.reset();
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');}, 5000);
		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {icono.classList.remove('formulario__grupo-correcto');});
	} 
	else
	{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
})

function mostrarProductos(){
    document.getElementById('container').style.display = 'block';
    document.getElementById('titulo-carrito').style.display = 'block';
	
}


