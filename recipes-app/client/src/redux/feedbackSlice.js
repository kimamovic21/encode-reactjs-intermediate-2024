import { createSlice } from "@reduxjs/toolkit";
import { createRecipe, deleteRecipe, editRecipe } from "./recipeSlice";

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        data: {
            type: '',
            message: ''
        }
    },
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(createRecipe.fulfilled, (state, action) => {
                state.data = {
                    type: 'success',
                    message: 'Recipe added successfully!'
                }
            })
            .addCase(createRecipe.rejected, (state, action) => {
                state.data = {
                    type: 'error',
                    message: 'Could not add recipe'
                }
            })

            .addCase(editRecipe.fulfilled, (state, action) => {
                state.data = {
                    type: 'success',
                    message: 'Recipe edited successfully!'
                }
            })
            .addCase(editRecipe.rejected, (state, action) => {
                state.data = {
                    type: 'error',
                    message: 'Could not edit recipe'
                }
            })
            .addCase(deleteRecipe.fulfilled, (state, action) => {
                state.data = {
                    type: 'success',
                    message: 'Recipe deleted successfully!'
                }
            })
            .addCase(deleteRecipe.rejected, (state, action) => {
                state.data = {
                    type: 'error',
                    message: 'Could not delete recipe'
                }
            })
    }
});

export const { setData } = feedbackSlice.actions;

export default feedbackSlice.reducer;