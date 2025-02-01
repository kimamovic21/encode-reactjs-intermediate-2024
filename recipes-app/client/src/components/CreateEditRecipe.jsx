import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from "react-redux";
import { createRecipe, editRecipe } from "../redux/recipeSlice";
import { isFulfilled } from "@reduxjs/toolkit";

const CreateRecipe = ({ open, handleClose, recipeToEdit, isEditMode }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [prepTime, setPrepTime] = useState('');
    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('');
    const [ingredients, setIngredients] = useState([""]);

    const dispatch = useDispatch();

    const textFieldStyle = {
        margin: '10px'
    }

    useEffect(() => {
        if (isEditMode) {
            setTitle(recipeToEdit?.title);
            setDescription(recipeToEdit?.description);
            setImage(recipeToEdit?.image);
            setPrepTime(recipeToEdit?.prepTime);
            setIngredients(recipeToEdit?.ingredients);
        }
    }, [isEditMode]);

    const convertImageToBase64 = (files) => {
        const fileReader = new FileReader();

        fileReader.onload = (fileLoadedEvent) => {
            const base64Image = fileLoadedEvent.target.result;

            setFileName(files[0]?.name);
            setImage(base64Image);
        }

        fileReader.readAsDataURL(files[0]);
    }

    const addIngredient = () => {
        setIngredients((prevState) => [...prevState, ""]);
    }

    const updateIngredient = (newValue, position) => {
        // SHALLOW COPY
        const ingredientsCopy = [...ingredients];

        // UPDATE ON SPECIFIC POSITION(INDEX)
        ingredientsCopy[position] = newValue;

        // UPDATE VALUE
        setIngredients(ingredientsCopy);
    }

    const reset = () => {
        setTitle("");
        setDescription("");
        setPrepTime("");
        setIngredients([""]);
        setImage("");
        setFileName("");
    };


    const createEditRecipe = async () => {

        let recipe = {
            title,
            description,
            prepTime: parseInt(prepTime, 10),
            ingredients,
            image
        }

        if (isEditMode) {
            recipe.id = recipeToEdit.id;

            const result = await dispatch(editRecipe(recipe));

            console.log(result);

            if (isFulfilled(result)) {
                reset();
                handleClose();
            }

        } else {
            recipe.id = uuidv4();

            const result = await dispatch(createRecipe(recipe));

            if (isFulfilled(result)) {
                reset();
                handleClose();
            }
        }


    }

    const removeIngredient = (position) => {
        const ingredientsCopy = [...ingredients];

        const filteredIngredients = ingredientsCopy.filter((item, index) => index !== position);

        setIngredients(filteredIngredients);
    }

    const isCreateDisabled = !title || !description || !image || !prepTime || !ingredients.every((ingredient) => !!ingredient);

    const close = () => {
        reset();
        handleClose();
    }

    return (
        <Dialog
            fullWidth
            open={open}
            onClose={close}
            PaperProps={{
                component: 'form',
                onSubmit: (event) => {
                    event.preventDefault();
                    createEditRecipe();
                }
            }}
        >
            <DialogTitle>{isEditMode ? 'Edit' : 'Add'} recipe</DialogTitle>
            <DialogContent sx={{
                display: 'grid',
            }}>
                <TextField
                    required
                    id="title"
                    name="title"
                    label="Recipe name"
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    sx={textFieldStyle}
                />
                <TextField
                    required
                    id="description"
                    name="description"
                    label="Recipe description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={textFieldStyle}
                />
                <TextField
                    required
                    id="prepTime"
                    name="prepTime"
                    label="Preparation time"
                    variant="outlined"
                    type="number"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    sx={textFieldStyle}
                    slotProps={{
                        input: {
                            endAdornment: <InputAdornment position="end">min</InputAdornment>,
                        },
                    }}
                />
                <Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {ingredients.map((ingredient, index) => (
                            <Box display="flex" alignItems="center" justifyContent="space-between" key={ingredient + index}>
                                <TextField
                                    required
                                    id={ingredient + index}
                                    name={ingredient + index}
                                    label="Ingredient"
                                    variant="outlined"
                                    value={ingredient}
                                    onChange={(e) => updateIngredient(e.target.value, index)}
                                    sx={{ ...textFieldStyle, width: '80%' }}
                                />
                                <Button disabled={ingredients.length === 1} variant="outlined" color="error" sx={{ marginRight: '10px' }} onClick={() => removeIngredient(index)}>Delete</Button>
                            </Box>
                        ))}
                    </Box>
                    <Button sx={{ float: 'right', marginRight: '10px' }} variant="outlined" onClick={() => addIngredient()}>+ Add ingredient</Button>
                </Box>

                <Box sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        sx={{
                            width: '150px',
                            marginLeft: '10px',
                            marginRight: '10px'
                        }}
                    >
                        Upload image
                        <input
                            type="file"
                            onChange={(event) => convertImageToBase64(event.target.files)}
                            style={{ display: "none" }}
                        />
                    </Button>
                    <Typography>{fileName}</Typography>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" type="submit" disabled={isCreateDisabled}>{isEditMode ? 'Edit' : 'Create'}</Button>
            </DialogActions>
        </Dialog>

    )
};

export default CreateRecipe;