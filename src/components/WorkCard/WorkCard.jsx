import cls from "classnames";

export default function WorkCard({work}){

    return (
        <div className="works-el mb-8">
            <div className="works-el--cont relative">
                <h3 className="title absolute z-1 top-0 left-0 pointer-events-none m-0 font-bold uppercase text-4xl sm:text-5xl lg:text-6xl">
                    {
                        [...work.name].map((char, i) => <span className="relative text-main" key={i}>{char}</span>)
                    }
                </h3>
                <a href={work.link} className={cls("works-el--top scale-y-100 block relative overflow-hidden ml-auto h-96 md:h-80 lg:h-128 w-10/12 md:w-4/5", work.bg)}
                    target="_blank" rel="noopener noreferrer">
                    <div className="works-el--top_img absolute top-0 left-0 bottom-0 right-0 overflow-hidden w-full flex justify-center items-center">
                        <img className={cls("h-auto object-contain", work.image.width)} type="image/png" src={`assets/works/${work.image.name}`} alt={work.name} />
                    </div>
                </a>
                <div className="works-el--bottom mt-4 mb-6 lg:mt-10 ml-auto w-10/12 md:w-4/5">
                    <div className="w-full flex flex-col md:flex-row items-start gap-2 mb-3">
                        <p className="min-w-fit text-sm py-2">Tech stack:</p>
                        <ul className="flex items-center flex-wrap">
                            {work.tech.map(el => {
                                return (
                                    <li className="m-1">
                                        <p className="text-xs md:text-sm py-1 px-2 border border-white rounded">{el}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="text-sm lg:text-base xl:text-lg mb-3">
                        <p>{work.description}</p>
                    </div>
                    <a href={work.link}
                        className="works-el--bottom_link w-max ml-auto text-base lg:text-lg xl:text-xl flex justify-center md:justify-end items-center" target="_blank"
                        rel="noopener noreferrer">
                        <span>View project</span>
                        <img className="arrow w-4 h-4 transition-all ml-2" src="assets/button-arrow.svg" />
                    </a>
                </div>
            </div>
        </div>
    )
}