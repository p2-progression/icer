import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Avatar,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Fab,
  FormControl,
  Grid,
  InputAdornment,
  InputBase,
  InputLabel,
  ListItemAvatar,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { Send, Menu, Search } from "@mui/icons-material";
import Ansperson from "./ans";
import QuestionCard from "./question";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SendAnsQuesrion() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Fab
        onClick={handleClickOpen}
        sx={{ position: "absolute", bottom: 16, left: 16 }}
        color="primary"
        aria-label="add"
      >
        <CloseIcon />
      </Fab>
      <Dialog
        fullScreen
        open={open}
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
              回答画面
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Container>
          <List>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListItem>
                <ListItemAvatar>
                  <Avatar>{/* ここに画像 */}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="名無しのペンギン"
                  secondary="Jan 9, 2014"
                />
              </ListItem>
            </List>

            {/* ここからメインコンテンツ　 */}
            <QuestionCard />
            {/* 回答をループ */}
            <Ansperson />
            <Ansperson />
            <Ansperson />
            {/* 送信フォーム */}
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
                label="回答"
                multiline
                minRows={2}
                maxRows={4}
                variant="filled"
              />
              <Button variant="contained" endIcon={<Send />}>
                Send
              </Button>
            </Paper>
          </List>
        </Container>
      </Dialog>
    </React.Fragment>
  );
}
