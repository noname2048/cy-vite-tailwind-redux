import { DndContext, Draggable } from "@dnd-kit/core";

function Dragging() {
  return (
    <div>
      <header>
        <h1>Dragging</h1>
      </header>
      <DndContext>
        <div></div>
      </DndContext>
    </div>
  );
}

export default Dragging;
