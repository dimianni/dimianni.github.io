import { windowWidth, isDesktop } from './utils'

/*-------------------------------------------------------------------------------------------------------------------------------------*/
/*	START Center Circle
---------------------------------------------------------------------------------------------------------------------------------------*/

class Mouse {
    constructor(bigcanvas) {
        this.x = 100;
        this.y = 100;

        bigcanvas.onmousemove = e => {
            this.x = e.pageX - bigcanvas.offsetLeft;
            this.y = e.pageY - bigcanvas.offsetTop;
        }
    }
}


class Ball {
    constructor(x, y, radius, color) {
        this.x = x || 0;
        this.y = y || 0;

        // Изначальные координаты

        this.origX = x || 0;
        this.origY = y || 0;

        // Скорость (вектор)
        this.vx = 0;
        this.vy = 0;

        // Сила трения чтобы шарик останавливался
        this.friction = 0.9;

        this.springFactor = 0.05;

        this.radius = radius || 10;
        this.color = color || "#212529";
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    think(mouse) {
        // Расстояние между центром мишки и центром шарика
        let dx = this.x - mouse.x;
        let dy = this.y - mouse.y;

        // Теорема Пифагора -- C равно корень из A кадрат плюс B кадрат
        let dist = Math.sqrt(dx * dx + dy * dy);

        // Interaction
        // Compared to radius
        if (dist < 30) {

            let angle = Math.atan2(dy, dx);

            let tx = mouse.x + Math.cos(angle) * 30;
            let ty = mouse.y + Math.sin(angle) * 30;

            this.vx += tx - this.x;
            this.vy += ty - this.y;
            // console.log('yeeees')
        }

        // friction
        // При каждом фрейме скорость будет падать
        this.vx *= this.friction;
        this.vy *= this.friction;


        // Spring back
        let dx1 = -(this.x - this.origX);
        let dy1 = -(this.y - this.origY);

        this.vx += dx1 * this.springFactor;
        this.vy += dy1 * this.springFactor;

        // Actual movement
        // При каждом фрейме добавляеться что то к координатам обьекта (скорость)
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctxla) {
        ctxla.save();
        ctxla.beginPath();

        ctxla.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

        ctxla.fillStyle = this.color;
        ctxla.fill();

        ctxla.closePath();
        ctxla.restore();
    }

}

const cucircle = document.getElementById('cucircle');
const cucircleCTX = cucircle.getContext('2d');

const scircle = document.getElementById('scircle');
const scircleCTX = scircle.getContext('2d');

let c = cucircleCTX.canvas,
    s = scircleCTX.canvas;

if (windowWidth < 768) {
    c.width = (400 / 1200) * windowWidth;
    c.height = (400 / 1200) * windowWidth;

    s.width = (400 / 1200) * windowWidth;
    s.height = (400 / 1200) * windowWidth;

} else if (windowWidth < 1200) {

    c.width = (400 / 1200) * windowWidth;
    c.height = (400 / 1200) * windowWidth;

    s.width = (300 / 1200) * windowWidth;
    s.height = (300 / 1200) * windowWidth;

} else {

    c.width = (350 / 1200) * windowWidth;
    c.height = (350 / 1200) * windowWidth;

    s.width = (210 / 1200) * windowWidth;
    s.height = (210 / 1200) * windowWidth;
}



let contactMouse = new Ball(0, 0, 30, 'transparent');

let contactMousePositions = [];


let cucirclePOS = new Mouse(cucircle);
let scirclePOS = new Mouse(scircle);

contactMousePositions.push(cucirclePOS, scirclePOS)


let cucircleBALLS = [];
let scircleBALLS = [];


for (let i = 0; i < 20; i++) {

    if (windowWidth < 768) {
        cucircleBALLS.push(
            new Ball(
                c.width * 0.5 + ((400 / 1200) * windowWidth) / 2 * Math.cos(i * 2 * Math.PI / 20),
                c.height * 0.5 + ((400 / 1200) * windowWidth) / 2 * Math.sin(i * 2 * Math.PI / 20),
            )
        )
        scircleBALLS.push(
            new Ball(
                s.width * 0.5 + ((400 / 1200) * windowWidth) / 2 * Math.cos(i * 2 * Math.PI / 20),
                s.height * 0.5 + ((400 / 1200) * windowWidth) / 2 * Math.sin(i * 2 * Math.PI / 20),
            )
        )
    } else if (windowWidth < 1200) {
        cucircleBALLS.push(
            new Ball(
                c.width * 0.5 + ((350 / 1200) * windowWidth) / 2 * Math.cos(i * 2 * Math.PI / 20),
                c.height * 0.5 + ((350 / 1200) * windowWidth) / 2 * Math.sin(i * 2 * Math.PI / 20),
            )
        )
        scircleBALLS.push(
            new Ball(
                s.width * 0.5 + ((250 / 1200) * windowWidth) / 2 * Math.cos(i * 2 * Math.PI / 20),
                s.height * 0.5 + ((250 / 1200) * windowWidth) / 2 * Math.sin(i * 2 * Math.PI / 20),
            )
        )
    } else {
        cucircleBALLS.push(
            new Ball(
                c.width * 0.5 + ((250 / 1200) * windowWidth) / 2 * Math.cos(i * 2 * Math.PI / 20),
                c.height * 0.5 + ((250 / 1200) * windowWidth) / 2 * Math.sin(i * 2 * Math.PI / 20),
            )
        )
        scircleBALLS.push(
            new Ball(
                s.width * 0.5 + ((150 / 1200) * windowWidth) / 2 * Math.cos(i * 2 * Math.PI / 20),
                s.height * 0.5 + ((150 / 1200) * windowWidth) / 2 * Math.sin(i * 2 * Math.PI / 20),
            )
        )
    }

}



let formSphereCU = function (balls) {
    cucircleCTX.beginPath();

    for (var i = 0, jlen = balls.length; i <= jlen; ++i) {
        var p0 = balls[i + 0 >= jlen ? i + 0 - jlen : i + 0];
        var p1 = balls[i + 1 >= jlen ? i + 1 - jlen : i + 1];
        cucircleCTX.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
    }

    cucircleCTX.closePath();
    cucircleCTX.fillStyle = "#ffa63d";
    cucircleCTX.fill();
}

let formSphereS = function (balls) {
    scircleCTX.beginPath();

    for (var i = 0, jlen = balls.length; i <= jlen; ++i) {
        var p0 = balls[i + 0 >= jlen ? i + 0 - jlen : i + 0];
        var p1 = balls[i + 1 >= jlen ? i + 1 - jlen : i + 1];
        scircleCTX.quadraticCurveTo(p0.x, p0.y, (p0.x + p1.x) * 0.5, (p0.y + p1.y) * 0.5);
    }

    scircleCTX.closePath();
    scircleCTX.fillStyle = "#ffa63d";
    scircleCTX.fill();
}

//Вызываеться бесконечно
let RenderContactPage = function () {
    window.requestAnimationFrame(RenderContactPage);

    contactMousePositions.forEach((mousePosition) => {
        contactMouse.setPos(mousePosition.x, mousePosition.y);
    });

    cucircleCTX.clearRect(0, 0, cucircleCTX.canvas.width, cucircleCTX.canvas.height);
    scircleCTX.clearRect(0, 0, scircleCTX.canvas.width, scircleCTX.canvas.height);
    contactMouse.draw(cucircleCTX)
    contactMouse.draw(scircleCTX)


    cucircleBALLS.forEach(ball => {
        ball.think(cucirclePOS)
    });

    scircleBALLS.forEach(ball => {
        ball.think(scirclePOS)
    });

    formSphereCU(cucircleBALLS)
    formSphereS(scircleBALLS)
}

RenderContactPage();


