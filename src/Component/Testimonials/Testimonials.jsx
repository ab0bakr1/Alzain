import React, { useRef, useState, useEffect } from 'react'
import './Testimonials.css'
import { Container } from 'react-bootstrap';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const testimonials = [
    {
      img: "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg",
      name: "ابوبكر المشهور",
      content: "كنت دائمًا أبحث عن شاي يجمع بين الطعم الرائع والجودة العالية، وقد وجدت ذلك تمامًا في شاي الزين. أستمتع بشكل خاص بنكهته الغنية التي تدوم في الفم، ورائحته العطرة التي تملأ المكان. أصبح شاي الزين جزءًا أساسيًا من روتيني اليومي"
    },
    {
      img: "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg",
      name: "محمد عبدالله",
      content: "شاي الزين ليس مجرد مشروب، بل هو تجربة. أحب تقديمه لضيوفي، ودائمًا ما يتلقون إشادات على مذاقه المميز. التعبئة أنيقة وتحافظ على جودة الشاي لفترة طويلة. إنه يستحق كل ريال دفعته فيه"
    },
    {
      img: "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg",
      name: "طلعت زكرية",
      content: "ياخي هالزين مال الشاي شي ما صاير! من تشمه ريحته تعرف انه شغل عدل. ولما تشربه تحس براحة كذا... طعمه فيه غناوة ومو أي كلام. أنا من يوم عرفته ما قمت أشرب غيره، صدق يستاهل كل بيسة تدفعها فيه"
    }
  ];

const Testimonials = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const timerRef = useRef(null);
    const ignoreTouch = 30;
    const touchStartRef = useRef(null);

    const playSlide = (slide) => {
        let newSlide = slide;
        if (slide < 0) newSlide = testimonials.length - 1;
        if (slide >= testimonials.length) newSlide = 0;
        setCurrentSlide(newSlide);
    };

    useEffect(() => {
        timerRef.current = setTimeout(() => {
        playSlide(currentSlide + 1);
        }, 4500);
        return () => clearTimeout(timerRef.current);
    }, [currentSlide]);

    const handleTouchStart = (e) => {
        touchStartRef.current = e.changedTouches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        const diff = touchStartRef.current - touchEnd;
        if (diff > ignoreTouch) playSlide(currentSlide + 1);
        else if (diff < -ignoreTouch) playSlide(currentSlide - 1);
    };
  return (
    <section className='py-5 my-5'>
        <div id="testim" className="testim" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <div className="wrap">
            <FontAwesomeIcon className='arrow right' icon={faChevronRight} onClick={() => playSlide(currentSlide + 1)}/>
            <FontAwesomeIcon className='arrow left' icon={faChevronLeft} onClick={() => playSlide(currentSlide - 1)}/>
            <ul className="dots">
            {testimonials.map((_, idx) => (
                <li
                key={idx}
                className={`dot ${idx === currentSlide ? "active" : ""}`}
                onClick={() => playSlide(idx)}
                ></li>
            ))}
            </ul>
            <div className="cont">
            {testimonials.map((item, idx) => (
                <div key={idx} className={idx === currentSlide ? "active" : "inactive"}>
                <div className="img">
                    <img src={item.img} alt={item.name} />
                </div>
                <h2>{item.name}</h2>
                <p>{item.content}</p>
                </div>
            ))}
            </div>
        </div>
        </div>
    </section>
  )
}

export default Testimonials