import PropTypes from "prop-types";
import { cn } from "#/lib/clsx.js";
import { useState } from "react";

export default function ColorPaletteContainer() {
  return (
    <section>
      <h1>ColorPalette</h1>
      <ColorPalette />
    </section>
  );
}

function ColorPalette() {
  return (
    <div className="flex flex-row">
      <ColorContainer className="bg-yellow-600">
        <Color />
        <Color />
        <Color />
        <ColorEmpty />
      </ColorContainer>
      <ColorContainer className="bg-blue-600">
        <Color />
        <Color />
        <Color />
        <ColorEmpty />
      </ColorContainer>
      <ColorContainer className="bg-green-600">
        <Color />
        <Color />
        <Color />
        <ColorEmpty />
      </ColorContainer>
    </div>
  );
}

function ColorContainer({ className, children }) {
  return (
    <div
      className={cn(
        "w-24 rounded-lg flex flex-col items-center pt-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

ColorContainer.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function Color({ className, children }) {
  const [isOver, setIsOver] = useState(false);
  const [opacity, setOpacity] = useState(true);

  return (
    <div
      className={cn("h-24 w-full m-4", className)}
      onDragEnter={(e) => {
        setIsOver(true);
      }}
      onDragLeave={(e) => {
        setIsOver(false);
      }}
    >
      <div className={cn("h-1", isOver && "bg-red-600")}></div>
      <ColorInner />
    </div>
  );
}

Color.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function ColorInner({ className, children }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      className={cn("h-full rounded-md bg-white", isDragging && "opacity-30")}
      draggable
      onDragStart={(e) => {
        setIsDragging(true);
      }}
      onDragEnd={(e) => {
        setIsDragging(false);
      }}
    >
      {children}
    </div>
  );
}

ColorInner.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function ColorEmpty({ className, children }) {
  const [isOver, setIsOver] = useState(false);
  const [opacity, setOpacity] = useState(true);

  return (
    <div
      className={cn("h-24 w-full", className)}
      onDragEnter={(e) => {
        console.log(e);
        setIsOver(true);
      }}
      onDragLeave={(e) => {
        setIsOver(false);
      }}
    >
      <div className={cn("h-1", isOver && "bg-red-600")}></div>
      <ColorInnerEmpty />
    </div>
  );
}

ColorEmpty.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function ColorInnerEmpty() {
  <div className={cn("h-full rounded-md")}></div>;
}

ColorInnerEmpty.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
