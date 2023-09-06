import React, { useState } from 'react';
import './Nav.css';

const Nav = () => {

    const [drpdown, setdrpdown] = useState(false);
    const changedropdown = () => setdrpdown(!drpdown);


    return (
        <div className='Navbar'>
            <div className='elements'>
                <ul className='Navcontainer'>
                    <li className='item1'>
                        <a href="https://askgpt-gamma.vercel.app/" className='Askgpt'>Askgpt</a>
                    </li>
                    <li className='item2'>
                        <a href="https://platform.openai.com/" target="blank" className='API'>API</a>
                    </li>
                    <li className='item3'>
                        <a href="#" className='Features'>Features</a>
                    </li>
                    <li className='item4'>
                        <a href="#" className='ContactUs'>Contact Us</a>
                    </li>
                </ul>
                <ul className='mobilenavcontainer'>
                    <li className='item1'>
                        <a href="https://askgpt-gamma.vercel.app/" className='Askgpt'>Askgpt</a>
                    </li>
                    <li className='item2'>
                        <button className={drpdown ? "notactive" : "active"} onClick={changedropdown}>
                            ☰
                        </button>
                        <div className={drpdown ? "active" : "notactive"}>
                            <button className='closedropdown' onClick={changedropdown}>
                                ✕
                            </button>
                            <div className='dropdowncontent'>
                                <button className='item3'>
                                    <a href="https://platform.openai.com/" target="blank" className='API'>API</a>
                                </button>
                                <button className='item4'>
                                    <a href="#" className='Features'>Features</a>
                                </button>
                                <button className='item5'>
                                    <a href="#" className='ContactUs'>Contact Us</a>
                                </button>
                            </div>

                        </div>
                    </li>
                </ul>
            </div>

        </div>
    );
}

export default Nav;
