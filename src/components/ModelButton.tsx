"use client";
import { Modal, Button } from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ConfirmationModal = ({ show, handleClose, handleConfirm }: any) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Start Game Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to start the game?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="warning"
          className="text-light"
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
        >
          Start
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function ModelButton() {
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
          Start Game
        </Button>
      </div>

      <ConfirmationModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        handleConfirm={startGame}
      />
    </>
  );
}
