import { useLayoutEffect, useRef } from "react";
import { works } from "../../constants/constants"
import { gsap } from "gsap";
import WorkCard from "../WorkCard/WorkCard";

export default function Works() {

    const worksSec = useRef()
    const allWorks = useRef()

    useLayoutEffect(() => {

        let ctx = gsap.context(() => {

            const workNew = allWorks.current.querySelectorAll('.works-el--cont')

            workNew.forEach(el => {

                const workImg = el.querySelector('.works-el--top')
                const workImgInner = el.querySelector('.works-el--top_img')
                const workTitle = el.querySelector('.title')
                const workTitleSpan = el.querySelectorAll('.title span')

                if (window.innerWidth > 768) {
                    const workNewAnim = gsap.timeline({
                        paused: true
                    })
                        .to(workImg, {
                            transform: 'scaleY(1.1)',
                            duration: 0.35
                        }, 'together')
                        .to(workTitle, {
                            left: "22%",
                            duration: 0.35
                        }, 'together')
                        .to(workImgInner, {
                            transform: 'scaleX(1.1) scale3d(1.2, 1.2, 1.2)',
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
        }, worksSec)

        return () => ctx.revert()

    }, [])

    return (
        <section ref={worksSec} id="works" className="works z-2 w-full mt-20 relative text-white">
            <div className="container">
                <div className="works-wrapper relative z-2">
                    <div className="relative w-full mb-6 md:mb-9 lg:mb-12 flex flex-col justify-start items-start font-medium text-3xl md:text-5xl xl:text-6xl">
                        <div className="flex flex-col mb-3">
                            <div className="overflow-hidden">
                                <h3>Featured works</h3>
                            </div>
                        </div>
                        <div className="h-0.01 w-full bg-white opacity-30"></div>
                    </div>
                    <div ref={allWorks} className="works-wrapper__content flex flex-wrap">
                        {works.map((work, i) => <WorkCard key={i} work={work} />)}
                    </div>
                </div>
            </div>
        </section>
    )
}