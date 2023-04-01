import { useLayoutEffect, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";


export default function Hero() {

    let timer;
    const heroSec = useRef()
    const heyPic = useRef()
    const [heyPicIndex, setHeyPicIndex] = useState(1)

    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setHeyPicIndex(prevIndex => prevIndex + 1)
        }, 1000)

        if (heyPicIndex === 7) setHeyPicIndex(1)
    }

    useEffect(() => {
        updateCount()
        return () => clearInterval(timer)
    }, [heyPicIndex])


    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const myHeroImg = gsap.timeline({
                scrollTrigger: {
                    trigger: heroSec.current,
                    start: "top top",
                    scrub: 0.6,
                }
            })
                .to(".hey-pic", {
                    transform: "translateY(-20vw)"
                })
        }, heroSec)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={heroSec} id="hero" className="hero relative w-full">
            <div className="container">
                <div className="hero-wrapper w-full pt-28 md:pt-32 lg:pt-36 relative">
                    <div className="hero-wrapper__hey w-full relative text-white text-4xl md:text-6xl xl:text-7xl">
                        <div className="hey-name -z-2 font-medium relative">
                            <p className="font-light opacity-80 text-xl md:text-2xl xl:text-3xl">Hey!</p>
                            <div className="flex flex-col">
                                <div className="papa overflow-hidden">
                                    <h2 className="son">My name is</h2>
                                </div>
                                <div className="papa overflow-hidden">
                                    <h2 className="son">Dmytro Anikin</h2>
                                </div>
                            </div>
                        </div>
                        <div ref={heyPic} className="hey-pic absolute -z-1 translate-y-5 sm:translate-y-8 left-0 right-0 ml-auto mr-auto w-1/2 h-auto lg:w-4/12">
                            <div className="w-full h-auto relative bg-dark-grey">
                                <img type="image/webp" src="assets/kurtyak.webp" alt="Dimianni" className="relative left-1/2 -translate-x-2/4 w-full h-auto object-contain" />
                            </div>
                            <div className="absolute left-1/2 -translate-x-2/4 -top-4.5 w-2/3 h-2/3">
                                <img type="image/webp" src={`assets/duome/duome_${heyPicIndex}.webp`} className="w-full h-auto object-contain" alt="Dimianni" />
                            </div>
                        </div>
                        <div className="font-medium w-max ml-auto mt-24 md:mt-48">
                            <h2 className="flex flex-col">
                                <div className="papa overflow-hidden">
                                    <p className="son">— I'm a web</p>
                                </div>
                                <div className="hapa overflow-hidden">
                                    <p className="son">developer.</p>
                                </div>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}