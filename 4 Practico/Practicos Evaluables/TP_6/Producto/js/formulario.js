// A DESARROLLAR

/*function insertarComprobante(){
	document.getElementById('titulo-comprobante').style.display = 'block';

	const selectCiudad = document.getElementById("ciudad");
	const DOMcomprobanteForm = document.getElementById('comprobante-formulario');

	comprobante.innerHTML = '<p>Calle : '+document.getElementById("calle").value
	+'<br>Numero : '+document.getElementById("numero").value
	+'<br>Ciudad : '+selectCiudad.options[selectCiudad.value].text
	+'<br>Referencia : '+document.getElementById("referencia")+'</p>' ;
		
}
*/


//SECCIÓN DEL FUNCIONAMIENTO DEL FORMULARIO
// BOTONES y VISUALES

//BOTONES

function botonContinuar() {	
	const caracteresCalle = 'abcdefghijklmnñopqrstuvwxyz'.split('').concat('abcdefghijklmnñopqrstuvwxyz'.split('').map((c) => c.toUpperCase())); // Letras y espacios, pueden llevar acentos.
	const caracteresNumero = '0123456789'.split(''); // numeros, guion medio


	var SelectCiudades=document.getElementById('ciudad');
	var SelectCalle=document.getElementById('calle').value.split('');
	var SelectNum=document.getElementById('numero').value.split('');


	if(SelectCiudades.value==0 || SelectCiudades.value==""){
		//alert("Selecciona una ciudad para continuar");
		SelectCiudades.focus();
	}else{
		if(SelectCalle.length == 0 || !SelectCalle.every( letra => caracteresCalle.includes(letra) ))	{
			//alert("Ingrese una calle válida");
			SelectCalle.focus();
			}
		else{
				if(SelectNum.length == 0 || !SelectNum.every( letra => caracteresNumero.includes(letra) )){
					//alert("Ingrese un numero válido (Planta Baja como 0)");
					SelectNum.focus();
				}
				else{
					mostrarProductos();
					ocultarFormulario();
				}
		}
	}
}
function botonConfirmarPagoEfectivo(){
	const input = document.getElementById('importe');
	const miTotal = document.getElementById('total');


	const value = parseInt(input.value);

	if (value < parseFloat(miTotal.textContent)) {
		alert('Tu importe debe ser mayor o igual a ' + parseFloat(miTotal.textContent));
	}else{
		if(input.value.split('').length != 0){
			ocultar();
			document.getElementById('fechaEntrega').style.display = 'block';
			document.getElementById('titulo-entrega').style.display = 'block';
		}
	}			
}
function botonConfirmarPagoVisa(){
		
	const caracteresNumero = '0123456789'.split(''); // numeros, guion medio
	const alfabeto = 'abcdefghijklmnñopqrstuvwxyz'.split('').concat('abcdefghijklmnñopqrstuvwxyz'.split('').map((c) => c.toUpperCase())); // Letras y espacios, pueden llevar acentos.

	const numVisa = document.getElementById("tarjeta").value.split('');
	const nomyap = document.getElementById("nomyap").value.split('');
	const vencimiento = document.getElementById("vencimiento").value.split('');
	const cvc = document.getElementById("cvc").value;

	var mes = 0;
	var year = 0;
			
	if ((numVisa.length != 16)
     		|| (parseInt(numVisa[0]) != 4)
				|| !numVisa.every(num => caracteresNumero.includes(num)))
	{
		visa_error = "No es un número de Visa correcto";
		alert(visa_error);
	}else {
		if(nomyap.length == 0 || !nomyap.every( letra => alfabeto.includes(letra)) ){
			alert("Ingrese Nombre y Apellido");
		} else {
			if (vencimiento.length != 7
				|| !['/'].includes(vencimiento[2])
					|| !vencimiento.every(c => (caracteresNumero.includes(c)
						|| ['/'].includes(c))))
			{
			alert("Escribi bien el formato del vencimiento");
			}else{
				//Formato MM/AAAA en numero
				mes = vencimiento[0] + vencimiento[1];
				year = vencimiento[3] + vencimiento[4] + vencimiento[5] + vencimiento[6];					
				if( parseInt(mes) > 0 && parseInt(mes) < 13 && parseInt(year) >= 2021 && parseInt(year) < 2040){
					if(parseInt(year) == 2021 && parseInt(mes) < 10){
						alert("Su tarjeta vencio este año.");
					}
					else {
						if( cvc>99 && cvc<1000) {
							alert("Pago exitoso.");
							ocultar();
							document.getElementById('titulo-entrega').style.display = 'block';
							document.getElementById('fechaEntrega').style.display = 'block';
						}
						else {
							alert("Código de seguridad incorrecto");
						}
					}
				} else {
					alert("Tarjeta inválida.");
				}
			}				
		}
	}
}
function botonConfirmarFechaInmediato() {
	const entrega = document.getElementById("condicionEntrega").value;
	const rapido = document.getElementById("rapido");
	const inputProgramado = document.getElementById("input-programado").value;
	const programado = document.getElementById("programado");
	const botonProgramado = document.getElementById("boton-programado");
	const botonRapido = document.getElementById("boton-rapido");

	const finale = document.getElementById("comprobante");


	if (entrega == 0) //lo antes posible
	{
		botonProgramado.style.display = "none";
		botonRapido.style.display = "block";
		programado.style.display = "none";
		rapido.style.display = "block";
		if (rapido.value != 0) {
			alert("Felicitaciones, tu pedido llegará en " + rapido.value + " horas");
			ocultar();
			finale.style.display = "block";
			insertarComprobante();
		}
	}
	else {//elegir fecha
		rapido.style.display = "none";
		programado.style.display = "block";
		botonProgramado.style.display = "block";
		botonRapido.style.display = "none";
	}
}
function botonConfirmarFechaProgramado() {
	const entrega = document.getElementById("condicionEntrega").value;
	const inputProgramado = document.getElementById("input-programado").value;
	const programado = document.getElementById("programado");

	const botonProgramado = document.getElementById("boton-programado");
	const botonRapido = document.getElementById("boton-rapido");

	const finale = document.getElementById("comprobante");

	if (entrega == 1) //elegir fecha
	{
		alert("Felicitaciones, tu pedido llegará el " + inputProgramado);
		ocultar();
		finale.style.display = "block";
		insertarComprobante();
	}
	else {//rapido

	programado.style.display = "none";
	botonProgramado.style.display = "none";
	botonRapido.style.display = "block";
	}		
}

function insertarComprobante() {
	document.getElementById('comprobante').style.display = 'block';
	
}

function botonPagoEfectivo() {
	document.getElementById('containerPago').style.display = 'none';
	document.getElementById('titulo-efectivo').style.display = 'block';
	document.getElementById('formEfectivo').style.display = 'block';
}
function botonPagoVisa() {
	document.getElementById('containerPago').style.display = 'none';
	document.getElementById('formVisa').style.display = 'block';
	document.getElementById('titulo-visa').style.display = 'block';
	document.getElementById('formEfectivo').style.display = 'none';
}

//VISUALES
function mostrarProductos() {
	document.getElementById('container').style.display = 'block';
	document.getElementById('titulo-carrito').style.display = 'block';

}
function volverAlPrincipio(){
	ocultar();
	document.getElementById('formulario').style.display = 'block';
	document.getElementById('titulo-formulario').style.display = 'block';
}
function ocultar(){
	ocultarProductos();
	document.getElementById('titulo-visa').style.display = 'none';
	document.getElementById('titulo-entrega').style.display =  'none';
	document.getElementById('titulo-efectivo').style.display = 'none';
	document.getElementById('rapido').style.display = 'none';
	document.getElementById('programado').style.display = 'none';
	document.getElementById('formVisa').style.display = 'none';
	document.getElementById('containerPago').style.display = 'none';
	document.getElementById('formEfectivo').style.display = 'none';
	document.getElementById('fechaEntrega').style.display = 'none';
}
function ocultarProductos(){
	document.getElementById('titulo-carrito').style.display = 'none';
	document.getElementById('container').style.display = 'none';
}
function ocultarFormulario(){
	document.getElementById('formulario-personal').style.display = 'none';
}
function confirmarCarrito(){
	const miTotal = parseFloat(document.getElementById('total').textContent);
	const DOMtotalPago = document.getElementById('totalPago');
	const DOMtotal = document.getElementById('total');
		
	if(miTotal > 0){
		ocultarProductos();
		document.getElementById('containerPago').style.display = 'block';
		DOMtotalPago.textContent = DOMtotal.textContent;
	}
	else{
		alert("Debe agregar al menos un producto al carrito");
	}
}