import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export const QuestionCard = (props: { content: string }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <Card sx={{ maxWidth: 345 }}>
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

      <CardContent>
        <Typography variant="h5" component="div">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
};
