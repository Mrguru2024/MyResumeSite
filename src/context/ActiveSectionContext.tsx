import { createContext } from "react";

export const ActiveSectionContext = createContext({
  active: 0,
  setActive: (i: number) => {},
});
