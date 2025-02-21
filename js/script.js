document.addEventListener('DOMContentLoaded', () => {
    tema();
    /*---------------------DIV1------------------------*/

    function contadorDeClics() {
        const botonClics = document.querySelector('.boton-raton');
        const numeroDeClics = document.querySelector('#numero-clics');
        let clics = 0;
        botonClics.addEventListener('click', () => {
            console.log('picándole');
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
    /*---------------------------------------------*/
});
