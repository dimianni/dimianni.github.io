import { useEffect, useLayoutEffect, useRef } from "react";
import { technologies } from "../../constants/constants";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Draggable from "gsap/dist/Draggable";
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, Draggable);
}


export default function Tech() {

    const techSec = useRef()
    const techMarquee = useRef()

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // Drag word animation
            const dragAnim = gsap.timeline({
                repeat: -1,
                repeatDelay: 1,
                ease: 'power1.out'
            })
                .to(".drag-appear", {
                    transform: "translateY(0)"
                })


            // Tech stack animation
            // Get the initial size of the techMarquee.current
            const totalDistance = techMarquee.current.querySelector("li").offsetWidth;
            // Position the techMarquee.current
            gsap.set(techMarquee.current, { yPercent: 0 });
            // Clone the first item and add it to the end
            techMarquee.current.prepend(techMarquee.current.querySelector("li").cloneNode(true));

            const anim = gsap.to(techMarquee.current, {
                duration: 100,
                x: totalDistance,
                ease: "none",
                repeat: -1
            });

            let startPos;
            const wrap = gsap.utils.wrap(0, 1);
            const draggable = new Draggable(techMarquee.current, {
                type: "x",
                trigger: techMarquee.current,
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

        }, techSec); // <- IMPORTANT! Scopes selector text

        return () => ctx.revert(); // cleanup
    }, [])


    return (
        <section ref={techSec} className="tech mt-20 text-white relative overflow-hidden">
            <div className="container overflow-hidden">
                <div className="tech-head flex justify-between items-end mb-6 xl:mb-10 text-sm lg:text-base xl:text-lg">
                    <p>
                        My tech stack:
                    </p>
                    <div className="drag relative overflow-hidden">
                        <p className="drag-hidden text-transparent">
                            Drag
                        </p>
                        <div className="drag-appear absolute top-0 left-0 -translate-y-1/2">
                            <p className="drag-appear-n">
                                Drag
                            </p>
                            <p className="drag-appear-d">
                                Drag
                            </p>
                        </div>
                    </div>
                </div>
                <div className="tech-content relative w-full h-20 xl:h-28">
                    <ul ref={techMarquee} className="absolute top-0 bottom-0 right-0 flex">
                        <li className="min-w-[100vw] list-none flex items-center justify-around">
                            {
                                technologies.map((tech, i) => {
                                    return (
                                        <div key={i} className="w-24 xl:w-32 p-2 opacity-30 hover:opacity-100 transition-opacity">
                                            <img className="w-full h-auto object-contain" src={`assets/tech/${tech}.svg`} alt={tech} />
                                        </div>
                                    )
                                })
                            }
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}