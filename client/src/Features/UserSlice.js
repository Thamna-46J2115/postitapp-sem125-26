import { createSlice } from "@reduxjs/toolkit";

import { UsersData } from "../ExampleData";

//const initialState = { value: [] }; //list of user is an object with empty array as initial value

const initialState = { value: UsersData }; //Assign the data from the exampleData

console.log(initialState);

export const userSlice = createSlice({
  name: "users", //name of the state

  initialState, // initial value of the state

  reducers: {
    addUser: (state, action) => {
      //state is the current value of the state, action is triggered outside the reducer and provides a value as payload

      state.value.push(action.payload); //the payload is the value coming from the component, add the payload to the state
    },

    deleteUser: (state, action) => {
      //create a new array with the value that excludes the user with the email value from the action payload, and assign the new array to the state.

      state.value = state.value.filter((user) => user.email !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions; //export the function

export default userSlice.reducer;
