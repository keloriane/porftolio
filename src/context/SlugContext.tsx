"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface SlugContextType {
  activeSlug: string | null;
  setActiveSlug: (slug: string | null) => void;
}

// Create the context
const SlugContext = createContext<SlugContextType>({
  activeSlug: null,
  setActiveSlug: () => {},
});

// Custom hook to use the SlugContext
export const useSlugContext = () => useContext(SlugContext);

// SlugProvider component to wrap your app
export const SlugProvider = ({ children }: { children: ReactNode }) => {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  return (
    <SlugContext.Provider value={{ activeSlug, setActiveSlug }}>
      {children}
    </SlugContext.Provider>
  );
};
