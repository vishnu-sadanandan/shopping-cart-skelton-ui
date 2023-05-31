import React, { useContext } from "react";
import styles from "./HeaderCartButton.module.css";
import AuthContext from "../../../store/auth-context";

const HeaderCartButton = (props) => {
  const useAuthContext = useContext(AuthContext)
  return (
    <>
      <button className={styles.button} onClick={useAuthContext.onLogout}>
        <span>Log Out</span>
      </button>
    </>
  );
};

export default HeaderCartButton;
