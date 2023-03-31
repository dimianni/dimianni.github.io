import { useLayoutEffect, useEffect, useRef } from "react"
import { gsap } from 'gsap';
import ScrollTrigger from "gsap/dist/ScrollTrigger";
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Intro() {

    const suptitle = useRef()
    const keepScrolling = useRef()
    const introSec = useRef()

    useLayoutEffect(() => {

        let ctx = gsap.context(() => {
            /*---------------------------------------------------------*/
            /*	Intro words animation
            -----------------------------------------------------------*/
            const introWds = suptitle.current.querySelectorAll('.suptitle-el')
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

            /*---------------------------------------------------------*/
            /*	Emoji cursor
            -----------------------------------------------------------*/
            if (window.innerWidth > 1023) {

                const emojiContainers = document.querySelectorAll(".emoji-cont")

                emojiContainers.forEach(el => {
                    const image = el.querySelector('.emoji')

                    el.addEventListener('mouseenter', function (e) {
                        gsap.to(image, 0.1, { autoAlpha: 1 })

                        let clientX = e.clientX;
                        let clientY = e.clientY;

                        const render = () => {
                            gsap.set(image, {
                                left: clientX,
                                top: clientY
                            });
                        };
                        render();
                    })

                    el.addEventListener('mouseleave', function () {
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
                        };
                        render();
                    })
                })
            }

            /*---------------------------------------------------------*/
            /*	Keep on scrolling
            -----------------------------------------------------------*/
            const rotate = gsap.timeline({
                scrollTrigger: {
                    trigger: keepScrolling.current,
                    scrub: 0.2,
                    start: 'top bottom',
                    end: '+=10000',
                }
            }).to(keepScrolling.current, {
                rotation: 360 * 5,
                duration: 1,
                ease: 'none'
            })
        }, introSec)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={introSec} className="intro mt-20 relative z-10 w-full">
            <div className="container relative">
                <div className="w-full relative text-white">
                    <div className="w-full ml-auto font-medium text-3xl">

                        <div className="mb-3 font-medium text-3xl md:text-5xl xl:text-6xl">
                            <div className="emoji-cont lg:cursor-none relative">
                                <p>I’m a <span className="font-bold">fan of web.</span> </p>
                                <div className="emoji">💻</div>
                            </div>
                        </div>

                        <div>
                            <p ref={suptitle} className="emoji-cont lg:cursor-none relative mb-12 md:mb-16 lg:mb-16 xl:mb-28 font-medium text-3xl md:text-5xl xl:text-6xl">
                                <span className="suptitle-el opacity-5">I love building websites that&nbsp;</span>
                                <span className="suptitle-el opacity-5">solve business problems by&nbsp;</span>
                                <span className="suptitle-el opacity-5">combining efficiency&nbsp;</span>
                                <span className="suptitle-el opacity-5">and attractiveness.</span>
                                <span className="emoji">⚙️</span>
                            </p>
                            <p className="emoji-cont lg:cursor-none relative w-1/2 ml-auto font-normal text-base md:text-xl xl:text-2xl">
                                <span>
                                    Bringing designers’ creative solutions to life and implementing websites’ functionality is what I enjoy the most
                                </span>
                                <span className="emoji">🎨</span>
                            </p>
                        </div>
                    </div>
                    <div ref={keepScrolling} className="intro-anim absolute left-0 -bottom-8 w-32 h-32 lg:w-2/5 lg:h-2/5">
                        <img className="w-full h-full" src="assets/keepon.svg" alt="Keep scrolling" />
                    </div>
                </div>
            </div>
        </section>
    )
}