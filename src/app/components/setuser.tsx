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
import { Alert, Snackbar } from "@mui/material";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [displayUserName, setDisplayUserName] =
    useRecoilState(displayUserNameAtom);
  const [nameForm, setNameForm] = React.useState("");
  const [openTips, setOpenTips] = useRecoilState(openTipsAtom);

  const [errorNull, setErrorNull] = React.useState(false);
  // UserNameがからの時このダイアログをひらく
  React.useEffect(() => {
    if (userName == "") {
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
    console.log(userName);

    if (nameForm != "") {
      setErrorNull(false);
      const checkRequest = await checkUserName(nameForm);
      console.log(checkRequest);

      if (checkRequest.status == "ok") {
        setUserName(nameForm);
        setDisplayUserName(checkRequest.userdata.display_username);
        setOpen(false);
        setOpenTips(true);
      } else {
        const createRequest = await createUser(nameForm, "なし");
        handleSubmit();
      }
    } else {
      setErrorNull(true);
    }
  };
  const [openWer, setOpenWer] = React.useState(true);
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        ユーザー設定
      </Button> */}

      <Dialog open={open} onClose={handleClose}>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={openWer}
          autoHideDuration={8000}
          onClose={() => {
            setOpenWer(false);
          }}
        >
          <Alert
            onClose={() => {
              setOpenWer(false);
            }}
            severity="error"
            // icon={<TipsAndUpdatesIcon />}
            sx={{ width: "100%" }}
          >
            サーバーサイド応答なし:
            <br />
            サンプルモードのため動作しない機能があります。
          </Alert>
        </Snackbar>
        <DialogTitle>なまえを決めよう！</DialogTitle>
        <DialogContent>
          <DialogContentText>10文字以内で設定できます</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="名前"
            type="text"
            fullWidth
            variant="standard"
            value={nameForm}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setNameForm(event.target.value);
            }}
            error={errorNull}
            helperText={errorNull && "ユーザー名を入力してください"}
          />
          {/* <TextField
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
          /> */}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Cancel</Button> */}
          <Button onClick={handleSubmit}>決定</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
