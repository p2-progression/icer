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
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Container,
  Fab,
  FormControl,
  Grid,
  Grow,
  InputAdornment,
  InputBase,
  InputLabel,
  ListItemAvatar,
  OutlinedInput,
  Paper,
  TextField,
  Zoom,
} from "@mui/material";
import { Send, Menu, Search } from "@mui/icons-material";
import { Ansperson } from "./ans";
import { QuestionCard } from "./question";
import {
  getdiscussionAllDataAtom,
  parentDiscussionIdAtom,
  sendAnsQuestionDialogAtom,
  userNameAtom,
} from "../recoil/atom";
import { useRecoilState } from "recoil";
import dayjs from "dayjs";
import { getDiscussionAll, postCreateChild } from "../func/api";
import { iseeCheck } from "../func/isee";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

export default function SendAnsQuesrion() {
  const [open, setOpen] = useRecoilState(sendAnsQuestionDialogAtom);
  const [textForm, setTextForm] = React.useState("");
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [discussionAll, setDiscussionAll] = useRecoilState(
    getdiscussionAllDataAtom
  );
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = async () => {
    if (textForm != "" && userName && discussionId) {
      await postCreateChild({
        user_id: userName,
        parent_discussion_id: discussionId,
        content: textForm,
      });
      // 更新かける
      const getdata = await getDiscussionAll(discussionId);
      setDiscussionAll(getdata);
    } else {
      // エラーを吐く予定
    }
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
        <Box
          component="div"
          sx={{ backgroundImage: "linear-gradient(#00a3ff, #ffffff);" }}
        >
          <Fab
            onClick={handleClose}
            sx={{ position: "fixed", top: 16, right: 16 }}
            color="primary"
            aria-label="add"
          >
            <CloseIcon />
          </Fab>

          <Container>
            <List>
              <List
                sx={{
                  position: "absolute",
                  top: 16,
                  left: 0,
                  width: "100%",
                  maxWidth: 345,
                  background: "rgba(255,255,255,0)",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{/* ここに画像 */}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      discussionAll.find((ele) => ele.is_parent == 1)
                        ?.user_id || "名無しのペンギン"
                    }
                  />
                </ListItem>
              </List>
              <Box my={8} component="div"></Box>
              {/* ここからメインコンテンツ */}
              <QuestionCard
                content={
                  discussionAll.find((ele) => ele.is_parent == 1)?.content || ""
                }
              />

              {/* 回答をループ */}
              <h1>level:{iseeCheck(discussionAll)}</h1>

              {discussionAll.map((ele, index) => {
                if (ele.is_parent == 0) {
                  return <Ansperson key={index} item={ele} />;
                }
              })}
              <Box component="div" mt={15}></Box>
            </List>
          </Container>
          <Box
            component="div"
            px={1}
            sx={{
              position: "fixed",
              bottom: 10,
              width: "100%",
            }}
          >
            <Box
              component="div"
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ minWidth: 275, background: "rgba(255,255,255,0)" }}
              my={2}
            >
              {/* 送信フォーム */}
              {discussionAll.find((ele) => ele.is_parent == 1)?.user_id !=
                userName && (
                <Paper
                  component="form"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    width: 400,
                    boxShadow: 3,
                  }}
                >
                  <TextField
                    sx={{
                      margin: "10px 5px 10px 5px",
                      width: "50%",
                      height: "auto",
                    }}
                    id="content"
                    label="カイトウ"
                    multiline
                    minRows={1}
                    maxRows={6}
                    variant="filled"
                    value={textForm}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setTextForm(event.target.value);
                    }}
                  />
                  <Button
                    sx={{ marginLeft: "auto", marginRight: "20px" }}
                    onClick={handleSend}
                    variant="contained"
                    endIcon={<TipsAndUpdatesIcon />}
                  >
                    カイトウ
                  </Button>
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
