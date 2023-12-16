"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRecoilState } from "recoil";
import {
  displayUserNameAtom,
  openTipsAtom,
  userNameAtom,
} from "../recoil/atom";
import { checkUserName, createUser } from "../func/api";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [displayUserName, setDisplayUserName] =
    useRecoilState(displayUserNameAtom);
  const [nameForm, setNameForm] = React.useState("");
  const [openTips, setOpenTips] = useRecoilState(openTipsAtom);
  // UserNameがからの時このダイアログをひらく
  React.useEffect(() => {
    if (userName == null) {
      setOpen(true);
    }
  }, [userName, open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async () => {
    const checkRequest = await checkUserName(nameForm);
    if (checkRequest.status == "ok") {
      setUserName(nameForm);
      setDisplayUserName(checkRequest.userdata.display_username);
      setOpen(false);
      setOpenTips(true);
    } else {
      if (displayUserName != "") {
        const createRequest = await createUser(
          nameForm,
          String(displayUserName)
        );
        setUserName(nameForm);
      }
    }
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        ユーザー設定
      </Button> */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ユーザー登録</DialogTitle>
        <DialogContent>
          <DialogContentText>
            すでに登録している場合は、nameだけでok
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="name"
            type="text"
            fullWidth
            variant="standard"
            value={nameForm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNameForm(event.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="name"
            label="displayUserName"
            type="text"
            fullWidth
            variant="standard"
            value={displayUserName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDisplayUserName(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button onClick={handleSubmit}>進む</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
