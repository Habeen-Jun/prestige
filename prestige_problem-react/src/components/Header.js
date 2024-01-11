import { Box, Typography } from "@mui/material";

const Header = ({ name }) => {

  return (
    <>
      <Box sx={{}}>
        <Typography sx={{ fontSize: "1.5rem", fontWeight: "800" }}>
          {name} 
        </Typography>
      </Box>
    </>
  );
};

export default Header;
