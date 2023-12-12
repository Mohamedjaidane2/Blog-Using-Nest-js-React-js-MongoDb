import desktop from "../../assets/img/desktop.webp";
import music from "../../assets/img/music.webp";
import spotify from "../../assets/img/spotify.webp";

export default function Podcast() {
  return (
    <>
      <div className='podcast_section'>
        <div className='section_title'>
          <h1>My Podcast</h1>
        </div>
        <section className='podcast_items'>
          <div className='podcast_item_1 '>
            <img src={desktop} />
          </div>
          <div className=' podcast_item_2'>
            <div className='podcast_item_title'>
              <h1>Lessons of Life: Things I've Learned, Moments I Cherish.</h1>
            </div>
            <div className='podcast_p'>
              <p>
                I'm a paragraph. Click here to add your own text and edit me.
                It’s easy. Just click “Edit Text” or double click me to add your
                own content and make changes to the font. I’m a great place for
                you to tell a story and let your users know a little more about
                you.
              </p>
            </div>
            <div className='podcast_btn'>
              <button className='btn_Primary'>Listen</button>
            </div>
            <div className='podcast_icons'>
              <img src={music} className='w-[30px] h-[30px]' />
              <img src={spotify} className='w-[30px] h-[30px]' />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
