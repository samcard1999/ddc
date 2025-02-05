gsap.registerPlugin(ScrollTrigger, CustomEase);
//HERO ANIMATION//
var hero = document.querySelector('.hero');
var logo = document.querySelector('.logosvg');
var heroLight = document.querySelector('.hero-light');
var heroXtra = document.querySelector('#heroeXtra');

ScrollTrigger.normalizeScroll(false);

/////////////s//////RUTAS///////////////////////////
document.getElementById('villaDonQuijote').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Don_Quixote.html';
});
document.getElementById('villaNelson').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Nelson252.html';
});
document.getElementById('villaAtlantico').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Atlantico.html';
});
document.getElementById('villaCartagena').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Cartagena.html';
});
document.getElementById('villaSantaMarta').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Santa_Marta.html';
});
document.getElementById('villaCiegodeAvila').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Ciego_de_Avila.html';
});
document.getElementById('villaBarranquilla').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Barranquilla.html';
});
document.getElementById('villaOasis').addEventListener('click', function() {
  window.location.href = '/projects/Villa_Oasis.html';
});

////////////////////RUTAS///////////////////////
hero.addEventListener('mousemove', logoMove);

function logoMove(e) {

const heroWidthSetter = hero.offsetWidth;

if (heroWidthSetter > 992) {
    var heroWidth = hero.offsetWidth;
    var heroHeight = hero.offsetHeight;
    var setBlur = 6;
    var opacitea = 1;
}

if (heroWidthSetter < 992 && heroWidthSetter > 768) {
    var heroWidth = hero.offsetWidth * 1.2;
    var heroHeight = hero.offsetHeight * 1.2;
    var setBlur = 4;
    var opacitea = .75;
}

if (heroWidthSetter < 768) {
    var heroWidth = (hero.offsetWidth * 1.3);
    var heroHeight = (hero.offsetHeight * 1.3);
    var setBlur = 4;
    var opacitea = .75;
}
const centerX = hero.offsetLeft + heroWidth / 2;
const centerY = hero.offsetTop + heroHeight / 2;
//
const heroMouseX = ((e.clientX - centerX) / 9 / heroWidth * 105).toFixed(1);
const heroMouseY = ((e.clientY - centerY) / 9 / heroHeight * 106).toFixed(1);
//
const heroMouseOpposeX = heroMouseX * -1;
const heroMouseOpposeY = heroMouseY * -1;

//const heroMouseXper = ((e.clientX - centerX)/6/heroWidth*1205).toFixed(0);
//const heroMouseYper = ((e.clientY - centerY)/6/heroHeight*1208).toFixed(0);

const heroMouseYper2 = ((e.clientY) / 20).toFixed(2);
const heroXtraX = (heroMouseX / 1).toFixed(2);

    ////////////////////////////////////////////

heroLight.style.transform = `translateX(${e.pageX}px) translateY(${e.pageY}px)`;
$('#lineargradient').attr('x1', heroXtraX);
$(heroXtra).attr('offset', heroMouseYper2 + '%');

    ////////////////////////////////////////////

this.querySelectorAll('.logosvg').forEach(logoSvg => {
logoSvg.style.filter = `drop-shadow(${heroMouseOpposeX}px ${heroMouseOpposeY}px ${3}px rgba(15, 30, 58, ${1})) drop-shadow(${heroMouseX}px ${heroMouseY}px ${3}px rgba(48, 68, 119, ${1}))`;
    });

}
//closeing logoMove
//END HERO ANIMATION//

// SECTIONs SCROLL TRANSITION MENU COLOR


// SECTIONs SCROLL TRANSITION
let iteration = 0; // gets iterated when we scroll all the way to the end or start and wraps around - allows us to smoothly continue the playhead scrubbing in the correct direction.
let activeIndex = -1;
const spacing = 0.1,
snap = gsap.utils.snap(spacing), // we'll use this to snap the playhead on the seamlessLoop
	cards = gsap.utils.toArray('.cards-projects li'),
  circles = gsap.utils.toArray('.circle'),
	seamlessLoop = buildSeamlessLoop(cards, spacing),
	scrub = gsap.to(seamlessLoop, { // we reuse this tween to smoothly scrub the playhead on the seamlessLoop
		totalTime: 0,
		duration: 0.5,
		ease: "power3",
		paused: true,
	});

var results = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7];

// Crear una línea de tiempo de GSAP
const timeline = gsap.timeline();

  ScrollTrigger.create({

  trigger: '.projects-gallery1',
  pin: '.projects-gallery1',
  start: 'top',
  end:
  () => {
    const isMobile = window.innerWidth <= 768;
    return isMobile ? '1250% top' : '550% top';
  },
  //markers: true,
  pinSpacing: true,
  scrub: true,
  overwrite: 'auto',
  onComplete: () => {
    // Refrescar todos los ScrollTrigger al finalizar la animación
    ScrollTrigger.refresh();
  },


  onUpdate(self) {

    if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
      wrapForward(self);
      console.log("gola");
    } else if (self.progress < 1e-5 && self.direction < 0 && !self.wrapping) {
      wrapBackward(self);
      console.log("gola2");
    } else {

      scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());

      scrub.invalidate().restart(); // to improve performance, we just invalidate and restart the same tween. No need for overwrites or creating a new tween on each update.
      self.wrapping = true;

    }


  },
});

function wrapForward(trigger) { // when the ScrollTrigger reaches the end, loop back to the beginning seamlessly
	iteration++;
	trigger.wrapping = true;
	trigger.scroll(trigger.start + 1);
}

function wrapBackward(trigger) { // when the ScrollTrigger reaches the start again (in reverse), loop back to the end seamlessly
	iteration--;
	if (iteration < 0) { // to keep the playhead from stopping at the beginning, we jump ahead 10 iterations
		iteration = 9;
		seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
    scrub.pause(); // otherwise it may update the totalTime right before the trigger updates, making the starting value different than what we just set above.
	}
	trigger.wrapping = true;
	trigger.scroll(trigger.end - 1);
}

function scrubTo(totalTime) { // moves the scroll position to the place that corresponds to the totalTime value of the seamlessLoop, and wraps if necessary.
	let progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();
	if (progress > 1) {
		wrapForward(trigger);
	} else if (progress < 0) {
		wrapBackward(trigger);
	} else {
		trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
	}
}

function buildSeamlessLoop(items, spacing) {
	let overlap = Math.ceil(1 / spacing), // number of EXTRA animations on either side of the start/end to accommodate the seamless looping
		startTime = items.length * spacing + 1.6, // the time on the rawSequence at which we'll start the seamless loop
		loopTime = (items.length + overlap) * spacing + 1, // the spot at the end where we loop back to the startTime
		rawSequence = gsap.timeline({paused: true}), // this is where all the "real" animations live
		seamlessLoop = gsap.timeline({ // this merely scrubs the playhead of the rawSequence so that it appears to seamlessly loop
			paused: true,
			repeat: false, // to accommodate infinite scrolling/looping

		}),
		l = items.length + overlap * 2,
		time = 0,
		i, index, item;

	// set initial state of items
	gsap.set(items, {xPercent: 400, opacity: 0,	scale: 0});

	// now loop through and create all the animations in a staggered fashion. Remember, we must create EXTRA animations at the end to accommodate the seamless looping.
	for (i = 0; i < l; i++) {
		index = i % items.length;
		item = items[index];
		time = i * spacing;
		rawSequence.fromTo(item, {scale: 0, opacity: 0}, {scale: 1, opacity: 1, zIndex: 100, duration: 0.5, yoyo: true, repeat: 1, ease: CustomEase.create("custom", "M0,0 C0,0.329 0.189,0.473 0.595,0.635 1.015,0.802 0.822,1 1,1 "), immediateRender: false}, time)
		           .fromTo(item, {xPercent: 400}, {xPercent: -400, duration: 1,  ease: "none", immediateRender: false}, time);
		i <= items.length && seamlessLoop.add("label" + i, time); // we don't really need these, but if you wanted to jump to key spots using labels, here ya go.
	}

	// here's where we set up the scrubbing of the playhead to make it appear seamless.
	rawSequence.time(startTime);
	seamlessLoop.to(rawSequence, {
		time: loopTime,
		duration: loopTime - startTime,
		ease: "none"
	}).fromTo(rawSequence, {time: overlap * spacing + 1}, {
		time: startTime,
		duration: startTime - (overlap * spacing + 1),
		immediateRender: false,
		ease: "none"
	});
	return seamlessLoop;
}


timeline.to('.choose-section',{
  scrollTrigger: {
  trigger: '.choose-section',
  start: 'top ',
  end: '600% top',
  scrub: true,
  pin: true,
  pinSpacing: true,
  //markers: true,
  overwrite: 'auto',
  onEnter: () => gsap.to("#menuToggle span", { backgroundColor: "#dcdfe2" }, duration = 0.5),
  onEnterBack: () => gsap.to("#menuToggle span", { backgroundColor: "#dcdfe2" }, duration = 0.5),
  onLeaveBack: () => gsap.to("#menuToggle span", { backgroundColor: "#070F1D" }, duration = 0.5),

  onComplete: () => {
    // Refrescar todos los ScrollTrigger al finalizar la animación
    ScrollTrigger.refresh();
  }
}
});


// Añadir el primer ScrollTrigger a la línea de tiempo
timeline.to('.card-test', {
  ease: "elastic.out(1,0.3)",
  scrollTrigger: {
    trigger: '.content',
    start: "-60% top",
    end: "top",
    scrub: true,
    //markers: true,
    onUpdate: (self) => {
      const progress = self.progress;
      gsap.to('.card-test', { opacity: 1 - progress * 0.65, overwrite: 'auto', ease: "elastic.out(1,0.3)" });
      gsap.to('.card-test', { y: `${progress * 200}px`, overwrite: 'auto',  });
      gsap.to('.card-test-2', { borderTopLeftRadius: `${3.125 - 3.125 * progress}vw`, borderTopRightRadius: `${3.125 - 3.125 * progress}vw`, overwrite: 'auto' });
    },
    onComplete: () => {
      // Refrescar todos los ScrollTrigger al finalizar la animación
      ScrollTrigger.refresh();
    }
  }
});

//advantage 1
timeline.to('.advantage-1', {
  scrollTrigger: {
  trigger: '.content',
  start:  'top', // Inicia la animación cada 300px
  end:  '140%', // Termina la animación después de 300px
  //markers: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const vh = window.innerHeight / 100;
    const startFade = 0.2; // 10% del progreso
    const endFade = 0.8; // 90% del progreso
    let opacity;

    if (progress < startFade) {
      opacity = progress / startFade;
    } else if (progress > endFade) {
      opacity = (1 - progress) / (1 - endFade);
    } else {
      opacity = 1;
    }
    gsap.to( '.advantage-1', {opacity: opacity,  overwrite: 'auto' });
  }
}
});

//advantage 2
timeline.to('.advantage-2', {
  scrollTrigger: {
  trigger: '.content',
  start:  '160%', // Inicia la animación cada 300px
  end:  '300%', // Termina la animación después de 300px
  //markers: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const vh = window.innerHeight / 100;
    const startFade = 0.2; // 10% del progreso
    const endFade = 0.8; // 90% del progreso
    let opacity;

    if (progress < startFade) {
      opacity = progress / startFade;
    } else if (progress > endFade) {
      opacity = (1 - progress) / (1 - endFade);
    } else {
      opacity = 1;
    }
    gsap.to( '.advantage-2', {opacity: opacity,  overwrite: 'auto' });
  }
}
});

//advantage 3
timeline.to('.advantage-3', {
  scrollTrigger: {
  trigger: '.content',
  start:  '320%', // Inicia la animación cada 300px
  end:  '460%', // Termina la animación después de 300px
  //markers: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const vh = window.innerHeight / 100;
    const startFade = 0.2; // 10% del progreso
    const endFade = 0.8; // 90% del progreso
    let opacity;

    if (progress < startFade) {
      opacity = progress / startFade;
    } else if (progress > endFade) {
      opacity = (1 - progress) / (1 - endFade);
    } else {
      opacity = 1;
    }
    gsap.to( '.advantage-3', {opacity: opacity,  overwrite: 'auto' });
  }
}
});

//advantage 4
timeline.to('.advantage-4', {
  scrollTrigger: {
  trigger: '.content',
  start:  '480%', // Inicia la animación cada 300px
  end:  '600%', // Termina la animación después de 300px
  //markers: true,
  onUpdate: (self) => {
    const progress = self.progress;
    const vh = window.innerHeight / 100;
    const startFade = 0.2; // 10% del progreso
    const endFade = 0.8; // 90% del progreso
    let opacity;

    if (progress < startFade) {
      opacity = progress / startFade;
    } else if (progress > endFade) {
      opacity = (1 - progress) / (1 - endFade);
    } else {
      opacity = 1;
    }
    gsap.to( '.advantage-4', {opacity: opacity,  overwrite: 'auto' });
  }
}
});


function handleOrientationChange() {
  window.location.reload();
  window.scrollTo({ top: 0, behavior: 'smooth' });

}
// Escuchar el evento de cambio de orientación
window.addEventListener('orientationchange', handleOrientationChange);


const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on('scroll', ScrollTrigger.update);

// Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
// This ensures Lenis's smooth scroll animation updates on each GSAP tick

gsap.ticker.add((time) => {
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});

// Disable lag smoothing in GSAP to prevent any delay in scroll animations
gsap.ticker.lagSmoothing(0);


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
        return value;
}

