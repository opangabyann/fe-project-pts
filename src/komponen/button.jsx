import React from "react";

export default function Button({buttonStyle, title, text = "",color = "red", disabled, ...props }) {
    return (
      <React.Fragment>
        <button
          disabled={disabled}
          {...props}
         style = {{
          backgroundColor : color
         }}
          className={`${buttonStyle}`}
        >
          {title}
        </button>
      </React.Fragment>
    );
  }