import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop.js";
import styles from "./Modal.module.css";

const ModalOverlay = (props) => {
    
    const formDefaultHandler = (event) => {
        event.preventDefault()
    }

  const content = (
    <div
      className={`${styles["modal"]} ${props.className}`}
      style={props.style}
    >
      <header className={`${styles["modal__header"]} ${props.headerClassName}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : formDefaultHandler}>
        <div
          className={`${styles["modal__content"]} ${props.contentClassName}`}
        >
          {props.children}
        </div>
        <footer
          className={`${styles["modal__footer"]} ${props.footerClassName}`}
        >
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={styles.modal}
      >
        <ModalOverlay {...props}/>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
