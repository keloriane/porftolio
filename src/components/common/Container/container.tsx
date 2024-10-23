import React from "react";

interface GridContainerProps {
  children: React.ReactNode;
  columns: number;
  gap?: string | number;
  className?: string;
}

const GridContainer: React.FC<GridContainerProps> = ({
  children,
  columns,
  gap = "0",
  className = "",
}) => {
  const colClass = `grid-cols-${columns}`;
  const gapClass = `gap-${gap}`;

  return (
    <div className={`grid ${colClass} ${gapClass} ${className}`}>
      {children}
    </div>
  );
};

export default GridContainer;
