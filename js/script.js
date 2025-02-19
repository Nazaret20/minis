document.addEventListener('DOMContentLoaded', () => {
    tema();

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

    function tema() {
        const botonTema = document.querySelector('.boton-tema');
        const iconoTema = botonTema.querySelector('img');
        const body = document.body;
        let temaGuardado = localStorage.getItem('temas');
    
        const darkModeSVG = "./assets/svg/dark.svg";
        const lightModeSVG = "./assets/svg/light.svg";
    
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
    
});
