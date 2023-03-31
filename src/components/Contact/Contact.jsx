import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap";
import { socials } from "../../constants/constants"

export default function Contact() {

    const secContact = useRef()

    useLayoutEffect(() => {

        let ctx = gsap.context(() => {

            const contactLinks = document.querySelectorAll('.social-el')
            const contactLine = document.querySelector('.contact-line__line')
            const contactLineWidth = document.querySelector('.contact-line').offsetWidth;

            // console.log(contactLineWidth);

            const contactArrow = gsap.timeline({
                repeat: -1,
                repeatDelay: 1,
            }).to(contactLine, {
                left: 0,
                duration: 1
            }).to(contactLine, {
                left: contactLineWidth,
                duration: 1
            })

            contactLinks.forEach(contactLink => {

                const contactLinkHeight = contactLink.offsetHeight
                const contactLinkCont = contactLink.querySelector(".social-el-cont")

                const contactLinkAnim = gsap.timeline({
                    paused: true
                })
                    .to(contactLinkCont, 0.35, {
                        y: -contactLinkHeight
                    }, 'together')

                contactLink.addEventListener("mouseenter", function () {
                    contactLinkAnim.play()
                })
                contactLink.addEventListener("mouseleave", function () {
                    contactLinkAnim.reverse()
                })
            })

            return () => ctx.revert()
        }, secContact)
    }, [])

    return (
        <section ref={secContact} id="contact" className="contact my-20 text-white">
            <div className="container">
                <div className="contact-wrapper">

                    <div className="contact-wrapper__txt flex flex-col justify-center items-center sm:flex-row">
                        <div className="contact-wrapper__txt-top mb-4 sm:mb-0 font-medium w-full text-xl sm:text-4xl sm:w-auto sm:mr-8 lg:text-6xl lg:mr-12">
                            <div>
                                <span>Drop me</span>
                            </div>
                            <div>
                                <span className="mr-2 lg:mr-6">a line</span>
                                <span className="contact-line inline-block relative overflow-hidden w-5 h-5 sm:w-8 sm:h-7 lg:w-12 lg:h-9">
                                    <div className="contact-line__line absolute top-1/2 -left-full w-full h-0.5 bg-white sm:h-1"></div>
                                </span>
                            </div>
                        </div>

                        <div className="contact-wrapper__txt-bottom text-sm lg:text-base xl:text-lg rounded-full bg-yellow flex justify-center items-center -mt-10 sm:mt-0 w-64 h-64 lg:w-80 lg:h-80">
                            <div className="w-3/4 flex flex-wrap justify-center items-center font-semibold">
                                {
                                    socials.map((social, i) => {
                                        return (
                                            <div key={i} className="social-el contactTopLink overflow-hidden relative flex flex-col basis-6/12 justify-start items-center text-center my-2">
                                                {/* Dummy transparent container (used for height) */}
                                                <p className="text-transparent">{social.name}</p>
                                                <div className="social-el-cont contactTopLinkCont flex flex-col absolute top-0 left-0 w-full translate-y-0">
                                                    <a href={social.link} target="_blank" rel="noopener noreferrer">{social.name}</a>
                                                    <a href={social.link} target="_blank" rel="noopener noreferrer">{social.name}</a>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}