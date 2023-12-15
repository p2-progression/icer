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
  parentDiscussionId,
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
  const [discussionId, setDiscussionId] = useRecoilState(parentDiscussionId);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleUpIsee = async () => {
    if (userName == props.item.user_id) {
      await postUpIsee({
        user_id: userName,
        discussion_id: props.item.discussion_id,
        count: 5,
      });
    } else {
      if (userName) {
        await postUpIsee({
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
          <h6>isee数:{props.item.isee}</h6>
        </CardContent>
        <CardActions disableSpacing>
          <Button
            sx={{
              borderRadius: "30px",
              fontFamily: `"gigalypse", sans-serif`,
              fontWeight: 800,
              fontStyle: "normal",
              fontSize: "20px",
              padding: "5px 20px",
            }}
            variant="contained"
          >
            I SEE
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
