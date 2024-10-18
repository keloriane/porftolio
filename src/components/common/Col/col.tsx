import React from "react";

interface ColumnProps {
  children: React.ReactNode;
  colStart: number | number[];
  colEnd: number | number[];
  className?: string;
}

const Column: React.FC<ColumnProps> = ({
  children,
  colStart,
  colEnd,
  className = "",
}) => {
  // Handle responsive colStart and colEnd
  const colStartClasses = Array.isArray(colStart)
    ? colStart
        .map((col, index) => {
          const breakpoint = ["", "sm:", "md:", "lg:", "xl:", "2xl:"][index];
          return `${breakpoint}col-start-${col}`;
        })
        .join(" ")
    : `col-start-${colStart}`;

  const colEndClasses = Array.isArray(colEnd)
    ? colEnd
        .map((col, index) => {
          const breakpoint = ["", "sm:", "md:", "lg:", "xl:", "2xl:"][index];
          return `${breakpoint}col-end-${col}`;
        })
        .join(" ")
    : `col-end-${colEnd}`;

  return (
    <div
      className={`relative ${colStartClasses} ${colEndClasses} ${className}`}
    >
      {children}
    </div>
  );
};

export default Column;
