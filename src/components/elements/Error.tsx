import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useApp } from "../../context/app.context";

export function FrontEndError() {
  const { getAppError } = useApp();
  const [showError, setShowError] = useState<boolean>(false);
  console.log("showError")
  console.log(showError)
  console.log("getAppError")
  console.log(getAppError)
  useLayoutEffect(() => {
    setShowError(showError);
  }, [getAppError]);
  return (
    <Modal
      show={showError}
      backdrop={"static"}
      keyboard={true}
      onHide={() => setShowError(!showError)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape key.
      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={() => {show = false}}>
          Close
        </Button>
        <Button variant="primary">Understood</Button>
      </Modal.Footer> */}
    </Modal>
  );
}
