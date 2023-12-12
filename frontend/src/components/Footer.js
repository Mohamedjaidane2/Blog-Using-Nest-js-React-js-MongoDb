import instagram from ".././assets/img/instagram.webp";
import twitter from ".././assets/img/twitter.webp";
import facebook from ".././assets/img/facebook.webp";

export default function Footer() {
  return (
    <footer id='contact' className='footer_style'>
      <div className='footer_grid'>
        <div className='footer_container'>
          <div className=' footer_title'>
            <h1>Send Me a Prayer & I'll Send One Back</h1>
          </div>
          <div className='footer_icons'>
            <img src={twitter} />
            <img src={facebook} />
            <img src={instagram} />
          </div>
        </div>
        <div>
          <form className='footer_form'>
            <div className='form_items'>
              <div className='form_item'>
                <label className='form_label'>First Name</label>
                <input type='text' className='form_input' />
              </div>
              <div className='form_item'>
                <label className='form_label'> Last Name</label>
                <input type='text' className='form_input' />
              </div>
            </div>

            <div>
              <div className='form_item'>
                <label className='form_label'>Email *</label>
                <input type='text ' className='form_input' required />
              </div>
              <div className='form_item'>
                <label className='form_label'>Leave us a message...</label>
                <textarea rows={2} className='form_input' />
              </div>
            </div>
            <div className='btn_display '>
              <button className='btn_Sec btn_footer'>Submit</button>
            </div>
          </form>
        </div>
      </div>
      <div className='footer_end '>
        <span className='footer_end_text'>
          © 2023 by by Leap of Faith. Proudly created By Mohamed Jaidane
        </span>
      </div>
    </footer>
  );
}
