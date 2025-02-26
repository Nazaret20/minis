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
    relojDigital();
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
        document.documentElement.dataset.tema = temaGuardado;
        iconoTema.src = temaGuardado === 'dark' ? darkModeSVG : lightModeSVG;

        if (temaGuardado === 'light') {
            botonTema.classList.add('pulsado');
        }

        botonTema.addEventListener('click', () => {
            body.classList.toggle('light');
            body.classList.toggle('dark');
            botonTema.classList.toggle('pulsado');

            let nuevoTema = body.classList.contains('light') ? 'light' : 'dark';
            document.documentElement.dataset.tema = nuevoTema;
            iconoTema.src = nuevoTema === 'light' ? lightModeSVG : darkModeSVG;
            localStorage.setItem('temas', nuevoTema);
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
            // Campo vacío
            mensaje = 'Introduce contraseña';
            porcentaje = 0;
        } else if (longitudPassword < 8) {
            // Menos de 8 caracteres - contraseña muy débil
            mensaje = 'Contraseña muy débil';
            color = colores[temaActual].rojo;
            // Calculamos el porcentaje según cuántos caracteres ha escrito (máx 30% hasta llegar a 8)
            porcentaje = Math.min(30, (longitudPassword / 8) * 30);
        } else {
            // 8 o más caracteres, evaluamos la fuerza
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

        // ⬇️ Aplicar cambios a la barra correctamente ⬇️
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
