import { Button, FormLabel, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useState } from "react";
import { handles } from "./HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";

//accordion imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const Tweetr = ({
  msp,
  constMSPs,
  constituency,
  region,
  setConstituency,
}) => {
  console.log(constMSPs);

  const [mspHandle, setMspHandle] = useState("");
  const [tweetBody, setTweetBody] = useState("");

  useEffect(() => {
    setMspHandle(handles.filter((hand) => hand.msp == msp)[0].handle);
  }, [msp, constMSPs]);

  useEffect(() => {
    setTweetBody(
      `Hi ${mspHandle}, will you support this great campaign?\n\n#RentControlsNow`
    );
  }, [mspHandle]);

  const [flash, setFlash] = useState("");
  const refresh = () => {
    window.scrollTo(0, 0);
    setFlash("flash");
    setTimeout(() => {
      setFlash("");
    }, 1000);
  };

  return (
    <>
      <span className="bebas header header2">Tweet your MSP</span>
      <br />
      <br />
      It looks like you live in{" "}
      <b>
        {constituency}, {region}
      </b>
      . If that's wrong,{" "}
      <span onClick={() => setConstituency()} style={{ cursor: "pointer" }}>
        <u>click here to go back.</u>
      </span>
      <br />
      <br />
      {mspHandle !== "none" ? (
        <>
          <FormLabel sx={{ color: "white" }}>Your tweet</FormLabel>
          <br />
          <TextField
            className={flash == "flash" ? "flash" : "notFlash"}
            fullWidth
            required
            id="user-tweet"
            multiline
            minRows={3}
            defaultValue={tweetBody}
            onChange={(e) => setTweetBody(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
        </>
      ) : (
        <>It looks like this MSP isn't on Twitter.</>
      )}
      <br />
      <br />
      <center>
        <Button
          sx={BtnStyle}
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${tweetBody
            .replace("#", "%23")
            .replace(/\n/g, "%0A")}`}
        >
          Send Tweet
        </Button>
      </center>
      <br />
      <br />
      <Accordion
        className="otherMSPs"
        sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="details"
          sx={{ padding: "10px" }}
        >
          <div
            className="bebas header3 header"
            style={{ color: "black", marginLeft: "10px" }}
          >
            Your other MSPs:
          </div>{" "}
        </AccordionSummary>
        <AccordionDetails sx={{ paddingTop: "-20px", paddingX: "10px" }}>
          <p>
            Each area in Scotland is represented by multiple MSPs. One for the
            constituency, and several for the list. By default, this tool
            targets your constituency MSP, but you can choose to tweet a
            different one by selecting them from the list:
            <br />
            <br />
            <Grid container spacing={2} sx={{ justifyContent: "space-around" }}>
              {constMSPs.map((filtMsp) => (
                <Grid item>
                  <b>{filtMsp.msp}</b>
                  <br />
                  {filtMsp.party}
                  <br />
                  {handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                    .handle !== "none" ? (
                    <Button
                      sx={BtnStyleSmall}
                      onClick={() => {
                        handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                          .handle !== "none" &&
                          setMspHandle(
                            handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                              .handle
                          );
                        refresh();
                      }}
                    >
                      {
                        handles.filter((hand) => hand.msp == filtMsp.msp)[0]
                          .handle
                      }
                    </Button>
                  ) : (
                    "It looks like this MSP is not on twitter"
                  )}
                </Grid>
              ))}
            </Grid>
          </p>
        </AccordionDetails>
      </Accordion>
    </>
  );
};