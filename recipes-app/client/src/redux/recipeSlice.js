import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../axios-instance';

export const createRecipe = createAsyncThunk(
    'recipes/createRecipe',
    async (data) => {
        const response = await axiosInstance.post('/', data);

        return response.data;
    }
);

export const editRecipe = createAsyncThunk(
    'recipes/editRecipe',
    async (data) => {
        const response = await axiosInstance.put(`/${data.id}`, data);

        return response.data;
    }
);

export const deleteRecipe = createAsyncThunk(
    'recipes/deleteRecipe',
    async (id) => {
        const response = await axiosInstance.delete(`/${id}`);

        return id;
    }
);

const recipeSlice = createSlice({
    name: 'recipes',
    initialState: {
        recipes: [],
    },
    reducers: {
        setRecipes: (state, action) => {
            const recipes = action.payload;
            state.recipes = recipes;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createRecipe.fulfilled, (state, action) => {
            const recipe = action.payload;

            state.recipes.push(recipe);
        })
        .addCase(editRecipe.fulfilled, (state, action) => {
            const editedRecipe = action.payload;

            const recipeIndex = state.recipes.findIndex(recipe => recipe.id === editedRecipe.id);

            state.recipes[recipeIndex] = editedRecipe;
        })
        .addCase(deleteRecipe.fulfilled, (state, action) => {
            const recipeToDeleteId = action.payload;

            state.recipes = state.recipes.filter((recipe) => recipe.id !== recipeToDeleteId);
        })
    }
});

export const { setRecipes } = recipeSlice.actions;

export default recipeSlice.reducer;