import React, { useState, useEffect } from "react";

const Printdata = (props) => {

    const [Msg, setMsg] = useState('');
    let i=0;
    const length = props.inputString.length;
    const str=props.inputString;

    const style = {
        background: 'rgb(123, 112, 112)'
      };
    

    useEffect(() => {
        const interval = setInterval(() => {
            if(i<length){
                setMsg(str.slice(0,i+1));
                
                i++;
            }else{
                clearInterval(interval);
            }
 
        },10)
        
       
        return () => {
            clearInterval(interval);
        };
        
    }, [i]);

    useEffect(()=>{
        props.datachange(Msg);
    },[Msg])



    return (
        <div  className="printing" style={style}>
            <span  className="message" style={style}>
                {Msg}
            </span>
        </div>
    );
}

export default Printdata;