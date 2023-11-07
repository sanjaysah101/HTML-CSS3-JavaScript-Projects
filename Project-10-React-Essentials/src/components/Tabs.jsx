import React from "react";

function Tabs({ children, buttons, ButtonContainer = "menu" }) {
  return (
    <>
      <ButtonContainer>{buttons}</ButtonContainer>
      {children}
    </>
  );
}

export default Tabs;
