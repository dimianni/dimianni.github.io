import { useEffect, useLayoutEffect, useRef } from "react";
import { works } from "../../constants/constants"
import { gsap } from "gsap";

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
                        {
                            works.map((work, i) => {
                                return(
                                    <div key={i} className="works-el mb-8">
                                        <div className="works-el--cont relative">
                                            <h3 className="title absolute z-1 top-0 left-0 pointer-events-none m-0 font-bold uppercase text-4xl sm:text-5xl lg:text-6xl">
                                                {
                                                    [...work.name].map((char, i) => <span className="relative text-main" key={i}>{char}</span>)
                                                }
                                            </h3>
                                            <a href={work.link} className={`works-el--top scale-y-100 block relative overflow-hidden ml-auto h-96 md:h-80 lg:h-128 w-10/12 md:w-4/5 ${"bg-"+work.bgColor}`}
                                                target="_blank" rel="noopener noreferrer">
                                                <div className="works-el--top_img absolute top-0 left-0 bottom-0 right-0 overflow-hidden w-full flex justify-center items-center">
                                                    <img className="w-full h-auto object-contain" type="image/png" src={`assets/works/${work.image}`} alt={work.name} />
                                                </div>
                                            </a>
                                            <div className="works-el--bottom mt-4 mb-6 lg:mt-8 ml-auto w-10/12 md:w-4/5">
                                                <div className="text-sm lg:text-base xl:text-lg mb-3">
                                                    <p>{work.description}</p>
                                                </div>
                                                <a href={work.link}
                                                    className="works-el--bottom_link text-base lg:text-lg xl:text-xl w-full flex justify-start items-center" target="_blank"
                                                    rel="noopener noreferrer">
                                                    <span className="">View project</span>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}