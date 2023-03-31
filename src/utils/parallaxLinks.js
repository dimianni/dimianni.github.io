import { gsap } from "gsap";


let position = { x: 0, y: 0 };

export function callBtnParallax(e, parent) {
    parallaxBtn(e, parent, parent.querySelector(".link-span"), 25);
}

export function parallaxBtn(e, parent, target, movement) {
    var boundingRect = parent.getBoundingClientRect();
    var relX = e.pageX - boundingRect.left;
    var relY = e.pageY - boundingRect.top;

    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    gsap.to(target, 0.3, {
        x: (relX - boundingRect.width / 2) / boundingRect.width * movement,
        y: (relY - boundingRect.height / 2 - scrollTop) / boundingRect.height * movement,
        ease: 'power2.out'
    });
}

export function parallaxCursor(e, parent, movement) {
    var rect = parent.getBoundingClientRect();
    var relX = e.pageX - rect.left;
    var relY = e.pageY - rect.top;
    position.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
    position.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
}