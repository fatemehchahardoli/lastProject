import React, { useRef, useState, useLayoutEffect, useEffect } from 'react'
import SplitType from 'split-type'
import '../style/Style.scss'
import video_introduce from '../video/introduce_mainpage.mp4'
import poster from '../image/2023-11-30_14-58-32.jpg'
import accueil_decoration_crop from '../image/accueil-decoration-crop.jpeg'
import introduction_entree_img from '../image/accueil-entree.jpeg'
import introduction_lustre_img from '../image/accueil-lustre.jpeg'
import Gridalbum from './Gridalbum'



import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Introduce = () => {

    const [playing, setPlaying] = useState(false);
    const [muting, setMuting] = useState(false);
    const [text, setText] = useState([]);
    const videoRef = useRef(null);
    const slide_wrapper = useRef(null);
    const introduction_5_slide = useRef(null);
    const component1 = useRef(null);
    const component2 = useRef(null);
    const component3 = useRef(null);
    const textRef = useRef(null);

    const playVideo = (control) => {
        if (control === "play") {
            videoRef.current.play();
            setPlaying(true);
        } else if (control === "pause") {
            videoRef.current.pause();
            setPlaying(false);
        }
    }
    const muteVideo = (control) => {
        if (control === "mute") {
            videoRef.current.muted = true;
            setMuting(true);
        } else if (control === "muted") {
            videoRef.current.muted = false;
            setMuting(false);
        }
    }

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let panels = gsap.utils.toArray(".panel");
            gsap.to(panels, {
                xPercent: -100 * (panels.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: slide_wrapper.current,
                    start: "top 15%",
                    pin: true,
                    scrub: 1,
                    // snap: 1 / (panels.length - 1),
                    end: () => "+=" + slide_wrapper.current.offsetWidth,
                }
            });
        }, component1);
        return () => {
            ctx.revert();
        };
    });
    useLayoutEffect(() => {
        let cty = gsap.context(() => {
            gsap.to(introduction_5_slide.current, {
                y: - 450,
                ease: "none",
                scrollTrigger: {
                    trigger: component2.current,
                    start: "top 15%",
                    pin: true,
                    scrub: 1,
                    end: "bottom 100%",
                    invalidateOnRefresh: true
                }
            });
        }, component3);
        return () => {
            cty.revert();
        };
    });

    useEffect(() => {
        videoRef.current.height = 100;

        new SplitType('.introduction_4_p', { types: 'chars,words' })
        let char = gsap.utils.toArray(".char");
        gsap.from(char, {
            opacity: 0,
            stagger: 0.009,
            ease: "circ",
            scrollTrigger: {
                trigger: char,
                start: "top 80%",
                end: "top 40%",
            }
        });

        gsap.to('.slide', {
            left: "100%",
            width: 0,
            duration: 1.5,
            ease: "circ",
            scrollTrigger: {
                trigger: '.slide',
                start: "top 95%",
                end: "top -280%",
                toggleActions: "restart noun restart noun ",
            }
        });
        ScrollTrigger.create({
            trigger: '.introduce_room_img',
            start: "top 110%",
            end: "top -180%",
            toggleClass: "toggle",
        })
        ScrollTrigger.create({
            trigger: '.introduce_resturant_img',
            start: "top -180%",
            end: "top -450%",
            toggleClass: "toggle",
        })
        ScrollTrigger.create({
            trigger: '.introduce_tearoom_img',
            start: "top -450%",
            end: "top -740%",
            toggleClass: "toggle",
        })
        gsap.to('.p_entree_box', {
            x: -1000,
            ease: "circ",
            scrollTrigger: {
                trigger: '.p_entree_box',
                start: "top 80%",
                scrub: 1,
                end: "top 15%",
            }
        });
        ScrollTrigger.create({
            trigger: '.img_entree_box',
            start: "top 80%",
            toggleClass: "toggle",
        })
        ScrollTrigger.create({
            trigger: '.img_lustre_box',
            start: "top 80%",
            toggleClass: "toggle",
        })
        gsap.to('.p_lustre_box', {
            x: 1000,
            ease: "circ",
            scrollTrigger: {
                trigger: '.p_lustre_box',
                start: "top 80%",
                scrub: 1,
                end: "top 15%",
            }
        });
        ScrollTrigger.create({
            trigger: '.introduction_5_image_2',
            start: "top 90%",
            toggleClass: "toggle",
        })
    })

        ;

    return (
        <section className='introduce' ref={component1}>

            <div className='introduce_hotel'>
                <h2>True to its singular identity,</h2>
                <h2>La Mamounia is constantly reinventing itself, fashioning a unique magic </h2>
                <h2>woven of elegance and exception.
                </h2>
            </div>

            <div className='video_box'>
                <video ref={videoRef}
                    src={video_introduce}
                    poster={poster}
                    loop>
                </video>
                {playing ? (
                    <>
                        <div className='div_control_pause' onClick={() => playVideo("pause")}>
                            <i class="fa-solid fa-pause" ></i>
                        </div>
                        {muting ? (
                            <div className='div_mute' onClick={() => muteVideo("muted")}>
                                <i className="fa-solid fa-volume-xmark" ></i>
                            </div>
                        ) : (
                            <div className='div_mute' onClick={() => muteVideo("mute")}>
                                <i class="fa-solid fa-volume-high" ></i>
                            </div>
                        )}

                    </>

                ) : (
                    <div className='div_control_play' onClick={() => playVideo("play")}>
                        <i className="fa-solid fa-play" ></i>
                    </div>
                )}

            </div>

            <div className='introduce_parts' ref={slide_wrapper}>

                <div className='introduce_rooms  panel'>
                    <div className='description'>
                        <h3>Experience La Mamounia, a sensory journey</h3>
                        <p>
                            From the moment you arrive, you will be captivated by the harmony of the surroundings, the opulence of the materials and the excellence of the craftsmanship revealed in each and every detail.
                            Wherever you look, you will be struck by a majestic beauty. A beauty that you will long to touch, to feel beneath your fingertips: the softness of velvet and leather, the contours of sculpted plaster and zellige tilework, the freshness of cool marble.
                        </p>
                    </div>
                    <div className='picture introduce_room_img '>
                        <div className='slide'></div>
                    </div>
                </div>
                <div className='introduce_resturant  panel'>
                    <div className='description'>
                        <h3>Breathe in La Mamounia : a unique fragrance, a light, exclusive scent that lingers delicately in the air and envelops you in an atmosphere that is as delicious as it is irresistible. </h3>
                        <p>La Mamounia treats you to a wonderfully soothing soundscape: from the birdsong that drifts up from the hotel gardens in the morning to the gentle babbling of fountains as you stroll from one area to the next. </p>
                    </div>
                    <div className='picture introduce_resturant_img'>

                    </div>
                </div>
                <div className='introduce_tearoom  panel'>
                    <div className='description'>
                        <h3>This sensory experience culminates in a rich palette of delectable flavours...</h3>
                        <p>...an exquisitely refreshing welcome drink on arrival, sweet and savoury delicacies by Pierre Hermé, traditional Moroccan dishes by Chef Rachid Agouray, and wonderfully refined Italian and Asian specialities by Chef Jean-Georges Vongerichten.</p>
                    </div>
                    <div className='picture introduce_tearoom_img'>

                    </div>
                </div>
            </div>

            <div className='introduction'>

                <div>
                    <div className='img_entree_box'>
                        <img className='introducton_entree_img' src={introduction_entree_img} alt="" />
                    </div>
                    <div className='p_entree_box'>
                        <h1>To return to La Mamounia
                            time and time again </h1>
                        <p>We are both honoured and inspired to have been nominated the best hotel in the world on several occasions.</p>
                        <p>Our excellence is the result of tireless endeavour, the unfailing commitment of our 800 employees, constant self-questioning, and innovations that are daring yet respectful of the past. This is how La Mamounia remains a place of legend that moves with the times while always remaining in tune with the here and now. </p>
                        <p>Our greatest reward is the loyalty of our customers, who love coming back here because they are made to feel so at home.  </p>
                    </div>
                </div>


                <div>
                    <div className='p_lustre_box'>
                        <h1>What makes La Mamounia so unique in their eyes?  </h1>
                        <p>An art of living inherited from a long tradition of care and attention. A unique atmosphere perfumed with the delicate scent of Moroccan dates. Welcoming smiles and thoughtful touches.</p>
                        <p>A sense of hospitality that translates into a thousand and one details. From your first visit, we remember your preferences: your ideal room temperature, your favourite coffee, the drinks and dishes you like...</p>
                        <p>So, we know not only what will please you during your next stay, but also what will surprise you and make you want to come back for an experience that is always fresh and new. </p>
                    </div>
                    <div className='img_lustre_box'>
                        <img className='introducton_lustre_img' src={introduction_lustre_img} alt="" />
                    </div>
                </div>

                <div>
                </div>

                <div className='introduction_4'>
                    <div className='introduction_4_title'>
                        <h2>Contemplate and fall under its spell:</h2>
                        <h2>La Mamounia is in constant metamorphosis</h2>
                    </div>
                    <div className='introduction_4_box'>

                        <div className='introduction_4_box_description'>
                            <h3>“Everything must change so that nothing changes”</h3>
                            <p ref={textRef} className='introduction_4_p'>La Mamounia has a special talent for constantly reinventing itself without ever betraying its memory and managing, over the passing decades, to always stay true to its unique identity. From renovation to transformation, its century-long journey comes to a majestic close with the extraordinary metamorphosis conceived in 2020 and 2023 by Sanjit Manku and Patrick Jouin, in which all the magic of the Grande Dame was revealed while respecting its true essence: modernity has never been so timeless.</p>
                            <p className='introduction_4_p'>The restaurants unfold in an alchemy of multi-faceted moods, the public spaces have been exquisitely exalted, from the intimate and mysterious alcoves of the Mamounia Gallery to the VIP Lounge bathed in soft tones of blue, culminating in the fabulous Centenary Chandelier. This magnificent sculpture of light, which pays homage to traditional Berber jewellery, captivates the eye from the moment you walk through the hotel doors, like an invitation to step into the dazzling dream that is a stay at La Mamounia.</p>
                        </div>

                        <div className='introduction_4_box_imag'>
                            <img src={accueil_decoration_crop} alt="" />
                        </div>
                    </div>
                </div>

                <div className='introduction_5_main' ref={component2}>

                    <div className='introduction_5_title'>
                        <h2>Dream, marvel, explore :</h2>
                        <h2>an unforgettable stay</h2>
                    </div>

                    <div ref={component3}>
                        <div className='introduction_5_scrollBox' ref={introduction_5_slide}>

                            <div className='introduction_5_panel introduction_5'>
                                <div className='introduction_5_image_1'>
                                </div>
                                <div>
                                    <p>nside or out? At La Mamounia, from morning to night, the hours slip by without you even noticing. But if you feel the need to get active, the pools, gym, tennis courts and shady walkways in the sublime Gardens, awash with roses, orange, olive and palm trees, are all there just waiting for you.

                                        The spa and hammams are the perfect placetoindulge in a spot of pampering. Andtuckedaway in the Gardens, a delightfulvintagegames room will tempt young and oldalike tofight it out over a game ofpinball, pooltable.</p>
                                </div>
                            </div>

                            <div className='introduction_5_panel introduction_5'>
                                <div className='introduction_5_image_2'>
                                </div>
                                <div>

                                    <h2>The Exclusives Marrakech, with its beating heart on the hotel's very doorstep.</h2>
                                    <p>
                                        In just a few minutes, you will be before the magnificent Koutoubia Mosque, then in the bustling Place Jamaa el-Fna or the narrow streets of the Medina, discovering the stalls and hidden gems of this enchanting city. If you are tempted to visit the must-see attractions of the Ocher City - the Majorelle Gardens, the Bahia Palace, the Saadian Tombs, the Palmeraie - we will be delighted to organise your excursions, providing you with your own guide and driver. </p>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>

                <Gridalbum />
            </div>

        </section>
    )
}

export default Introduce;