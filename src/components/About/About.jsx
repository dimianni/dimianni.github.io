import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { facts, experiences } from "../../constants/constants";
import { gsap } from "gsap"

export default function About() {

    let timer;
    const [factPicIndex, setFactPicIndex] = useState(1)
    const [factIndex, setFactIndex] = useState(null)
    const experiencesCont = useRef()
    const aboutSec = useRef()

    const updateCount = () => {
        timer = !timer && setInterval(() => {
            setFactPicIndex(prevIndex => prevIndex + 1)
        }, 1000)

        if (factPicIndex === 4) setFactPicIndex(1)
    }

    const handleFactClick = () => {
        setFactIndex(prevIndex => {
            let newIndex = prevIndex + 1

            // newIndex > facts.length - 1
            // Allowing index to go one over max to show 'start over message'
            if (newIndex > facts.length || prevIndex == null) {
                return 0
            } else {
                return newIndex
            }
        })
    }

    useEffect(() => {
        updateCount()
        return () => clearInterval(timer)
    }, [factPicIndex])

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            const allSteps = experiencesCont.current.querySelectorAll(".experiences-el")
            allSteps.forEach(experience => {
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
                    .to(experience.querySelector('.circle'), {
                        backgroundColor: "#ffa63d",
                        scale: 1.2,
                        duration: 0.35
                    }, 'together')
                    .to(experience.querySelector('.date'), {
                        color: "#fff",
                        duration: 0.35
                    }, 'together')
            })
        }, aboutSec)

        return () => ctx.revert()
    }, [])

    return (
        <section ref={aboutSec} id="about" className="about z-2 relative mt-20 w-full text-white">
            <div className="container">
                <div className="about-wrapper">

                    <div className="relative w-full mb-6 md:mb-9 lg:mb-12 flex flex-col justify-start items-start font-medium text-3xl md:text-5xl xl:text-6xl">
                        <div className="flex flex-col mb-3">
                            <div className="overflow-hidden">
                                <h3>About</h3>
                            </div>
                        </div>
                        <div className="h-0.01 w-full bg-white opacity-30"></div>
                    </div>

                    <div onClick={handleFactClick} className="border-b border-main3 text-center lg:text-left cursor-pointer pb-6 md:pb-9 lg:pb-10 w-full flex justify-center flex-col items-center lg:flex-row lg:justify-start">
                        <div className="w-36 h-36 min-w-[9rem] min-h-[9rem] lg:mr-5">
                            <img type="image/webp" className="w-full h-full" src={`assets/duomeFacts/duome_facts${factPicIndex}.webp`} alt="Dimianni facts" />
                        </div>
                        <p className={`min-h-[60px] text-lg lg:text-xl xl:text-3xl w-full lg:w-auto ${factIndex == null ? "" : "hidden"}`}>
                            <span className="font-bold">Click here </span> to find out five quick facts about me.
                        </p>
                        <p className={`min-h-[60px] text-lg lg:text-xl xl:text-3xl w-full lg:w-auto ${(factIndex == facts.length || factIndex == null) ? "hidden" : ""}`}>
                            {facts[factIndex]}
                        </p>
                        <p className={`min-h-[60px] text-lg lg:text-xl xl:text-3xl w-full lg:w-auto ${factIndex == facts.length ? "" : "hidden"}`}>
                            Thank you for your interest! <span className="font-bold">Click again</span> to start over!
                        </p>
                    </div>

                    <div className="experiences relative text-white w-full mb-4">
                        <div ref={experiencesCont} className="w-full ml-auto">
                            {
                                experiences.map((experience, i) => {
                                    return (
                                        <div key={i} className="experiences-el transition-all border-b border-main3 py-7 opacity-30 flex items-start flex-col lg:flex-row">
                                            <div className="title mb-2 relative w-full text-main uppercase font-bold text-4xl lg:text-5xl">
                                                <div className="date flex flex-col">
                                                    <span>{experience.from}</span>
                                                    <span>{experience.to}</span>
                                                </div>
                                                <div className="circle absolute w-2.5 h-2.5 -top-2.5 left-0 rounded-full bg-main2"></div>
                                            </div>
                                            <p className="descr w-full text-sm lg:text-base xl:text-lg" dangerouslySetInnerHTML={{__html: experience.html}} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}