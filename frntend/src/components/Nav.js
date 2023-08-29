import React from 'react';
import './Nav.css';

const Nav = () => {
    return(
        <div className='Navbar'>
            <div className='elements'>
                <ul className='Navcontainer'>
                    <li className='item1'>
                        <a href="https://askgpt-gamma.vercel.app/" className='Askgpt'>Askgpt</a>
                    </li>
                    <li className='item2'>
                        <a href="https://platform.openai.com/" target="blank"className='Home'>API</a>
                    </li>
                    <li className='item3'>
                        <a href="#" className='Features'>Features</a>
                    </li>
                    <li className='item4'>
                        <a href="#" className='ContactUs'>Contact Us</a>
                    </li>
                </ul>
            </div>
        
        </div>
    );
}

export default Nav;