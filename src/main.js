import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(ScrollTrigger, Draggable);

import './hero'
import { windowWidth, isDesktop } from './utils'



export function appInit() {

    const cursor = document.getElementById("cursor");
    const cursorPoint = cursor.querySelector(".cursor-point")
    const cursorBorder = cursor.querySelector(".cursor-border")

    function initCursor() {

        const cursor = document.getElementById('cursor');

        // Initial position
        let xPos = -100;
        let yPos = -100;

        // Getting x & y values;
        document.addEventListener('mousemove', function (e) {
            xPos = e.clientX
            yPos = e.clientY
        })

        function render() {
            gsap.set(cursor, {
                x: xPos,
                y: yPos
            })
            requestAnimationFrame(render)
        }
        render()
    }

    initCursor()

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Smooth Scroll 
    --------------------------------------------------------------------------------------------------------------------*/

    const smoothLinks = document.querySelectorAll('.smoothScroll');

    smoothLinks.forEach(smoothLink => {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();

            const id = this.hash.replace('#', '');

            scrollTo(id)
        })
    })

    function scrollTo(id) {

        const element = document.getElementById(id)

        const scroll = element.offsetTop

        window.scrollTo({
            top: scroll,
            behavior: 'smooth'
        })

    }


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Viewport notification
    --------------------------------------------------------------------------------------------------------------------*/

    const deviceOutline = document.querySelector('.vpnotification-wrapper__device-outline');

    const vpnotification = gsap.timeline({
        repeat: -1,
    }).from(deviceOutline, {
        opacity: 0,
        delay: 0.5,
        duration: 1
    }).to(deviceOutline, {
        transform: "rotate(90deg)",
        delay: 0.5,
        duration: 2
    }).to(deviceOutline, {
        opacity: 0,
        duration: 1
    })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Loading Animation
    --------------------------------------------------------------------------------------------------------------------*/


    const uncoverAnim = gsap.timeline()
        .to('.hero-wrapper__hey-name--h2_son', {
            transform: "translateY(0)",
            duration: 1
        }, 'together')
        .to('.hero-wrapper__hey-who--h2_son', {
            transform: "translateY(0)",
            duration: 1
        }, 'together')
        .from('.hero-wrapper__hey-pic', {
            transform: "translateY(11vw)",
            opacity: 0,
            duration: 1
        }, 'together')

    /*------------------------------------------------------------------------------------------------------------------*/
    /* Link & Link span animation
    --------------------------------------------------------------------------------------------------------------------*/

    let position = { x: 0, y: 0 };
    let active = false;

    const parallaxLinks = document.querySelectorAll('.link');

    parallaxLinks.forEach(parallaxLink => {

        parallaxLink.addEventListener('mouseenter', function () {
            gsap.to(cursor, 0.1, {
                scale: 1.5,
                ease: 'circ.out'
            });
            gsap.to(cursorPoint, 0.1, {
                opacity: 0,
                ease: 'circ.out'
            }, '-=0.1');
            active = true;
        })

        parallaxLink.addEventListener('mouseleave', function (e) {
            gsap.to(cursor, 0.1, {
                scale: 1,
                ease: 'circ.out'
            });
            gsap.to(cursorPoint, 0.1, {
                opacity: 1,
                ease: 'circ.out'
            }, '-=0.1');
            gsap.to(this.querySelector(".link-span"), 0.3, { x: 0, y: 0 });
            active = false;
        })

        parallaxLink.addEventListener('mousemove', function (e) {
            parallaxCursor(e, this, 10);
            callBtnParallax(e, this);
        })

    })


    function callBtnParallax(e, parent) {
        parallaxBtn(e, parent, parent.querySelector(".link-span"), 25);
    }

    function parallaxBtn(e, parent, target, movement) {
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

    function parallaxCursor(e, parent, movement) {
        var rect = parent.getBoundingClientRect();
        var relX = e.pageX - rect.left;
        var relY = e.pageY - rect.top;
        position.x = rect.left + rect.width / 2 + (relX - rect.width / 2) / movement;
        position.y = rect.top + rect.height / 2 + (relY - rect.height / 2) / movement;
        gsap.to(cursor, 0.3, { x: position.x, y: position.y });
    }

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Hide logo on scroll from top
    --------------------------------------------------------------------------------------------------------------------*/

    const logoD = document.querySelector('.header-wrapper__logo-d')
    const logoN = document.querySelector('.header-wrapper__logo-n')
    const logoH = logoD.offsetHeight

    const animlogo = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: 1,
            toggleActions: "play none none reverse",
        }
    })
        .to(logoN, 0.35, {
            y: -logoH
        }, 'together')
        .to(logoD, 0.35, {
            y: -logoH
        }, 'together')


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Face Change
    --------------------------------------------------------------------------------------------------------------------*/

    const duomeHero = ['images/duome_1.png', 'images/duome_2.png', 'images/duome_3.png', 'images/duome_4.png', 'images/duome_5.png', 'images/duome_6.png', 'images/duome_7.png'];
    const imgElement = document.querySelector('.hero-wrapper__hey-pic--duo img');

    const duomeFacts = ['images/duome_facts1.png', 'images/duome_facts2.png', 'images/duome_facts3.png', 'images/duome_facts4.png'];
    const factImgCont = document.querySelector('.about-wrapper__tap-img img');

    let indexDuomeHero = 0;
    let indexDuomeFacts = 0;

    function change() {
        imgElement.src = duomeHero[indexDuomeHero];
        indexDuomeHero > 5 ? indexDuomeHero = 0 : indexDuomeHero++;

        factImgCont.src = duomeFacts[indexDuomeFacts];
        indexDuomeFacts > 2 ? indexDuomeFacts = 0 : indexDuomeFacts++;
    }

    setInterval(change, 1000);



    const tapFacts = document.querySelector('.about-wrapper__tap')
    const myFacts = ['At the moment, I am based in Málaga, Spain.', 'I am a junior at Northern State University studying Management Information Systems.', 'I speak four languages: Ukrainian, Russian, English and Spanish.', 'I enjoy surfing and snowboarding.', 'Discovering new features in web is my passion. Currently, I am learning Canvas and WebGL to create wow animations.', '<span class="about-wrapper__tap-wds--1_h">Thank you for your interest!</span>']
    let indexFacts = 0;

    tapFacts.addEventListener('click', function () {
        document.querySelector('.about-wrapper__tap-wds').innerText = myFacts[indexFacts]
        indexFacts > 4 ? indexFacts == 5 : indexFacts++;
    })

    if (!isDesktop) {
        document.querySelector('.about-wrapper__tap-wds--1_h').innerText = 'Tap here'
    }

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Hero Image On Scroll
    --------------------------------------------------------------------------------------------------------------------*/

    const myHeroImg = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            scrub: 0.6,
        }
    })
        .to(".hero-wrapper__hey-pic", {
            transform: "translateY(-20vw)"
        })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Intro Scroll Animation && emoji on hover
    --------------------------------------------------------------------------------------------------------------------*/

    const introParts = document.querySelectorAll(".intro-wrapper__main-emoji")

    introParts.forEach((el) => {
        // Intro Scroll Animation
        const introAnim = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom bottom-=100",
                scrub: 0.6
            }
        }).from(el, {
            opacity: 0,
            duration: 0.5,
            ease: 'power1.out'
        })


        // Emoji on hover
        if (isDesktop) {
            const image = el.querySelector('.emoji')

            el.addEventListener('mouseenter', function (e) {
                gsap.to(cursor, 0.1, { autoAlpha: 0 })
                gsap.to(image, 0.1, { autoAlpha: 1 })

                let clientX = e.clientX;
                let clientY = e.clientY;

                const render = () => {
                    gsap.set(image, {
                        left: clientX,
                        top: clientY
                    });
                    // requestAnimationFrame(render);
                };
                render();
            })

            el.addEventListener('mouseleave', function () {
                gsap.to(cursor, 0.1, { autoAlpha: 1 })
                gsap.to(image, 0.1, { autoAlpha: 0 })
            })

            el.addEventListener('mousemove', function (e) {
                let clientX = e.clientX;
                let clientY = e.clientY;

                const render = () => {
                    gsap.set(image, {
                        left: clientX,
                        top: clientY
                    });
                    // requestAnimationFrame(render);
                };
                render();
            })
        }
    })


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Intro words animation
    --------------------------------------------------------------------------------------------------------------------*/

    const introWds = document.querySelectorAll('.intro-wrapper__main-suptitle--1_part')

    introWds.forEach((el) => {
        const introWdsAnim = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "bottom bottom-=100",
                toggleActions: "play none none reverse",
            }
        }).to(el, {
            opacity: 1,
            duration: 0.5,
            ease: 'power1.out'
        })
    })



    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Keep on scrolling
    --------------------------------------------------------------------------------------------------------------------*/

    const keepOn = document.querySelector('.intro-anim');

    const rotate = gsap.timeline({
        scrollTrigger: {
            trigger: keepOn,
            scrub: 0.2,
            start: 'top bottom',
            end: '+=10000',
        }
    }).to(keepOn, {
        rotation: 360 * 5,
        duration: 1,
        ease: 'none'
    })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Section titles animations
    --------------------------------------------------------------------------------------------------------------------*/

    const secTitle = document.querySelectorAll('.sectitle')

    secTitle.forEach(el => {

        const lineAnim = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: "bottom bottom-=100",
            }
        })
            .from(el.querySelector('.secline'), {
                width: 0,
                duration: 0.5
            }, 'together')
            .to(el.querySelector(".sectitleSon"), {
                transform: "translateY(0)",
                duration: 1
            }, 'together')
    })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Welcome circles
    --------------------------------------------------------------------------------------------------------------------*/

    const welcomeW = document.querySelectorAll('.works-wrapper__content-el--welcome');

    welcomeW.forEach(el => {

        const ww = gsap.timeline({ paused: true });

        ww.to(el.querySelector(".works-wrapper__content-el--welcome_appear"), {
            width: '100%',
            height: '100%',
            duration: 0.35
        })
        ww.to(el.querySelector(".works-wrapper__content-el--welcome_appear-span"), {
            opacity: 1,
            duration: 0.35
        })

        const wwreverse = function () {
            ww.reverse()
        }

        if (!isDesktop) {
            el.addEventListener('click', function () {
                ww.play()

                ww.eventCallback("onComplete", function () {
                    ww.add(wwreverse, "+=1")
                })
            })
        } else {
            el.addEventListener('mouseenter', function () {
                ww.play()
            })
            el.addEventListener('mouseleave', function () {
                ww.reverse()
            })
        }
    })


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Works easing animation
    --------------------------------------------------------------------------------------------------------------------*/

    const theWorks = document.querySelectorAll('.works-wrapper__content-el--top');

    theWorks.forEach(el => {
        const easing = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                scrub: 0.6,
                start: "top bottom",
                end: "top top",
                scrub: 1
            }
        }).to(el, {
            top: '0'
        }, "start")
    })


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Works hover animation
    --------------------------------------------------------------------------------------------------------------------*/

    const workNew = document.querySelectorAll('.works-wrapper__content-el--cont')

    workNew.forEach(el => {

        const workImg = el.querySelector('.works-wrapper__content-el--top')

        const workImgInner = el.querySelector('.works-wrapper__content-el--top_img')

        const workTitle = el.querySelector('.works-wrapper__content-el--top_title')

        const workTitleSpan = el.querySelectorAll('.works-wrapper__content-el--top_title span')


        if (!isDesktop) {

            const workMobAnim = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=150px",
                    toggleActions: "play none none reverse"
                }
            })
                .to(workImg, {
                    transform: 'scaleY(1.1)',
                    duration: 0.35
                }, 'together')
                .to(workTitle, {
                    left: 0,
                    duration: 0.35
                }, 'together')
                .to(workImgInner, {
                    transform: 'scaleY(0.9) scale3d(1, 1, 1)',
                    duration: 0.35
                }, 'together')
                .to(workTitleSpan, {
                    color: '#fff',
                    stagger: 0.05,
                    duration: 0.2
                }, 'together')


        } else {
            const workNewAnim = gsap.timeline({
                paused: true
            })
                .to(workImg, {
                    transform: 'scaleY(1.1)',
                    duration: 0.35
                }, 'together')
                .to(workTitle, {
                    left: 0,
                    duration: 0.35
                }, 'together')
                .to(workImgInner, {
                    transform: 'scaleY(0.9) scale3d(1, 1, 1)',
                    duration: 0.35
                }, 'together')
                .to(workTitleSpan, {
                    color: '#fff',
                    stagger: 0.05,
                    duration: 0.2
                }, 'together')

            el.addEventListener('mouseover', function () {
                workNewAnim.play()
            })
            el.addEventListener('mouseleave', function () {
                workNewAnim.reverse()
            })
        }
    })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Contact form validation
    --------------------------------------------------------------------------------------------------------------------*/
    const form = document.getElementById("contactForm"),
        contactName = document.getElementById('contactName'),
        contactEmail = document.getElementById('contactEmail'),
        messageSuccess = document.getElementById('message-success'),
        messageWarning = document.getElementById('message-warning'),
        contactHello = document.querySelector('.contactForm__hello');

    form.addEventListener('submit', function (e) {

        e.preventDefault()

        const formData = new FormData(this)

        fetch('https://dimianni.com/inc/sendEmail.php', {
            method: 'POST',
            body: formData
        }).then(function (response) {

            return response.text()

        }).then(function (data) {

            console.log(this);

            // Message was sent
            if (data == 'OK') {

                contactName.classList.remove('error');
                contactEmail.classList.remove('error');

                document.getElementById('contactForm').style.display = 'none'
                contactHello.style.display = 'none'
                messageSuccess.style.display = 'block'

                // const scriptURL = 'https://script.google.com/macros/s/AKfycbwl5Wxd6AB3miyPUQqMBzk3nuC4uBIdasU_lqO7jss1qpmnmtWxQymqYA/exec'
                // const form = document.getElementById('contactForm')
                // fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            }

            if (data.includes("Name")) {
                contactName.classList.add('error');
            } else {
                contactName.classList.remove('error');
            }

            if (data.includes("Email")) {
                contactEmail.classList.add('error');
            } else {
                contactEmail.classList.remove('error');
            }

        }).catch(function (error) {

            console.warn(error);

            messageWarning.innerHTML("Упс...что-то пошло не так :( <br> Попробуйте перезагрузить страницу.");
            document.getElementById('contactForm').style.display = 'none';
            messageWarning.style.display = 'block';
        });
    })


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	My background animations
    --------------------------------------------------------------------------------------------------------------------*/

    if (isDesktop) {

        const allSteps = document.querySelectorAll(".about-wrapper__background-right--el")

        allSteps.forEach(step => {

            const stepsHoverAnim = gsap.timeline({
                paused: true
            })
                .to(step, {
                    opacity: 1,
                    duration: 0.35
                })

            step.addEventListener("mouseenter", function () {
                stepsHoverAnim.play()
            })
            step.addEventListener("mouseleave", function () {
                stepsHoverAnim.reverse()
            })

        })

    }

    const experiences = document.querySelectorAll('.about-wrapper__background-right--el')

    experiences.forEach(experience => {
        const experienceAnim = gsap.timeline({
            scrollTrigger: {
                trigger: experience,
                start: "bottom bottom",
                end: "bottom center",
                toggleActions: "play reverse play reverse"
            }
        })
            .to(experience, {
                opacity: 1,
                duration: 0.35
            }, 'together')
            .to(experience.querySelector('.about-wrapper__background-right--el_title-circle'), {
                backgroundColor: "#ffa63d",
                scale: 1.2,
                duration: 0.35
            }, 'together')
            .to(experience.querySelector('.about-wrapper__background-right--el_title-date'), {
                color: "#fff",
                duration: 0.35
            }, 'together')

    })



    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Contact Me Arrow Animation
    --------------------------------------------------------------------------------------------------------------------*/

    const dragElements = document.querySelectorAll('.js-ticker .wrapper')

    dragElements.forEach(ticker => {
        // Get the initial size of the ticker
        const totalDistance = ticker.offsetWidth;
        const duration = 100;

        const anim = gsap.to(ticker, {
            duration: duration,
            x: totalDistance,
            ease: "none",
            repeat: -1
        });

        // Position the ticker
        gsap.set(ticker, { yPercent: 0 });

        // Clone the first item and add it to the end
        const children = ticker.children
        ticker.prepend(children[children.length - 1].cloneNode(true));


        let startPos;
        const wrap = gsap.utils.wrap(0, 1);
        const draggable = new Draggable(ticker, {
            type: "x",
            trigger: ticker,
            throwProps: true,
            onPressInit: function () {
                anim.pause();
                startPos = this.x;
            },
            onDrag: function () {
                let prog = wrap(this.x / totalDistance);
                anim.progress(prog);
            },
            onThrowUpdate: function () {
                let prog = wrap(this.x / totalDistance);
                anim.progress(prog);
            },
            onDragEnd: function () {
                anim.play();
                gsap.fromTo(anim, { timeScale: 0 }, { duration: 1, timeScale: 1, ease: "none" });
            },

        });
    });


    const dragAnim = gsap.timeline({
        repeat: -1,
        repeatDelay: 1,
        ease: 'power1.out'
    })
        .to(".about-wrapper__tech-head--drag_appear", {
            transform: "translateY(0)"
        })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Contact Me Arrow Animation
    --------------------------------------------------------------------------------------------------------------------*/

    const contactLine = document.querySelector('.contact-line__line')

    const contactArrow = gsap.timeline({
        repeat: -1,
        repeatDelay: 1
    }).to(contactLine, {
        left: 0,
        duration: 1
    })

    if (windowWidth < 768) {
        contactArrow.to(contactLine, {
            left: '11vw',
            duration: 1
        })
    } else if (windowWidth < 1200) {
        contactArrow.to(contactLine, {
            left: '5vw',
            duration: 1
        })
    } else {
        contactArrow.to(contactLine, {
            left: '5vw',
            duration: 1
        })
    }


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Contact block social links hover animation
    --------------------------------------------------------------------------------------------------------------------*/

    const contactLinks = document.querySelectorAll('.contactTopLink')

    contactLinks.forEach(contactLink => {

        const contactLinkHeight = contactLink.offsetHeight
        const contactTopLinkCont = contactLink.querySelector(".contactTopLinkCont")

        const contactLinkAnim = gsap.timeline({
            paused: true
        })
            .to(contactTopLinkCont, 0.35, {
                y: -contactLinkHeight
            }, 'together')


        contactLink.addEventListener("mouseenter", function () {
            contactLinkAnim.play()
        })
        contactLink.addEventListener("mouseleave", function () {
            contactLinkAnim.reverse()
        })
    })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Contact form appear animation
    --------------------------------------------------------------------------------------------------------------------*/

    const newContact = gsap.timeline({
        paused: true
    })
        .to(".contactForm", {
            transform: "translateY(0)",
            duration: 0.35
        })
        .to(contactHello, {
            transform: "translateY(0)",
            opacity: 1,
            duration: 0.35
        }, 'together')
        .to(".contactForm__cont-submit", {
            opacity: 1,
            duration: 0.35
        }, 'together')
        .to(".contactForm__cont-el", {
            opacity: 1,
            duration: 0.35
        }, 'together')
        .from(".contactForm__cont-el--input", {
            width: 0,
            duration: 0.35
        }, 'together')
        .from(".contactForm__cont-el--ta", {
            width: 0,
            duration: 0.35
        }, 'together')



    document.querySelector('.contact-wrapper__btn-cont--btn').addEventListener("click", function () {
        newContact.play()
    })

    document.querySelector(".contactForm__cross").addEventListener("click", function () {
        newContact.reverse()
    })

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Cursor color on contact form
    --------------------------------------------------------------------------------------------------------------------*/


    document.querySelector('.contactForm').addEventListener("mouseover", function () {
        gsap.to(cursorBorder, 0.1, {
            borderColor: "#151515"
        });
        gsap.to(cursorPoint, 0.1, {
            backgroundColor: "#151515"
        }, '-=0.1');
    })
    document.querySelector('.contactForm').addEventListener("mouseleave", function () {
        gsap.to(cursorBorder, 0.1, {
            borderColor: "#fff"
        });
        gsap.to(cursorPoint, 0.1, {
            backgroundColor: "#fff"
        }, '-=0.1');
    })


    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Mobile menu
    --------------------------------------------------------------------------------------------------------------------*/
    const mobileMenu = document.querySelector(".mobile-menu")
    const burger = document.getElementById('burger')
    const openMenu = gsap.timeline({
        paused: true
    })
        .to(".mobile-menu", {
            transform: 'translateY(0)',
            duration: 0.2
        }, 'first')
        .to(".mobile-menu__bgtext", {
            opacity: 1,
            duration: 0.2
        }, 'first')
        .to(".mobile-menu__container", {
            opacity: 1,
            duration: 0.2
        }, 'first')
        .from('.mobile-menu__wrapper-socials', {
            opacity: 0,
            duration: 0.2
        }, 'second')
        .from('.mobile-menu__wrapper-nav--el', {
            left: "5vw",
            opacity: 0,
            stagger: 0.1,
            duration: 0.2
        }, 'second')


    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 0) {

            if (mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                openMenu.reverse();
                burger.classList.remove('crossActive')
            }

        }
    })


    document.querySelector(".header-menu__burger").addEventListener('click', function () {

        // If this is active, reverse ... if not make it active
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            openMenu.reverse();
            burger.classList.remove('crossActive')

        } else {
            mobileMenu.classList.add('active');
            openMenu.play();
            burger.classList.add('crossActive')
        }

    });

    mobileMenu.addEventListener('click', function () {
        if (mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            openMenu.reverse();
            burger.classList.remove('crossActive')
        }
    });

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Contact form HI! animation
    --------------------------------------------------------------------------------------------------------------------*/



    const contactHelloAnim = gsap.timeline({
        scrollTrigger: {
            trigger: contactHello,
            start: "bottom bottom",
            scrub: true,
        }
    })

    if (windowWidth < 768) {
        contactHelloAnim.to(contactHello, {
            top: "0vw",
            duration: 1
        })
    } else {
        contactHelloAnim.to(contactHello, {
            top: "-5vw",
            duration: 1
        })
    }

    /*------------------------------------------------------------------------------------------------------------------*/
    /*	Contact page change cursor in input hover
    --------------------------------------------------------------------------------------------------------------------*/

    const inputs = document.querySelectorAll('.formInput')

    inputs.forEach(input => {
        input.addEventListener("mouseover", function () {
            gsap.to(cursorBorder, 0.1, {
                opacity: 0,
                ease: 'circ.out'
            });
            gsap.to(cursorPoint, 0.1, {
                width: '12px',
                height: '12px',
                ease: 'circ.out'
            }, '-=0.1');
        })
        input.addEventListener("mouseleave", function () {
            gsap.to(cursorBorder, 0.1, {
                opacity: 0.5,
                ease: 'circ.out'
            });
            gsap.to(cursorPoint, 0.1, {
                width: '8px',
                height: '8px',
                ease: 'circ.out'
            }, '-=0.1');
        })
    })
}

