import React, { useState, useEffect } from "react";
import './Chatstrip.css';
import bot from '../assets/bot.svg';



const Chatstrip = (props) => {


    return (
        <div className="chatstrp">
            <div className={props.isAI ? "wrapper" : "wrapperai"}>
                <div className="chat">


                    <div className="dataa">


                        {props.Userandbot.map((input, index) => {

                            return (

                                
                                <div key={index} >

                                    {((props.Userandbot[props.index]) ?
                                        ((index === props.index) ? (<div className="txt">
                                            <div className="profile" >
                                                <img className="botlogo"
                                                    src={bot}
                                                    alt={'bot'}
                                                />
                                            </div>
                                            <div className="botans" key={props.uniqueID}>{input.value2}</div>
                                        </div>) : (<div></div>)) : (<div></div>))}
                                </div>
                            )
                        })}




                    </div>
                </div>
            </div>
        </div>
    );



}

export default Chatstrip;