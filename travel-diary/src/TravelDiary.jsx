import { Box, Button } from "@mui/material";
import { useState } from "react";
import CreateTravelLogModal from "./CreateTravelLogModal";

const TravelDiary = () => {
  const [isCreatedLogModalOpen, setIsCreatedLogModalOpen] = useState(false);
  const [travelDiaries, setTravelDiaries] = useState([]);

  return (
    <Box>
      <h1>Travel diary</h1>
      <Button variant="contained" onClick={() => setIsCreatedLogModalOpen(true)}>+ Add log</Button>
      <CreateTravelLogModal
           open={isCreatedLogModalOpen}
           handleClose={() => setIsCreatedLogModalOpen(false)}
           setTravelDiaries={setTravelDiaries}
           />
    </Box>
  )
};

export default TravelDiary;