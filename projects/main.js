gsap.registerPlugin(ScrollTrigger);

document.getElementById('boton_atras').addEventListener('click', function () {
        window.history.back();
});

var main = document.querySelector('.main');
var imgContainer = document.querySelector('.img-container');
var flexImages = document.querySelectorAll('.flex-images');
var img = document.getElementById("gallery-img");
var img2 = document.getElementById("gallery-img-2");
const timeline = gsap.timeline();

timeline.to(main, {
        scrollTrigger: {
                trigger: main,
                start: ' top top ',
                end: () => '+=450% ',
                scrub: true,
                pin: true,
                //pinSpacing: true,
                //markers: true,
                invalidateOnRefresh: true,
                overwrite: 'auto',
                onComplete: () => {
                        // Refrescar todos los ScrollTrigger al finalizar la animación
                        ScrollTrigger.refresh();
                        
                }
        }
});

var totalGap = 2.5 * document.querySelectorAll('.img-container').length;
var bgImage = 1;
var bgImageTemp = bgImage;
var results = [0];
var distance = 0;
var distanceVw = 0;

function changeImage(newSrc) {
        // Establecer el src de la imagen oculta
        img2.src = newSrc;
    
        // Esperar a que la nueva imagen se cargue completamente
        img2.onload = function() {
            // Añadir clase visible a la nueva imagen y clase hidden a la imagen actual
            img.classList.remove('visible');
            img.classList.add('hidden');
            img2.classList.remove('hidden');
            img2.classList.add('visible');
                
            // Intercambiar las referencias de las imágenes
            var temp = img;
            img = img2;
            img2 = temp;
        };
    }

distance = parseFloat(imgContainer.offsetWidth.toFixed(1)) * document.querySelectorAll('.img-container').length;
distanceVw = (distance / window.innerWidth) * 100;
results = [0];
for (let i = 0; i < document.querySelectorAll('.img-container').length - 1; i++) {
        results.push(((distanceVw + totalGap) / document.querySelectorAll('.img-container').length) * (i + 1));
}

function recalculateValues() {
        distance = parseFloat(imgContainer.offsetWidth.toFixed(1)) * document.querySelectorAll('.img-container').length;
        distanceVw = (distance / window.innerWidth) * 100;
        results = [0];
        for (let i = 0; i < document.querySelectorAll('.img-container').length - 1; i++) {
                results.push(((distanceVw + totalGap) / document.querySelectorAll('.img-container').length) * (i + 1));
        }
        console.log('Recalculated values:', { distance, distanceVw, results });
}

// Debounce function to limit the rate at which a function can fire
function debounce(func, wait) {
        let timeout;
        return function () {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, arguments), wait);
        };
}

window.addEventListener('resize', debounce(recalculateValues, 400));


document.querySelectorAll('.img-container').forEach((element, index) => {
        timeline.to(element, {
                scrollTrigger: {
                        trigger: '.project-container',
                        start: 'top', // Inicia la animación cada 300px
                        end: '550%', // Termina la animación después de 300px
                        //markers: true,
                        onUpdate: (self) => {
                                const progress = self.progress;

                                gsap.to(element, { x: `${-closestValue((distanceVw + totalGap) * progress, results)}vw`, overwrite: 'auto' });
                                gsap.to(element, { borderWidth: `${3 * progress}rem`, borderColor: 'black', overwrite: 'auto', });

                        }
                }
        });
});

const handler = {
        set: function (target, property, value) {

                if (value !== bgImageTemp) {
                        changeImage(`../assets/Don_Quijote/1_${value}.jpg`);
                        bgImageTemp = value;
                }

                target[property] = value;
                return true;
        }
};
const observedBgImage = new Proxy({ bgImage }, handler);


function closestValue(v, array) {
        var value,
                lastDelta;

        array.some(function (a) {
                var delta = Math.abs(v - a);
                if (delta >= lastDelta) {
                        return true;
                }
                value = a;
                lastDelta = delta;
        });

        observedBgImage.bgImage = array.indexOf(value) + 1;
        return value;
}

function handleOrientationChange() {
        window.location.reload();
        window.scrollTo(0, 0);
        
      }
      // Escuchar el evento de cambio de orientación
      window.addEventListener('orientationchange', handleOrientationChange);
      