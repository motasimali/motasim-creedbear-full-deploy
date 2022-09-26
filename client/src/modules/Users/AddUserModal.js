import style from "./UserModalStyles";
import { useState } from "react";
import { connect } from "react-redux";
import { addUser } from "../../redux/actions/users-actions";
import {
  Stack,
  TextField,
  Typography,
  Button,
  Box,
  Modal,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";

function AddUserModel(props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
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
    setLoading(true);
    props
      .addUser(form)
      .then((res) => {
        setOpen(false);
      })
      .catch((err) => {
        setErrors(err.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const closeModal = () => {
    if (!loading) {
      setOpen(false);
    }
  };
  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(!open)}>
        Add User
      </Button>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User
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
              fullWidth
              error={!!errors.email}
              onChange={(e) => setField("email", e.target.value)}
              id="outlined-error"
              label="Email"
              defaultValue={props.toEdit?.row?.email}
              helperText={errors.email?.map((err, index) => {
                if (index === errors.email.length) return err;
                else return err + "\n";
              })}
            />
            <TextField
              disabled={loading}
              fullWidth
              error={!!errors.first_name}
              onChange={(e) => setField("first_name", e.target.value)}
              id="outlined-error"
              label="First Name"
              defaultValue={props.toEdit?.row?.first_name}
              helperText={errors.first_name?.map((err, index) => {
                if (index === errors.first_name.length) return err;
                else return err + "\n";
              })}
            />
            <TextField
              disabled={loading}
              fullWidth
              error={!!errors.last_name}
              onChange={(e) => setField("last_name", e.target.value)}
              id="outlined-error"
              label="Last Name"
              defaultValue={props.toEdit?.row?.last_name}
              helperText={errors.last_name?.map((err, index) => {
                if (index === errors.last_name.length) return err;
                else return err + "\n";
              })}
            />
            <Stack spacing={2} direction="row">
              <Button variant="text" onClick={closeModal}>
                Cancel
              </Button>
              <LoadingButton
                style={{ width: "120px" }}
                variant="contained"
                type="submit"
                loading={loading}
                loadingPosition="start"
                startIcon={<SaveIcon />}
              >
                Save
              </LoadingButton>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    addUser: (user) => dispatch(addUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddUserModel);
