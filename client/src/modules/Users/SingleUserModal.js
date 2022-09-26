import style from "./UserModalStyles";
import { Typography, Box, Modal, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

function SingleUserModal(props) {
  const navigate = useNavigate();
  const navigateBackAndCloseModal = () => {
    props.setViewRow(false);
    navigate("/users");
  };
  return (
    <div>
      <Modal
        open={props.viewRow}
        onClose={navigateBackAndCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            View User
          </Typography>
          {props.toView && (
            <Box sx={{ my: 1 }}>
              <Avatar alt={props.toView?.avatar} src={props.toView?.avatar} />
              <h4>
                {props.toView?.first_name} {props.toView?.last_name}
              </h4>
              <h4>{props.toView?.email}</h4>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default SingleUserModal;
