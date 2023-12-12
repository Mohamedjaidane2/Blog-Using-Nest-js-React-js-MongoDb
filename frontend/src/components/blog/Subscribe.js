export default function Subscribe() {
  return (
    <div>
      <section>
        <div className='section_title_vide'></div>
        <div className='subscribe_display'>
          <div className='subscribe_title'>
            <h1>Have Faith. Subscribe</h1>
          </div>
          <form className='subscribe_form'>
            <input
              type='email'
              placeholder='Enter you mail here*'
              className='subscribe_form_input'
            />
            <button className='subscribe_form_btn'>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}
