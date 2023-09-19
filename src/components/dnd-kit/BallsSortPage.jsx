import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import {
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";

export default function BallsSortPage() {
  return (
    <div className="bg-gray-300 p-4">
      <h1 className="text-3xl font-bold">BallSorter</h1>
      <section className="bg-white p-4">
        <BallContainer />
      </section>
    </div>
  );
}

function BallContainer({}) {
  const [balls, setBalls] = useState([1, 2, 3, 4, 5]);
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-row gap-5 bg-amber-200 p-4">
        <SortableContext items={balls} strategy={horizontalListSortingStrategy}>
          {balls.map((num) => (
            <Ball key={num} num={num} />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );

  function handleDragEnd(e) {
    console.log(e);
    const { active, over } = e;
    if (active.id !== over.id) {
      setBalls((prev) => {
        const oldIndex = prev.indexOf(Number(active.id));
        const newIndex = prev.indexOf(Number(over.id));
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }
}

function Ball({ num = 0 }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: num });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className="flex h-[30px] w-[30px] items-center justify-center rounded-full border bg-green-400"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {num}
    </div>
  );
}
