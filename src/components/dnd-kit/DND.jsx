import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "#/lib/clsx.js";

export default function DND() {
  const [balls, setBalls] = useState([1, 2, 3, 4, 5]);
  const [holder, setHolder] = useState([]);

  return (
    <DndContext
      onDragStart={(e) => {
        console.log("START", e);
      }}
      onDragEnd={(e) => {
        console.log("END", e);
        const newBalls = balls.filter((num) => num !== Number(e.active.id[1]));
        setBalls(newBalls);
      }}
      onDragOver={(e) => {
        console.log("OVER", e);
      }}
    >
      <div>Balls</div>
      <div className="flex gap-4 border p-4">
        {balls.map((num) => (
          <Ball key={num} num={num} />
        ))}
      </div>
      <div>Holder</div>
      <Holder />
    </DndContext>
  );
}

function Ball({ num }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({ id: `B${num}` });

  return (
    <div
      className="flex h-[30px] w-[30px] items-center justify-center rounded-full border"
      {...attributes}
      {...listeners}
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
      }}
    >
      {num}
    </div>
  );
}

function Holder() {
  const { setNodeRef, isOver, isOverCurrent } = useDroppable({
    id: `H0`,
  });

  return (
    <div
      className={cn("h-[30px] w-[30px] border", isOver && "bg-gray-500")}
      ref={setNodeRef}
    ></div>
  );
}
