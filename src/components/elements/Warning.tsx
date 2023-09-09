import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useApp } from "../../core/App";

export function WarningWindow() {
  const {getAppData} = useApp();
  const [showError, setShowError] = useState<boolean>(false)
  return (
    <Modal show={showError} backdrop={"static"} keyboard={true} onHide={()=> setShowError(!showError)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        I will not close if you click outside me. Don't even try to press escape
        key.
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
