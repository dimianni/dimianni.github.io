import { useEffect, useLayoutEffect, useRef, useState } from "react"
import {gsap} from "gsap";
import { callBtnParallax, parallaxCursor } from "../../utils/parallaxLinks";
import { socials } from "../../constants/constants";

export default function Header(){

    const [burgerActive, setBurgerActive] = useState(false)
    const header = useRef()

    function handleBurgerClick(){
        setBurgerActive(prevState => {
            return !prevState
        })
    }

    useEffect(() => {
        // Remove menu when user starts scrolling
        window.addEventListener("scroll", function () {
            if (window.scrollY > 0) {
                setBurgerActive(false)
            }
        })
    })

    // Smooth links
    useEffect(() => {
        let links = header.current.querySelectorAll("a[href^='#']")

        function scrollTo(id) {
            const element = document.getElementById(id);
            const offset = element.offsetTop - 95;

            window.scrollTo({
                top: offset,
                behavior: "smooth"
            })
        }

        links.forEach(link => {
            link.addEventListener("click", function (e) {
                e.preventDefault();
                let id = this.hash.replace("#", "")
                scrollTo(id);
            })
        })
    }, [])

    useLayoutEffect(() => {

        let ctx = gsap.context(() => {

            /*-------------------------------------------------------------------------*/
            /* Link animation
            ---------------------------------------------------------------------------*/
            let active = false;
            const parallaxLinks = document.querySelectorAll('.link');

            parallaxLinks.forEach(parallaxLink => { 
                parallaxLink.addEventListener('mouseenter', function () { 
                    active = true;
                })
                parallaxLink.addEventListener('mouseleave', function (e) {
                    gsap.to(this.querySelector(".link-span"), 0.3, { x: 0, y: 0 });
                    active = false;
                })
                parallaxLink.addEventListener('mousemove', function (e) {
                    parallaxCursor(e, this, 10);
                    callBtnParallax(e, this);
                })
            })

            /*-------------------------------------------------------------------------*/
            /* Logo onscroll animation
            ---------------------------------------------------------------------------*/
            const logoD = document.querySelector('.header-logo--d')
            const logoN = document.querySelector('.header-logo--n')
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
        }, header)

        return () => ctx.revert()

    }, [])

    return (
        <header ref={header}>
            <div className="header-logo fixed w-36 h-6 overflow-hidden">
                <a className="header-logo--n w-full h-full flex justify-start" href="/" target="_blank" rel="noopener noreferrer">
                    <img src="assets/dimianni_logo-n.svg" className="object-cover w-full h-full" alt="Dimianni" />
                </a>
                <a className="header-logo--d w-full h-full flex justify-start" href="/" target="_blank" rel="noopener noreferrer">
                    <img src="assets/dimianni_logo-d.svg" className="object-cover w-auto h-full" alt="Dimianni" />
                </a>
            </div>
            <div className="header-menu fixed">
                <ul className="header-menu__list flex text-white opacity-80 font-light text-xs md:text-base xl:text-lg">
                    <li className="header-menu__list-el relative w-24 h-20">
                        <a className="link smoothScroll absolute z-10 w-full h-full flex justify-end align-top" href="#works">
                            <span className="link-span">works</span>
                        </a>
                    </li>
                    <li className="header-menu__list-el relative w-24 h-20">
                        <a className="link smoothScroll absolute z-10 w-full h-full flex justify-end align-top" href="#about">
                            <span className="link-span">about</span>
                        </a>
                    </li>
                    <li className="header-menu__list-el relative w-24 h-20">
                        <a className="link smoothScroll absolute z-10 w-full h-full flex justify-end align-top" href="#contact">
                            <span className="link-span">contact</span>
                        </a>
                    </li>
                </ul>
                <div onClick={handleBurgerClick} className="header-menu__burger w-6 h-4">
                    <div id="burger" className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className={`mobile-menu fixed bg-main overflow-hidden w-full h-screen ${burgerActive ? "active" : ""}`}>
                <div className="container h-full flex justify-center items-center relative text-white">
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 uppercase font-bold text-10xl opacity-01 tracking-tightest leading-tightest">
                        <p>Me</p>
                        <p>nu</p>
                    </div>
                    <div className="w-full h-auto relative flex justify-between">
                        <div className="w-3/5 flex flex-col justify-end font-normal">
                            {socials.map((social, i) => (<a key={i} className="my-1" href={social.link} target="_blank" rel="noopener noreferrer">{social.name}</a>)) }
                        </div>
                        <div className="w-2/5 flex flex-col justify-between font-medium text-3xl">
                            <a href="/" className="menu-el relative my-4 smoothScroll">
                                <span>Home</span>
                            </a>
                            <a href="#works" className="menu-el relative my-4 smoothScroll">
                                <span>Works</span>
                            </a>
                            <a href="#about" className="menu-el relative my-4 smoothScroll">
                                <span>About</span>
                            </a>
                            <a href="#contact" className="menu-el relative my-4 smoothScroll">
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
 
    )
}