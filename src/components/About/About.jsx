import { useRef, useState } from "react";
import { facts } from "../../constants/constants";
import useTimer from "../../hooks/useTimer";

export default function About() {

    const [factIndex, setFactIndex] = useState(null)
    const aboutSec = useRef()
    const factPicIndex = useTimer(4);

    const handleFactClick = () => {
        setFactIndex(prevIndex => {
            let newIndex = prevIndex + 1

            // Allowing index to go one over max to show 'start over message'
            if (newIndex > facts.length || prevIndex == null) {
                return 0
            } else {
                return newIndex
            }
        })
    }

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
                </div>
            </div>
        </section>
    )
}