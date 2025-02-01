import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

import axiosInstance from "../axios-instance";
import RecipeCard from "../components/RecipeCard";
import CreateEditRecipe from "../components/CreateEditRecipe";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../redux/recipeSlice";

const RecipeOverview = () => {
    const [open, setOpen] = useState(false);
    const [isDeleteRecipeModalOpen, setIsDeleteRecipeModalOpen] = useState(false);
    const [recipeToDelete, setRecipeToDelete] = useState('');
    const [recipeToEdit, setRecipeToEdit] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch = useDispatch();
    const recipes = useSelector((state) => state.recipes.recipes);

    const getRecipes = async () => {
        const response = await axiosInstance.get('/');
        console.log(response);
        if (response.status === 200) {
            dispatch(setRecipes(response.data));
        }
    }

    useEffect(() => {
        getRecipes();
    }, []);

    return (
        <div>
            <Button variant="contained" onClick={() => setOpen(true)}>+ Add recipe</Button>
            <Box display="flex" alignItems="flex-start" sx={{ marginTop: '30px' }}>
                {recipes.map(recipe => (
                    <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        setRecipeToEdit={(recipe) => {
                            setRecipeToEdit(recipe);
                            setIsEditMode(true);
                            setOpen(true);
                        }}
                        onDelete={() => {
                            setIsDeleteRecipeModalOpen(true);
                            setRecipeToDelete(recipe);
                        }}
                    />
                ))}
            </Box>
            <CreateEditRecipe
                open={open}
                handleClose={() => setOpen(false)}
                isEditMode={isEditMode}
                recipeToEdit={recipeToEdit}
            />
            <ConfirmDeleteDialog
                open={isDeleteRecipeModalOpen}
                handleClose={() => setIsDeleteRecipeModalOpen(false)}
                recipeToDelete={recipeToDelete}
            />
        </div>
    )
};

export default RecipeOverview;