import { createAction } from "@ngrx/store";

export const isLoadingAction   = createAction('[UI Component] Loading State');
export const stopLoadingAction = createAction('[UI Component] Stop loading')