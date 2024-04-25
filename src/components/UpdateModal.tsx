import { Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { userSelector } from "../redux-store/users/selector";

interface IProps {
  show: boolean;
  handleClose: () => void;
}

export default function UpdateModal({ show, handleClose }: IProps) {
  const { authorStatus, quoteStatus } = useSelector(userSelector);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Requesting the quote</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Step 1: Requesting author.. {authorStatus}</p>
        <p>Step 2: Requesting quote.. {quoteStatus}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
