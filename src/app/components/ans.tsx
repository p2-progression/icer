import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  formatGetDiscussionItem,
  getDiscussionAll,
  postUpIsee,
} from "../func/api";
import {
  getdiscussionAllDataAtom,
  parentDiscussionIdAtom,
  userNameAtom,
} from "../recoil/atom";
import { useRecoilState } from "recoil";
import { Box, Button } from "@mui/material";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Ansperson = (props: { item: formatGetDiscussionItem }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [userName, setUserName] = useRecoilState(userNameAtom);
  const [discussionAll, setDiscussionAll] = useRecoilState(
    getdiscussionAllDataAtom
  );
  const [discussionId, setDiscussionId] = useRecoilState(
    parentDiscussionIdAtom
  );
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleUpIsee = async () => {
    if (userName == props.item.user_id && discussionId) {
      await postUpIsee({
        parent_discussion_id: discussionId,
        user_id: userName,
        discussion_id: props.item.discussion_id,
        count: 5,
      });
    } else {
      if (userName && discussionId) {
        await postUpIsee({
          parent_discussion_id: discussionId,
          user_id: userName,
          discussion_id: props.item.discussion_id,
          count: 1,
        });
      }
    }
    // 更新かける
    if (discussionId) {
      const getdata = await getDiscussionAll(discussionId);
      setDiscussionAll(getdata);
    }
  };

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ minWidth: 275, background: "rgba(255,255,255,0)" }}
      my={2}
    >
      <Card sx={{ width: "100%", maxWidth: 345 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.item.content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            onClick={handleUpIsee}
            sx={{
              marginLeft: "auto",
              marginRight: "20px",
              marginBottom: "20px",
              borderRadius: "30px",
              fontFamily: `"gigalypse", sans-serif`,
              fontWeight: 800,
              fontStyle: "normal",
              fontSize: "20px",
              padding: "5px 20px",
              width: "150px",
              color: " #333333",
              backgroundColor: " #cff0ff",
              boxShadow:
                "5px 5px 0px 0px rgba(62, 134, 128, 0.28), 10px 10px 0px 0px rgba(65, 100, 95, 0.07), 15px 15px 0px 0px rgba(21, 77, 181, 0.1), 20px 20px 0px 0px rgba(114, 255, 228, 0.5);",
              ":hover": {
                backgroundColor: " #cff0ff",
              },
            }}
            variant="contained"
          >
            I SEE {props.item.isee}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
