import { createContext } from "react";

const initialState = Array(6).fill(false);

export const CourseFilterContext = createContext({ initialState });
