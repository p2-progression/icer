/* eslint-disable @next/next/no-img-element */
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardActionArea, CardMedia } from "@mui/material";
import Image from "next/image";

export const QuestionCard = (props: { content: string }) => {
  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: 275, background: "rgba(255,255,255,0)" }}
      >
        <Box
          component="div"
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: 345 }}
        >
          <img
            width="80%"
            src="/pengin_re1.png"
            className="App-logo"
            alt="logo"
          />
        </Box>
      </Box>
      <Box
        component="div"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ minWidth: 275, background: "rgba(255,255,255,0)" }}
        mb={3}
      >
        <Card
          sx={{ maxWidth: 345, minWidth: 275, background: "rgba(255,255,255)" }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {props.content}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};
