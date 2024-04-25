import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../stores";

export const userSelector = (state: RootState) => state.users
export const profile = createSelector(userSelector, data => data.profile)
