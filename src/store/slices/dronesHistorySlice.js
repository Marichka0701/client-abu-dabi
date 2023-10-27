import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeDrones: [],
    pastDrones: [],
    dronesHistory: [],
    whiteDrones: [],
    blackDrones: [],
    selectedDroneId: null,
}

const dronesHistorySlice = createSlice({
    name: 'dronesHistorySlice',
    initialState,
    reducers: {
        setWhiteDrones: (state, action) => {
            state.whiteDrones.push(action.payload);
            state.activeDrones = [...state.activeDrones, state.whiteDrones];
        },
        removeWhiteDrones: (state, action) => {
            state.whiteDrones = state.whiteDrones.filter((drone) => drone.droneId !== action.payload);
            state.activeDrones = [...state.activeDrones, state.whiteDrones.filter((drone) => drone.droneId !== action.payload)];
        },

        setBlackDrones: (state, action) => {
            state.blackDrones.push(action.payload);
            state.activeDrones = [...state.activeDrones, state.blackDrones];
        },
        removeBlackDrones: (state, action) => {
            state.blackDrones = state.blackDrones.filter((drone) => drone.droneId !== action.payload);
            state.activeDrones = [...state.activeDrones, state.blackDrones.filter((drone) => drone.droneId !== action.payload)];
        },

        setPastDrones: (state, action) => {
            state.pastDrones.push(action.payload);
        },
        addDroneToHistory: (state, action) => {
            state.dronesHistory.push(action.payload);
        },

        setSelectedDroneId: (state, action) => {
            state.selectedDroneId = action.payload;
        }
    },
});

const {actions, reducer: dronesHistoryReducer} = dronesHistorySlice;

const dronesHistoryActions = {
    ...actions,
}

export {
    dronesHistoryActions,
    dronesHistoryReducer,
}