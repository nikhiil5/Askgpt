import React from 'react';
import Chatstrip from './Chatstrip';
import { useState, useEffect } from 'react';
import bot from '../assets/bot.svg';
import send from '../assets/send.svg'
import user from '../assets/user.svg';
import './Chat.css';

const Chat = () => {

    const [Searchinput, setSearchinput] = useState("");
    let [Inputxt, setInputxt] = useState("");
    const [Botreply, setBotreply] = useState("");
    const [inputValues, setInputValues] = useState([]);
    const [Botvalues, setBotvalues] = useState([]);
    const [Userandbot, setUserandbot] = useState([]);
    const [watermark, setwatermark] = useState(true);




    const thinking = [
        '.',
        '..',
        '...',
        '....',
    ]

    const [currentSentence, setCurrentSentence] = useState(0);




    useEffect(() => {
        const sentenceInterval = setInterval(() => {
            setCurrentSentence((prevSentence) => (prevSentence + 1) % 4);
        }, 250);

        return () => {
            clearInterval(sentenceInterval);
        };
    }, []);




    const generateUniqueId = () => {
        const timestamp = Date.now();
        const randomNumber = Math.random();
        const hexadecimalString = randomNumber.toString(16);

        return `id-${timestamp}-${hexadecimalString}`;
    }



    let uniqueId;

    const [isAI, setisAI] = useState(true);



    const handlesearch = (event) => {
        event.preventDefault();


        Inputxt = setInputxt(Searchinput);


        const getbotreply = async (Inputxt) => {
            try {
                const temp = await fetch('http://localhost:5000', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: Inputxt
                    })
                }).then(res => res.json());
                // setBotvalues(temp.bot.trim());
                console.log(temp.bot.trim());
                setUserandbot([...Userandbot, { value1: Inputxt, value2: temp.bot.trim() }]);
            } catch(error){
                setUserandbot([...Userandbot, { value1: Inputxt, value2: "Something went wrong" }]);
                alert(error);
            }
        }

        // console.log(Inputxt);

        uniqueId = generateUniqueId();
        setwatermark(false);

        getbotreply(Searchinput);
        setInputValues([...inputValues, Searchinput]);

        setSearchinput("");

    }


    return (
        <div className='chatcontainer'>
            <div className='chatbox'>

                <div className={user ? "user" : "bot"}>

                    <div className={watermark ? "wtrmrk" : "nowtrmrk"}>
                        Askgpt
                        <p>All your Interview preparation at one place</p>
                    </div>


                    <div>{inputValues.map((value, index) => {
                        return (
                            <div className='chtara' key={index}>
                                <div className="userquery" key={index}>

                                    <div className='iptlogo'>
                                        <img className='userlogo'
                                            src={user}
                                            alt={'user'}
                                        />
                                    </div>
                                    <div className='usr'>{value}</div>

                                </div>
                                <div className={Userandbot[index] ? "no" : "yes"}>
                                    <img className="botlogo"
                                        src={bot}
                                        alt={'bot'}
                                    />
                                    <div className='thinker'>{thinking[currentSentence]}</div>
                                </div>
                                <Chatstrip
                                    isAI={isAI}
                                    uniqueId={uniqueId}
                                    inputValues={inputValues}
                                    Botvalues={Botvalues}
                                    Userandbot={Userandbot}

                                    index={index}
                                />
                            </div>
                        )
                    })}


                    </div>

                </div>

            </div>

            <div className='userinput'>
                <form className='search' onSubmit={handlesearch}>
                    <input name='prompt' type='search' value={Searchinput} onChange={event => setSearchinput(event.target.value)} placeholder='Ask Interview related questions here ...' className='searchbar' />
                    <button type='submit' className='searchbutton' onClick={handlesearch}><img src={send} alt="send" className='searchlogo' /></button>
                </form>
            </div>
        </div>
    );
}

export default Chat;