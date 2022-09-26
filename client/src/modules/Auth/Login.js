import { Box, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api";
import useAuth from "../../hooks/useAuth";
import LoadingButton from "@mui/lab/LoadingButton";
import PersonIcon from "@mui/icons-material/Person";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const prevLocation = location?.state?.pathname;
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const { setAuth } = useAuth();
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrMsg("");
    setLoading(true);
    try {
      const { data } = await api.login(form.email);
      setAuth({ isLoggedIn: true, ...data });
      prevLocation ? navigate(prevLocation) : navigate("/");
    } catch (err) {
      err.response.status === 401
        ? setErrMsg("Unauthorized")
        : setErrors(err.response?.data?.errors);
      setLoading(false);
    }
  };
  return (
    <Box>
      <Typography variant="h6" component="h2">
        Login User
      </Typography>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { my: 1 },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          disabled={loading}
          onFocus={() => setErrMsg("")}
          error={!!errors.email}
          onChange={(e) => setField("email", e.target.value)}
          id="outlined-error"
          label="Email"
          helperText={errors.email?.map((err, index) => {
            if (index === errors.email.length) return err;
            else return err + "\n";
          })}
        />

        <Stack spacing={2} direction="row">
          <LoadingButton
            style={{ width: "120px" }}
            variant="contained"
            type="submit"
            loading={loading}
            loadingPosition="start"
            startIcon={<PersonIcon />}
          >
            Login
          </LoadingButton>
        </Stack>
        {errMsg && (
          <Typography variant="h6" color="error" component="h2">
            Error: {errMsg}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Login;
