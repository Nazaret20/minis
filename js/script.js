document.addEventListener('DOMContentLoaded', () => {
    tema();
    /*---------------------DIV1------------------------*/

    function contadorDeClics() {
        const botonClics = document.querySelector('.boton-raton');
        const numeroDeClics = document.querySelector('#numero-clics');
        let clics = 0;
        botonClics.addEventListener('click', () => {
            clics++;
            numeroDeClics.textContent = clics;
        });
    }
    contadorDeClics();
    /*--------------------DIV2-------------------------*/

    function relojDigital() {
        const relojP = document.querySelector('#reloj');
        let fecha = new Date();
        let hora = fecha.getHours();
        let minutos = fecha.getMinutes();
        let segundos = fecha.getSeconds();

        if (minutos < 10) {
            minutos = '0' + minutos;
        }
        if (segundos < 10) {
            segundos = '0' + segundos;
        }

        relojP.textContent = `${hora}:${minutos}:${segundos}`;
    }
    setInterval(relojDigital, 1000);
    /*---------------------DIV3------------------------*/

    function tema() {
        const botonTema = document.querySelector('.boton-tema');
        const iconoTema = botonTema.querySelector('img');
        const body = document.body;
        let temaGuardado = localStorage.getItem('temas');

        const darkModeSVG = './assets/svg/dark.svg';
        const lightModeSVG = './assets/svg/light.svg';

        if (!temaGuardado) {
            temaGuardado = 'dark';
            localStorage.setItem('temas', 'dark');
        }

        body.classList.add(temaGuardado);
        iconoTema.src = temaGuardado === 'dark' ? darkModeSVG : lightModeSVG;

        if (temaGuardado === 'light') {
            botonTema.classList.add('pulsado');
        }

        botonTema.addEventListener('click', () => {
            body.classList.toggle('light');
            body.classList.toggle('dark');
            botonTema.classList.toggle('pulsado');

            if (body.classList.contains('light')) {
                iconoTema.src = lightModeSVG;
                localStorage.setItem('temas', 'light');
            } else {
                iconoTema.src = darkModeSVG;
                localStorage.setItem('temas', 'dark');
            }
        });
    }
    /*--------------------DIV4-------------------------*/

    function coloresAleatorios() {
        const botonColores = document.querySelector('.boton-colores');
        const divColor = document.querySelector('.div-colores');
        const pNumeroColor = document.querySelector('.numero-color');

        botonColores.addEventListener('click', () => {
            let numeroR = Math.floor(Math.random() * 255)
                .toString(16)
                .padStart(2, '0');
            let numeroG = Math.floor(Math.random() * 255)
                .toString(16)
                .padStart(2, '0');
            let numeroB = Math.floor(Math.random() * 255)
                .toString(16)
                .padStart(2, '0');

            let aleatorioRGB = `#${numeroR}${numeroG}${numeroB}`;
            pNumeroColor.textContent = aleatorioRGB;
            divColor.style.backgroundColor = aleatorioRGB;

            tippy('.numero-color', {
                content: '¡Cópiame!',
                animation: 'fade',
                theme: 'tippy',
            });
        });

        pNumeroColor.addEventListener('click', () => {
            navigator.clipboard.writeText(pNumeroColor.textContent).then(() => {
                let colorOriginal = pNumeroColor.textContent;
                pNumeroColor.textContent = '¡Color copiado!';

                setTimeout(() => {
                    pNumeroColor.textContent = colorOriginal;
                }, 1000);
            });
        });
    }
    coloresAleatorios();
    /*--------------------DIV5-------------------------*/

    function generarCita() {
        const botonCitas = document.querySelector('.boton-citas');
        const pCitas = document.querySelector('.p-citas');

        const citas = [
            {
                cita: '"La vida es lo que sucede mientras estás ocupado haciendo otros planes."',
                autor: 'John Lennon',
                haSalido: false,
            },
            {
                cita: '"El éxito es aprender a ir de fracaso en fracaso sin desesperarse."',
                autor: 'Winston Churchill',
                haSalido: false,
            },
            {
                cita: '"Haz de tu vida un sueño, y de tu sueño una realidad."',
                autor: 'Antoine de Saint-Exupéry',
                haSalido: false,
            },
            {
                cita: 'No cuentes los días, haz que los días cuenten.',
                autor: 'Muhammad Ali',
                haSalido: false,
            },
            {
                cita: '"No tengas miedo de renunciar a lo bueno para ir por lo grandioso."',
                autor: 'John D. Rockefeller',
                haSalido: false,
            },
            {
                cita: '"No encontrarás nunca un arcoíris si siempre estás mirando hacia abajo."',
                autor: 'Charlie Chaplin',
                haSalido: false,
            },
            {
                cita: '"No esperes. El tiempo nunca será el justo."',
                autor: 'Napoleón Hill',
                haSalido: false,
            },
            {
                cita: '"Todo parece imposible hasta que se hace."',
                autor: 'Nelson Mandela',
                haSalido: false,
            },
            {
                cita: '"La lógica te llevará de A a B. La imaginación te llevará a cualquier lugar."',
                autor: ' Albert Einstein',
                haSalido: false,
            },
            {
                cita: '"El mayor error que puedes cometer en la vida es tener miedo de cometer errores."',
                autor: 'Elbert Hubbard',
                haSalido: false,
            },
        ];

        botonCitas.addEventListener('click', () => {
            let numeroRandom;
            let contador = 0;

            for (let i = 0; i < citas.length; i++) {
                if (citas[i].haSalido === true) {
                    contador++;
                }
            }

            let hanSalidoTodas = contador === citas.length;
            if (hanSalidoTodas) {
                for (let i = 0; i < citas.length; i++) {
                    citas[i].haSalido = false;
                }
            }

            do {
                numeroRandom = Math.floor(Math.random() * citas.length);
            } while (citas[numeroRandom].haSalido === true);

            citas[numeroRandom].haSalido = true;

            pCitas.innerHTML = `<em>${citas[numeroRandom].cita}</em> - ${citas[numeroRandom].autor}`;
        });
    }
    generarCita();
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

    function verificarPassword() {
        inputPassword.addEventListener('input', () => {
            let inputPasswordValue = inputPassword.value;
            console.log(inputPasswordValue);

            let condicionCumplida = 0;

            if (inputPasswordValue.length < 8) {
                pIndicadorPassword.textContent = 'Introduce contraseña';
            }

            if (/[A-Z]/.test(inputPasswordValue)) {
                condicionCumplida++;
                pIndicadorPassword.textContent = 'Contraseña débil';
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

            if (condicionCumplida === 1) {
                pIndicadorPassword.textContent = 'Contraseña débil';
                pIndicadorPassword.style.color = '#ff7575';
            }

            if (condicionCumplida === 2 || condicionCumplida === 3) {
                pIndicadorPassword.textContent = 'Contraseña media';
                pIndicadorPassword.style.color = '#ffed75';
            }

            if (condicionCumplida === 4) {
                pIndicadorPassword.textContent = 'Contraseña fuerte';
                pIndicadorPassword.style.color = '#7cee7c';
            }
        });
    }
    verificarPassword();
});
