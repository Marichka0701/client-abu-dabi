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

            // console.log(state.selectedDroneId, 'selectedDroneId')
            // console.log(action.payload, 'action.payload')
            // const objWithSelectedDroneId = state.whiteDrones.filter(item => item.droneId === state.selectedDroneId);
            // console.log(objWithSelectedDroneId);
            // const otherObjects = state.whiteDrones.filter(item => item.droneId !== state.selectedDroneId);
            // console.log(otherObjects);
            // console.log([objWithSelectedDroneId, ...otherObjects]);
            // state.whiteDrones = [objWithSelectedDroneId, ...otherObjects];

            // state.whiteDrones = state.whiteDrones.sort((a, b) => {
            //     if (a.droneId === state.selectedDroneId) return -1; // Помістити об'єкт з id 42 на перше місце
            //     if (b.droneId === state.selectedDroneId) return 1;
            //     return 0;
            // });
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