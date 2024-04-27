import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const withDnDContext = (WrappedComponent) => {
  const WithDnDContext = (props) => {
    return (
      <DndProvider backend={HTML5Backend}>
        <WrappedComponent {...props} />
      </DndProvider>
    );
  };

  return WithDnDContext;
};

export default withDnDContext;
