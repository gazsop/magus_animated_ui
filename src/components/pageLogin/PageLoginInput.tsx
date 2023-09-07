import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { IRegexErrorArray } from "./PageLogin_FORMAL";

function PageLoginInput(props: any) {
  const [errorText, setErrorText] = useState(null);
  const [showErrorOverlay, setShowErrorOverlay] = useState(false);
  
  useEffect(()=>{    
    if(props.loginError === null) {
      setShowErrorOverlay(false);
      return
    }
    setShowErrorOverlay(false);
    const newErrorText = props.loginError.map((error: IRegexErrorArray, index: number) => (<p className="my-1 w-100 text-center fw-bold text-danger" key={index}>{error.msg}</p>));
    setTimeout(()=>{
      setErrorText(newErrorText)
      setShowErrorOverlay(true)
    },100)
  },[props.loginError]);
  return (
    <>
      <label className="my-1 control-label w-100 text-center">{props.labelText}</label>
      {showErrorOverlay && errorText}
      <Form.Group controlId="formUserName" className="w-100 mt-2">
        <Form.Control
          type={props.inputType}
          ref={props.userUIdRef}
          autoFocus={true}
          autoComplete={"off"}
          placeholder={props.placeholder}
          // onKeyDown={e=>console.log(e)} //code/key: "Enter", keyCode/which: 13
          onKeyDown={(e) => e.key === "Enter" && props.onEnterKeyDown(e)} //code/key: "Enter", keyCode/which: 13
          onFocus={(e) =>
            e.target.value !== "" &&
            setTimeout(() => {
              props.setLoginError(null);
            }, 2000)
          }
        />
      </Form.Group>
    </>
  );
}
export default PageLoginInput;
