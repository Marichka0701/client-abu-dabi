import {configureStore} from "@reduxjs/toolkit";

import {dronesHistoryReducer} from "./slices/dronesHistorySlice";

export const store = configureStore({
    reducer: {
        dronesHistory: dronesHistoryReducer,
    }
})