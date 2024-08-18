import React from 'react'
import laptop1 from '../../assets/veelaptop.avif'
import testimony from '../../assets/linkeddp latest.jpg'
import { Link } from 'react-router-dom'
import './Wishlist.css'

function Hero() {
  return (
   <>
   <div className='Hero'></div>
<div className='welcome'>
   
    <div className='welcomeText'>
    <h3>Welcome to VEE LAPTOPS</h3>
    <h2><i>Top Tier Laptops</i></h2>
    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, repellat facere, temporibus vel asperiores laborum quo totam possimus id ex beatae facilis. Beatae aliquid id, incidunt quae placeat corrupti officia.
    </h4>
    </div>



   </div>
   <h1 className='Testimoniesheader'>Testimonies</h1>
   
   <div className='testimonies'>
   
   <div className='testimonycontainer'>
    <h2>Jonathan Muiruri</h2>
<p className='testimony'>
        <img src={testimony}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, repellat facere, temporibus vel asperiores laborum quo totam possimus id ex beatae facilis. Beatae aliquid id, incidunt quae placeat corrupti officia.</p>
    </p>
    <p className='testimonyLinks'>
        <Link to="twitter">Twitter</Link>
        <Link to="twitter">facebook</Link>
        <Link to="twitter">instagram</Link>
    </p>
</div>


  <div className='testimonycontainer'>
    <h2>Prudence Wanjiku</h2>
<p className='testimony'>
        <img src={testimony}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, repellat facere, temporibus vel asperiores laborum quo totam possimus id ex beatae facilis. Beatae aliquid id, incidunt quae placeat corrupti officia.</p>
    </p>
    <p className='testimonyLinks'>
        <Link to="twitter">Twitter</Link>
        <Link to="twitter">facebook</Link>
        <Link to="twitter">instagram</Link>
    </p>
</div>

<div className='testimonycontainer'>
    <h2>Hazael Mungai</h2>
<p className='testimony'>
        <img src={testimony}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, repellat facere, temporibus vel asperiores laborum quo totam possimus id ex beatae facilis. Beatae aliquid id, incidunt quae placeat corrupti officia.</p>
    </p>
    <p className='testimonyLinks'>
        <Link to="twitter">Twitter</Link>
        <Link to="facebook">facebook</Link>
        <Link to="twitter">instagram</Link>
    </p>
</div>

<div className='testimonycontainer'>
    <h2>Maureen Mumbi</h2>
<p className='testimony'>
        <img src={testimony}/>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, repellat facere, temporibus vel asperiores laborum quo totam possimus id ex beatae facilis. Beatae aliquid id, incidunt quae placeat corrupti officia.</p>
    </p>
    <p className='testimonyLinks'>
        <Link to="twitter">Twitter</Link>
        <Link to="twitter">facebook</Link>
        <Link to="twitter">instagram</Link>
    </p>
</div>
   </div>

   <section className='subscribe'>
    <h2>Subscribe to our News Letter </h2>
   <label for="Full Name">Full Name</label>
   <input type='text' placeholder='Ful Name'/><br/>

   <label for="Email">Email</label>
   <input type='email' placeholder='Email'/><br/>

   <label for="Full Name">Full Name</label>
   <input type='text' placeholder='Ful Name'/><br/>
   <button type='submit'>Submit</button>
</section>
   </>
  )
}

export default Hero