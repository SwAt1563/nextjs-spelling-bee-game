"use client";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ConfirmationModal = ({
  show,
  handleClose,
  handleConfirm,
  content,
}: any) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{content.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{content.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {content.cancelButton}
        </Button>
        <Button
          variant="warning"
          className="text-light"
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
        >
          {content.startButton}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function ModelButton({
  content,
}: {
  content: Record<string, string>;
}) {
  const [modalShow, setModalShow] = useState(false);
  const router = useRouter();
  const startGame = () => {
    router.push("/game");
  };

  return (
    <>
      <div className="d-flex justify-content-center justify-content-md-end p-3">
        <Button
          className="text-light"
          variant="warning"
          onClick={() => setModalShow(true)}
        >
          {content.startGameButton}
        </Button>
      </div>

      <ConfirmationModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleConfirm={startGame}
        content={content}
      />
    </>
  );
}
