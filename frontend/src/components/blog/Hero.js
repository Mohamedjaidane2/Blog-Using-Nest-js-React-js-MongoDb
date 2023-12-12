import graybg from "../../assets/img/069312_88415bf7ea2d4c0f81e0099446962547_mv2.webp";
import arrow from "../../assets/img/arrow.svg";

export default function Hero() {
  return (
    <>
      <div>
        <section className=' hero_bg heroSection  '>
          <div className='  '>
            <img src={graybg} className='gray_layer' />
          </div>
          <div className='text_box '>
            <h1 className='titre1_hero'>Leap of Faith</h1>
            <h2 className='titre2_hero'>
              Trusting God is a lifelong journey. Don’t travel alone.
            </h2>
            <div className=' arrow '>
              <img src={arrow} className='arrow_size' />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
