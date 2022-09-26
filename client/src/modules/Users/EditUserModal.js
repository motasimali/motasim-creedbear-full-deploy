import style from "./UserModalStyles";
import { useState } from "react";
import { connect } from "react-redux";
import { modifyUser } from "../../redux/actions/users-actions";
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

function EditUserModal(props) {
  const [form, setForm] = useState(props?.toEdit?.row);
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
      .modifyUser(Object.assign(props.toEdit.row, form))
      .then((res) => props.setEditRow(false))
      .catch((err) => {
        console.log(err.errors);
        setErrors(err.errors);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const closeModal = () => {
    if (!loading) {
      props.setEditRow(false);
    }
  };
  return (
    <div>
      <Modal
        open={props.editRow}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit User
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
    modifyUser: (user) => dispatch(modifyUser(user)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditUserModal);
