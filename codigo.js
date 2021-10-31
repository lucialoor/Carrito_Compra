var cajaArticulo;
var cajaPrecio;
var cajaUnidades; 
var botonAdd; 
var cajaCarrito;
var sumaCarrito = 0;  
var cajaTotal; 
var formaPago;
var pagoTarjeta; 
var pagoEfectivo; 
var precio; 
var unidades; 
var condiciones; 
var botonPrint;
var errorArtículo;
var errorPrecio;
var errorUnidades; 
var errorTitular; 
var errorNumeroTarjeta;
var errorCvv;
var errorEfectivo; 


window.addEventListener("load", init);

/*El botón “Añadir al carrito” debe tener la funcionalidad siguiente: cuando el usuario rellene las tres primeras cajas de texto 
(artículo, precio y unidades) y haga clic sobre dicho botón deberá sumar el precio del artículo por el número de unidades al 
“Precio total carrito” de los artículos anteriormente añadidos y el nombre del artículo deberá añadirse a “Artículos en el carrito” 
de modo que finalmente se puede ver la lista total de la compra con todos los productos y el precio total de dicha compra o carrito.
Cada vez que se pulsa, además, se vuelven a resetear las tres primeras cajas para poder introducir un nuevo producto, el número de 
unidades será de 1 por defecto. La caja para el nombre del artículo recibe el foco para facilitar la entrada de datos.*/

function addArticulo(){
		
		var nuevoArticulo = cajaArticulo.value;
		var texto = "";
			
			if(cajaTotal.value == ""){
			
			cajaCarrito.value += texto.concat(nuevoArticulo); 
			}else{
			cajaCarrito.value += texto.concat(", " + nuevoArticulo); 
			
			}
}
	
function sumarPrecios(){ 	
	
		var totalArticulo = parseFloat(cajaPrecio.value) * cajaUnidades.value; 
		sumaCarrito += totalArticulo; 
		cajaTotal.value = parseFloat(sumaCarrito); 
}

function resetear(){
	cajaArticulo.value = "";
	cajaPrecio.value = ""; 
	cajaUnidades.value = "1"; 
	cajaArticulo.focus();	
	
}
	
/*Solo se podrán añadir ítems al carrito si se completan tanto el artículo como su precio. Si alguno
de los dos faltase al hacer clic sobre el botón “Añadir al carrito”, se mostraría un texto al lado de
la caja correspondiente advirtiéndolo, además se haría el foco de nuevo en la caja.
También es necesario validar el precio del artículo para que solo acepte datos numéricos, sino se advertirá
de la misma forma que la anterior al hacer clic en el botón “Añadir al carrito”:*/

function evaluarErroresCompra(){
	
	var patronNumero =  /^[1-9]+([.])?([1-9]+)?$/;

	var patronArticulo = /^\D{1,}$/;

	 if((patronArticulo.test(cajaArticulo.value) == true) && (patronNumero.test(parseFloat(cajaPrecio.value)) == true)){
		addArticulo();
		sumarPrecios();
		resetear();
		errorPrecio.textContent = "";
		errorArticulo.textContent = "";

	}else{
		if(cajaArticulo.value == ""){
			errorArticulo.textContent = "Introduzca un articulo";
			
		}else if(patronArticulo.test(cajaArticulo.value) == false){
			errorArticulo.textContent = "Introduzca un artículo correcto";
		}else{
			errorArticulo.textContent = "";
		}
		if(cajaPrecio.value.length == 0){
			errorPrecio.textContent = "Introduzca un precio";
			
		}else if((patronNumero.test(cajaPrecio.value) == false) || (cajaPrecio.value)== 0){
			errorPrecio.textContent = "Introduzca un precio correcto";
		}else{
			errorPrecio.textContent = "";
		}
	}
	
}

/*Habrá dos formas de pagar:
Si se selecciona “Tarjeta” aparecerán tres nuevas cajas de texto para introducir los datos de la tarjeta bancaria.
Si se selecciona “Efectivo” aparecerá una nueva caja de texto con el importe total del carrito.*/

function cargarPago(){

	if(formaPago.value == "seleccione"){
		pagoTarjeta.style.display="none";
		pagoEfectivo.style.display="none";
	}else if(formaPago.value == "tarjeta"){

		pagoTarjeta.style.display="block";
		pagoEfectivo.style.display="none";
	}else{
		pagoTarjeta.style.display="none";
		pagoEfectivo.style.display="block";
	}

}

/*El botón “Imprimir” se habilitará cuando se acepten las condiciones de compra.*/

function botonImprimir(){
	if(condiciones.checked){
		botonPrint.disabled = false;

	}else{
		botonPrint.disabled = true;
	}

}

/*Cuando se pulse el botón “Imprimir” debe mostrar a través de una ventana, tanto la lista de la compra
 final como el precio final del carrito según muestra la siguiente imagen:
 Si no se ha seleccionado una forma de pago deberá aparecer el siguiente mensaje:
 Seleccione una forma de pago*/

function resumenCompra(){

	if(formaPago.value == "tarjeta"){
		alert("Los artículos de mi carrito son: " + cajaCarrito.value + " y el precio total es: " + cajaTotal.value
			+ ". Forma de pago: " + formaPago.value);
	}else if(formaPago.value =="efectivo" && parseFloat(importeEfectivo.value) == cajaTotal.value){
		alert("Los artículos de mi carrito son: " + cajaCarrito.value + " y el precio total es: " + cajaTotal.value
			+ " Forma de pago: " + formaPago.value);
	}else if(formaPago.value == "efectivo" && parseFloat(importeEfectivo.value)> cajaTotal.value){
			alert("Los artículos de mi carrito son: " + cajaCarrito.value + " y el precio total es: " + cajaTotal.value
			+ " Forma de pago: " + formaPago.value + ". Su cambio es de: " + (parseFloat(importeEfectivo.value - cajaTotal.value)));
	}else if(formaPago.value == "seleccione"){
		alert("Seleccione una forma de pago");

	}
}

/*He añadido unas funciones, para que cada vez que se inserte de nuevo un artículo, dato, etc, desaparezca el mensaje de error,
en este caso se quedará escuchando que el usuario pulse una tecla*/

function resetearErrorTitular(){
	errorTitular.textContent = "";
}
function resetearErrorTarjeta(){
	errorNumeroTarjeta.textContent = "";
}
function resetearErrorCvv(){
	errorCvv.textContent = "";
}

function resetearErrorEfectivo(){
	errorEfectivo.textContent = "";
}
function resetearErrorArticulo(){
	errorArticulo.textContent = "";
}
function resetearErrorPrecio(){
	errorPrecio.textContent = "";
}

function evaluarErroresPago(){
	var codigoCvv= /^\d{3}$/;
	var error= 0; 
	if(formaPago.value == "tarjeta"){
		
			if(!isNaN(titular.value)){
				errorTitular.textContent = " Introduzca un titular válido";
				titular.value = "";
				error++;
			}else{
				errorTitular.textContent = "";
			}
			if(isNaN(numeroTarjeta.value)){
				errorNumeroTarjeta.textContent = " Introduzca una tarjeta válida";
				numeroTarjeta.value = ""; 
				error++;
			}else if(numeroTarjeta.value == ""){
				errorNumeroTarjeta.textContent = " Introduzca una tarjeta";
				error++;
			}else{
				errorNumeroTarjeta.textContent = "";
			}
			if(!codigoCvv.test(cvv.value)){
				errorCvv.textContent = " Datos de CVV incorrecto";
				cvv.value = "";	
				error++;		
			}else{
				errorCvv.textContent = "";
			}
			if(error == 0){

				resumenCompra();
			}

			
		}else if(formaPago.value == "efectivo"){
			if(isNaN(importeEfectivo.value)){
				errorEfectivo.textContent = " Introduzca un importe válido"; 
				importeEfectivo.value = ""; 
				error++;
			}else if(parseFloat(importeEfectivo.value) < cajaTotal.value){
				errorEfectivo.textContent = " El importe introducido es menor al importe a pagar";
				error++;
			}else if(importeEfectivo.value == ""){
				errorEfectivo.textContent = " Introduzca un importe";
				error++;
			}else if(error == 0){
				errorEfectivo.textContent = ""; 
				resumenCompra();

			}
		}else if(formaPago.value == "seleccione"){
			resumenCompra();
		}
	}

/*Con el botón “Restablecer” se resetean todas las cajas de texto para poder introducir un nuevo producto. 
La caja para el nombre del artículo recibe el foco para facilitar la entrada de datos. 
Inicializa la caja “Precio total del carrito” a 0 para facilitar las operaciones aritméticas.*/

function restablecer(){
	cajaArticulo.value = "";
	cajaPrecio.value = ""; 
	cajaUnidades.value = "1";
	cajaArticulo.focus();
	cajaTotal.value = 0; 
	cajaCarrito.value = "";
	formaPago.value = "seleccione";
	numeroTarjeta.value= "";
	titular.value = "";
	cvv.value = "";
	pagoTarjeta.style.display="none";
	importeEfectivo.value = "";
	pagoEfectivo.style.display="none";
	botonPrint.disabled = true;
	condiciones.checked = false; 
	errorArticulo.textContent = "";
	errorPrecio.textContent="";
	errorTitular.textContent = "";
	errorNumeroTarjeta.textContent ="";
	errorCvv.textContent ="";
	errorEfectivo.textContent="";


	
}

	

/* Inicializamos totas las variables a utilizar */

function inicializarVariables(){
	cajaArticulo = document.getElementById("nombreArticulo");
	cajaPrecio = document.getElementById("precioArticulo");
	cajaUnidades = document.getElementById("unidades");
	botonAdd = document.getElementById("addArticulos");
	cajaCarrito = document.getElementById("carrito");
	cajaTotal = document.getElementById("totalCarrito");
	formaPago = document.getElementById("formaPago");
	pagoTarjeta = document.getElementById("pagoTarjeta");
	pagoEfectivo = document.getElementById("pagoEfectivo");
	condiciones = document.getElementById("Conditions");
	botonPrint= document.getElementById("print");
	titular = document.getElementById("titular");
	numeroTarjeta = document.getElementById("numeroTarjeta");
	cvv = document.getElementById("cvv");
	errorTitular = document.getElementById("errorTitular"); 
	errorNumeroTarjeta = document.getElementById("errorNumeroTarjeta");
	errorCvv = document.getElementById("errorCvv");
	importeEfectivo = document.getElementById("importeEfectivo");
	errorEfectivo = document.getElementById("errorEfectivo");
	errorArticulo = document.getElementById("errorArticulo");
	errorPrecio = document.getElementById("errorPrecio");
	botonRestablecer = document.getElementById("restore");

}

/*Inicializamos los Eventos que se quedan a la escucha*/

function inicializarEventos() {

	formaPago.addEventListener("change", cargarPago);
	condiciones.addEventListener("click", botonImprimir);
	
	
	botonAdd.addEventListener("click", evaluarErroresCompra);
	botonPrint.addEventListener("click", evaluarErroresPago);
	botonRestablecer.addEventListener("click", restablecer);
	titular.addEventListener("keypress", resetearErrorTitular);
	numeroTarjeta.addEventListener("keypress", resetearErrorTarjeta);
	cvv.addEventListener("keypress", resetearErrorCvv);
	cajaArticulo.addEventListener("keypress", resetearErrorArticulo);
	cajaPrecio.addEventListener("keypress", resetearErrorPrecio);
	importeEfectivo.addEventListener("keypress", resetearErrorEfectivo);

	
}

/*INICIAMOS*/

function init(){
	inicializarVariables();
	inicializarEventos();
	pagoTarjeta.style.display="none";
	pagoEfectivo.style.display="none";
	cajaArticulo.focus();
}

