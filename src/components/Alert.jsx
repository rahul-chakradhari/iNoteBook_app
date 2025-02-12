import React, { useEffect } from "react";

function Alert(props) {
  console.log("🔍 Alert Component Props:", props.alert); // Debug Log

  const capitalize = (word) => {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  };

  useEffect(() => {
    if (props.alert) {
      const timer = setTimeout(() => {
        props.clearAlert(); // Assuming clearAlert clears the alert state
      }, 3000); // 3 seconds for the alert to disappear
      return () => clearTimeout(timer);
    }
  }, [props.alert]);

  return (
    <div style={{ height: "50px" }}>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
