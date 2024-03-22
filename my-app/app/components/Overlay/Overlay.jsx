import Styles from "./Overlay.module.css";

export const Overlay = (props) => {
  return (
    <div
      onClick={props.closePopup} className={`${Styles["overlay"]} ${props.isOpened && Styles["overlay_is-opened"]}`  }
    ></div>
  );
};