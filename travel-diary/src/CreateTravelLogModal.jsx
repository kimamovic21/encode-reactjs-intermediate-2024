import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
    city: yup.string().required("City is required"),
    date: yup.string().required("Date is required"),
    numberOfDays: yup.number("Number of days has to be number type")
    .required("Number of days is required")
    .positive("Number of days needs to be above 0")
    .integer("Number of days needs to be an integer")
    .min(1)
    .transform((value) => Number.isNaN(value) ? null : value),
    description: yup.string()
});

const CreateTravelLogModal = ({open, handleClose, setTravelDiaries}) => {

  const {register, handleSubmit, formState: {errors}, watch } = useForm({
      resolver: yupResolver(schema),
      mode: "onBlur",
  });

  const textFieldSx = {
    margin: "10px"
  };

  console.log("e", errors);

  const onSubmit = (data) => {
    console.log(data);

    setTravelDiaries((prev) => [...prev, data]);
    handleClose();
  }

  const city = watch("city");

  return (
     <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Create travel log</DialogTitle>
        <DialogContent sx={{
          display: "flex",
          flexDirection: "column"
        }}>
          <TextField 
          variant="outlined"
          label="City" 
          sx={textFieldSx} 
          {...register("city")}
          error={!!errors?.city?.message} 
          helperText={errors?.city?.message} 
          
          />
          <TextField 
          variant="outlined" 
          label="Date" 
          sx={textFieldSx} 
          {...register("date")}
          error={!!errors?.date?.message} 
          helperText={errors?.date?.message} />
          <TextField 
          variant="outlined" 
          label="Number of days" 
          sx={textFieldSx} 
          {...register("numberOfDays")}
          error={!!errors?.numberOfDays?.message} 
          helperText={errors?.numberOfDays?.message}
          />
          <TextField 
          variant="outlined" 
          label="description" 
          sx={textFieldSx} 
          {...register("description")}
          error={!!errors?.description?.message} 
          helperText={errors?.description?.message}
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
     </Dialog>
  )
};

export default CreateTravelLogModal;