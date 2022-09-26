import { Avatar, Box, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { auth } = useAuth();
  return (
    <Box>
      <Typography variant="h4" component="h22">
        Profile
      </Typography>
      {auth.user && (
        <Box sx={{ my: 1 }}>
          <Avatar alt={auth.user?.avatar} src={auth.user?.avatar} />
          <h4>
            {auth.user?.first_name} {auth.user?.last_name}
          </h4>
          <h4>{auth.user?.email}</h4>
        </Box>
      )}
    </Box>
  );
};

export default Profile;
