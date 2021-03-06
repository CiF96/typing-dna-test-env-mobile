import React, { Children, ReactNode } from "react";

export interface ListLayoutProps {
  children: ReactNode;
  separator: ReactNode;
}

/**
 * List layout requires children.
 * It renders a separator between every child.
 */
export function ListLayout({ children, separator = null }: ListLayoutProps) {
  const withSeparator = (
    <>
      {Children.map(children, (child, index) => {
        return (
          <>
            {index > 0 && separator}
            {child}
          </>
        );
      })}
    </>
  );

  if (withSeparator == null) {
    throw new Error("Invalid data passed to ListLayout");
  }

  return withSeparator;
}
