import { Dialog, DialogActions, DialogTitle, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../redux/recipeSlice";
import { isFulfilled } from "@reduxjs/toolkit";

const ConfirmDeleteDialog = ({ handleClose, open, recipeToDelete }) => {

    const dispatch = useDispatch();

    const handleDeleteRecipe = async () => {
        const response = await dispatch(deleteRecipe(recipeToDelete.id));

        if(isFulfilled(response)) {
            handleClose();
        }
    }

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Are you sure you want to delete this recipe?</DialogTitle>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="error" onClick={handleDeleteRecipe}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmDeleteDialog;