document.addEventListener('DOMContentLoaded', () => {
    /*--------------------DIV6-------------------------*/

    function adivinaElNumero() {
        const inputNumero = document.getElementById('input-numero');
        const botonAdivinaNumero = document.querySelector('.boton-adivina-numero');
        const mensajeAdivinaNumero = document.querySelector('.p-adivina-numero');
        const numeroDeIntentos = document.querySelector('.numero-intentos');

        let numeroSecreto = Math.floor(Math.random() * 10) + 1;
        let intentos = 0;

        inputNumero.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Evita que el formulario se recargue (si lo hay)
                botonAdivinaNumero.click(); // Simula el clic en el botón
            }
        });

        botonAdivinaNumero.addEventListener('click', () => {
            console.log('cliccc');
            let numeroIntroducido = parseInt(inputNumero.value);

            if (numeroIntroducido === numeroSecreto) {
                mensajeAdivinaNumero.textContent = '¡Has acertado! 🎉';
                lanzarConfeti();

                inputNumero.disabled = true;
            } else if (numeroIntroducido < numeroSecreto) {
                mensajeAdivinaNumero.textContent = 'Debe ser un número mayor ⬆️';
            } else {
                mensajeAdivinaNumero.textContent = 'Debe ser un número menor ⬇️';
            }
            intentos++;
            numeroDeIntentos.textContent = intentos;
        });
    }
    adivinaElNumero();

    function lanzarConfeti() {
        const divJuego = document.querySelector('.interior-card-div6');
        const rect = divJuego.getBoundingClientRect(); // Obtiene la posición y tamaño del div

        confetti({
            particleCount: 100, // Cantidad de partículas
            spread: 70, // Ángulo de dispersión
            origin: {
                x: (rect.left + rect.width / 2) / window.innerWidth, // Centrar en el div
                y: (rect.top + rect.height / 2) / window.innerHeight, // Centrar en el div
            },
        });
    }
    /*--------------------DIV7-------------------------*/

    const selectMedida1 = document.getElementById('select-medida1');
    const selectMedida2 = document.getElementById('select-medida2');
    const inputMedida = document.getElementById('input-medida');
    const outputMedida = document.getElementById('output-medida');

    const conversiones = {
        cm: { m: 0.01, km: 0.00001 },
        m: { cm: 100, km: 0.001 },
        km: { cm: 100000, m: 1000 },
    };

    function conversorUnidades() {
        let valorSelectMedida1 = selectMedida1.value;
        let valorSelectMedida2 = selectMedida2.value;
        let numeroMedidaIntroducido = parseFloat(inputMedida.value) || 0;

        if (valorSelectMedida1 === valorSelectMedida2) {
            outputMedida.textContent = numeroMedidaIntroducido;
        } else {
            let factorConversion = conversiones[valorSelectMedida1]?.[valorSelectMedida2] || 1;
            outputMedida.textContent = numeroMedidaIntroducido * factorConversion;
        }
    }

    selectMedida1.addEventListener('change', conversorUnidades);
    selectMedida2.addEventListener('change', conversorUnidades);
    inputMedida.addEventListener('input', conversorUnidades);

    conversorUnidades();
    /*--------------------DIV8-------------------------*/

    const inputPassword = document.getElementById('input-password');
    const pIndicadorPassword = document.querySelector('.p-indicador-password');
    const barraProgreso = document.querySelector('.barra-progreso');
    const botonTema = document.querySelector('.boton-tema');

    const colores = {
        oscuro: { rojo: '#ff7575', amarillo: '#ffdf00', verde: '#7cee7c' },
        claro: { rojo: '#b40018', amarillo: '#b59b00', verde: '#008f00' },
    };

    function actualizarIndicador(condicionCumplida, longitudPassword) {
        const temaActual = document.body.classList.contains('dark') ? 'oscuro' : 'claro';

        let color = colores[temaActual].rojo;
        let mensaje = '';
        let porcentaje = 0;

        if (longitudPassword === 0) {
            mensaje = 'Introduce contraseña';
            porcentaje = 0;
        } else if (longitudPassword < 8) {
            mensaje = 'Contraseña muy débil';
            color = colores[temaActual].rojo;

            porcentaje = Math.min(30, (longitudPassword / 8) * 30);
        } else {
            if (condicionCumplida === 0) {
                mensaje = 'Contraseña muy débil';
                color = colores[temaActual].rojo;
                porcentaje = 33;
            } else if (condicionCumplida === 1) {
                mensaje = 'Contraseña débil';
                color = colores[temaActual].rojo;
                porcentaje = 45;
            } else if (condicionCumplida === 2) {
                mensaje = 'Contraseña media';
                color = colores[temaActual].amarillo;
                porcentaje = 66;
            } else if (condicionCumplida === 3) {
                mensaje = 'Contraseña media-fuerte';
                color = colores[temaActual].amarillo;
                porcentaje = 80;
            } else if (condicionCumplida === 4) {
                mensaje = 'Contraseña fuerte';
                color = colores[temaActual].verde;
                porcentaje = 100;
            }
        }

        pIndicadorPassword.textContent = mensaje;
        pIndicadorPassword.style.color = color;

        barraProgreso.style.width = `${porcentaje}%`;
        barraProgreso.style.backgroundColor = color;
    }

    function verificarPassword() {
        inputPassword.addEventListener('input', () => {
            let inputPasswordValue = inputPassword.value;
            let longitudPassword = inputPasswordValue.length;
            let condicionCumplida = 0;

            if (longitudPassword >= 8) {
                if (/[A-Z]/.test(inputPasswordValue)) {
                    condicionCumplida++;
                }

                if (/[a-z]/.test(inputPasswordValue)) {
                    condicionCumplida++;
                }

                if (/\d/.test(inputPasswordValue)) {
                    condicionCumplida++;
                }

                if (/[@#$%^&*]/.test(inputPasswordValue)) {
                    condicionCumplida++;
                }
            }

            actualizarIndicador(condicionCumplida, longitudPassword);
        });
    }

    botonTema.addEventListener('click', () => {
        setTimeout(() => {
            const inputPasswordValue = inputPassword.value;
            let longitudPassword = inputPasswordValue.length;
            let condicionCumplida = 0;

            if (longitudPassword >= 8) {
                if (/[A-Z]/.test(inputPasswordValue)) condicionCumplida++;
                if (/[a-z]/.test(inputPasswordValue)) condicionCumplida++;
                if (/\d/.test(inputPasswordValue)) condicionCumplida++;
                if (/[@#$%^&*]/.test(inputPasswordValue)) condicionCumplida++;
            }

            actualizarIndicador(condicionCumplida, longitudPassword);
        }, 10);
    });

    verificarPassword();
});
