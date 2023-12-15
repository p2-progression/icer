import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Card,
  CardActionArea,
  CardMedia,
  Fab,
  FormControl,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { Send, Menu, Search } from "@mui/icons-material";
import {
  parentDiscussionId,
  sendAnsQuestionDialogAtom,
  sendQuestionDialogAtom,
  userNameAtom,
} from "../recoil/atom";
import { useRecoilState } from "recoil";
import { postCreateDiscussion } from "../func/api";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SendQuestionDialog() {
  const [textForm, setTextForm] = React.useState("");
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [openSendQuestionDialog, setOpenopenSendQuestionDialog] =
    useRecoilState(sendQuestionDialogAtom);
  const [discussionId, setDiscussionId] = useRecoilState(parentDiscussionId);
  const [sendAnsQuestionDialog, setsendAnsQuestionDialog] = useRecoilState(
    sendAnsQuestionDialogAtom
  );

  const handleClickOpen = () => {
    setOpenopenSendQuestionDialog(true);
  };

  const handleClose = () => {
    setOpenopenSendQuestionDialog(false);
  };
  const handleSend = async () => {
    if (userName !== null) {
      const sendReaponse = await postCreateDiscussion({
        user_id: userName,
        content: textForm,
      });
      setDiscussionId(sendReaponse);
      handleClose();
      setsendAnsQuestionDialog(true);
    }
  };
  return (
    <React.Fragment>
      <Fab
        onClick={handleClickOpen}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        color="primary"
        aria-label="add"
      >
        <CloseIcon />
      </Fab>
      <Dialog
        fullScreen
        open={openSendQuestionDialog}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              送信画面
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <List sx={{ maxWidth: 345, background: "rgba(255,255,255,0.5)" }}>
          <Card sx={{ maxWidth: 345, background: "rgba(255,255,255,0.5)" }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="500"
                width="auto"
                image="/penguin.png"
                alt="green iguana"
              />
            </CardActionArea>
          </Card>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <TextField
              id="content"
              label="質問"
              multiline
              minRows={2}
              maxRows={4}
              value={textForm}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTextForm(event.target.value);
              }}
              variant="filled"
            />
            <Button onClick={handleSend} variant="contained" endIcon={<Send />}>
              Send
            </Button>
          </Paper>
        </List>
      </Dialog>
    </React.Fragment>
  );
}
