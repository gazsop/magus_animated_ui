import { useEffect, useState } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import {IRegexErrorArray} from '../login/PageLogin'

function ErrorOverlay(props: any){
    const [errorText, setErrorText] = useState(null);
    const [showErrorOverlay, setShowErrorOverlay] = useState(false);
    
    useEffect(()=>{
      console.log("login useEffect")
      console.log(showErrorOverlay)
      console.log(props.loginError);
      
      if(props.loginError === null) {
        setShowErrorOverlay(false);
        return
      }
      setShowErrorOverlay(false);
      const newErrorText = props.loginError.map((error: IRegexErrorArray, index: number) => (<p className="my-1" key={index}>{error.msg}</p>));
      setTimeout(()=>{
        setErrorText(newErrorText)
        setShowErrorOverlay(true)
      },100)
    },[props.loginError]);

    // (props.loginError && props.loginError.length !== 0) ? true : false;
    console.log("asd")
    return (          
    <Overlay
        target={props.refObject}
        show={showErrorOverlay}
        placement="right"
        key="error-overlay"
      >
        <Tooltip className="uid-error-tooltip" key={1}>
        {errorText}
        </Tooltip>
      </Overlay>)
}

export default ErrorOverlay;