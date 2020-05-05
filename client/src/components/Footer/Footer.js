import React from 'react'
import './Footer.css'
import footer from '../../media/linkedin.png'

const Footer = () => {
    return (
        <div className='footerWrapper'>
             <a href="https://linkedin.com/in/oleg-melnyk/"><div className='creditLink'>Made by &nbsp;<img src={footer} className='linkedImg'/>Oleg Melnyk</div> </a>
        </div>
    )
}
export default Footer;
