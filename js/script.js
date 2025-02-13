document.addEventListener("DOMContentLoaded", () => {
	function contadorDeClics() {
		const botonClics = document.querySelector(".boton-raton");
		const numeroDeClics = document.querySelector("#numero-clics");
		let clics = 0;
		botonClics.addEventListener("click", () => {
			console.log("picándole");
			clics++;
			numeroDeClics.textContent = clics;
		});
	}
	contadorDeClics();

	function relojDigital() {
		const relojP = document.querySelector("#reloj");
		let fecha = new Date();
		let hora = fecha.getHours();
		let minutos = fecha.getMinutes();
		let segundos = fecha.getSeconds();

		if (minutos < 10) {
			minutos = "0" + minutos;
		}
		if (segundos < 10) {
			segundos = "0" + segundos;
		}

		relojP.textContent = `${hora}:${minutos}:${segundos}`;
	}
	relojDigital();
	setInterval(relojDigital, 1000);

	function theme() {
		const botonApariencia = document.querySelector(".boton-apariencia");

		botonApariencia.addEventListener("click", () => {
			document.body.classList.toggle("light");
		});
	}
	theme();
});
