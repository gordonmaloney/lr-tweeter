import { Button, FormLabel, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useState } from "react";
import { handles } from "./Data/HANDLES";
import { BtnStyle, BtnStyleSmall } from "./Shared";

import { useParams } from "react-router-dom";

//accordion imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { msps } from "./Data/MSPS";

//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalContent } from "./ModalContent";
import { mobileStyle } from "./ModalContent";

export const Tweetr = ({
  campaign,
  mspProp,
  constMSPs,
  constituency,
  region,
  setConstituency,
  ward,
  cllrs,
}) => {
  const params = useParams();

  const hashtag = "#" + (campaign?.hashtag || "RentControlsNow");
  const template = campaign?.template || "what are you doing for tenants? ";

  const [target, setTarget] = useState(campaign?.target);

  const [mspHandle, setMspHandle] = useState("");
  const [tweetBody, setTweetBody] = useState("");
  const [msp, setMsp] = useState(mspProp);

  const [targetCllrs, setTargetCllrs] = useState([]);

  console.log(cllrs)

  let Parties = ['SNP', 'Labour', 'Tory', 'LibDem', 'Green']

  useEffect(() => {


    (!target || target == "msps" || Parties.includes(target)) &&
      setMspHandle(handles.filter((hand) => hand.name == msp.name)[0].handle);


      (target == "Edinburgh" || target == "Glasgow" ) &&
      setMspHandle(targetCllrs.map((cllr) => cllr.twitter).join(", "));

    target &&
      !Parties.includes(target) &&
      target !== "msps" &&
      target !== "Edinburgh" &&
      target !== "Glasgow" &&
      target !== "none" &&
      setMspHandle("@" + target);
  }, [msp, mspProp, constMSPs, targetCllrs]);

  useEffect(() => {
    target !== "none"
      ? setTweetBody(`Hi ${mspHandle}, ` + template)
      : setTweetBody(template);
  }, [mspHandle]);

  useEffect(() => {
    if (target && (target == "Edinburgh" || target == "Glasgow")) {
      setTargetCllrs(cllrs.filter((cllr) => cllr.twitter !== "none"));
    }
  }, [target, cllrs, ward]);

  const [flash, setFlash] = useState("");
  const refresh = () => {
    window.scrollTo(0, 0);
    setFlash("flash");
    setTimeout(() => {
      setFlash("");
    }, 1000);
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openModal = () => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };

  return (
    <div>
      <span className="bebas header header2">
        {target == "msps" ? "Tweet your MSP" : "Write your tweet"}
      </span>
      {(target == "msps" || !target || Parties.includes(target)) && (
        <>
          <br />
          <br /> It looks like you live in{" "}
          <b>
            {constituency}, {region}
          </b>
          . If that's wrong,{" "}
          <span onClick={() => setConstituency()} style={{ cursor: "pointer" }}>
            <u>click here to go back.</u>
          </span>
        </>
      )}
      {(target == "Edinburgh" || target == "Glasgow" ) && (
        <>
          <br />
          <br /> It looks like you live in <b>{ward}</b>. If that's wrong,{" "}
          <span onClick={() => setConstituency()} style={{ cursor: "pointer" }}>
            <u>click here to go back.</u>
          </span>
        </>
      )}

{console.log((target == "Glasgow" || target == "Edinburgh") && targetCllrs.length > 0)}

      {(target == "msp" && mspHandle !== "none") || ((target == "Glasgow" || target == "Edinburgh") && targetCllrs.length > 0) ? (

        <>
          {target == "msps" || !target || Parties.includes(target) ? (
            <span>
              <br />
              <br />
              You're tweeting:{" "}
              <b>
                {msp.name} - {msp.party}
              </b>
            </span>
          ) : target == "none" ? (
            <></>
          ) : (target == "Edinburgh" || target == "Glasgow" )? (
            <>
              <br />
              <br />
              You're tweeting{" "}
              {targetCllrs.map((cllr, idx) => (
                <>
                  <b>
                    {cllr.name} - {cllr.party}
                  </b>
                  {idx == targetCllrs.length - 1
                    ? " "
                    : idx == targetCllrs.length - 2
                    ? " and "
                    : ", "}
                </>
              ))}
              <br />
              <br />
              <em>
                Note - not all councillors use Twitter, which is why you might
                not see all of yours here.
              </em>
            </>
          ) : (
            <>
              <br />
              <br />
              You're tweeting <b>@{target}</b>
            </>
          )}
          <br />
          <br />
          <FormLabel sx={{ color: "white" }}>Your tweet</FormLabel>
          <br />
          <TextField
            className={flash == "flash" ? "flash" : "notFlash"}
            fullWidth
            required
            id="user-tweet"
            multiline
            minRows={3}
            value={tweetBody}
            inputProps={{ maxLength: 280 - (hashtag.length + 2) }}
            onChange={(e) => setTweetBody(e.target.value)}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <TextField
            disabled
            className="notFlash"
            fullWidth
            id="hashtag"
            defaultValue={hashtag}
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          />
          <div
            style={{
              textAlign: "right",
              color: `rgb(${255}, ${
                255 - (tweetBody.length + hashtag.length - 250) * 10
              }, ${255 - (tweetBody.length + hashtag.length - 250) * 10})`,
            }}
          >
            {tweetBody.length + hashtag.length + 2}/280
          </div>

          <br />
      <br />
      <center>
        <Button
          sx={BtnStyle}
          target="_blank"
          href={`https://twitter.com/intent/tweet?text=${(
            tweetBody +
            " " +
            hashtag
          )
            .replace("#", "%23")
            .replace(/\n/g, "%0A")}`}
          onClick={handleOpen}
        >
          Send Tweet
        </Button>
      </center>
        </>
      ) : (
        <><br/><br/>It looks like we do not have data for any of your representatives on Twitter - sorry!</>
      )}

      <br />
      <br />
      {(!target || target == "msps") && (
        <div style={{ marginLeft: "10px" }}>
          <Accordion
            className="otherMSPs"
            sx={{ backgroundColor: "rgba(255,255,255,0.9)" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="details"
              sx={{ padding: "0px" }}
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
                Each area in Scotland is represented by multiple MSPs. One for
                the constituency, and several for the list. By default, this
                tool targets your constituency MSP, but you can choose to tweet
                a different one by selecting them from the list:
                <br />
                <br />
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: "space-around" }}
                >
                  {constMSPs.map((filtMsp) => (
                    <Grid
                      item
                      sx={{ width: "120px", cursor: "pointer" }}
                      onClick={() => {
                        handles.filter((hand) => hand.name == filtMsp.name)[0]
                          .handle !== "none" && setMsp(filtMsp);
                        refresh();
                      }}
                    >
                      <b>{filtMsp.name}</b>
                      <br />
                      {filtMsp.party}
                      <br />
                      {handles.filter((hand) => hand.name == filtMsp.name)[0]
                        .handle !== "none" ? (
                        <Button
                          sx={{
                            ...BtnStyleSmall,
                            fontSize: "small",
                            paddingX: "4px",
                            paddingTop: "2px",
                          }}
                          onClick={() => {
                            handles.filter(
                              (hand) => hand.name == filtMsp.name
                            )[0].handle !== "none" && setMsp(filtMsp);
                            refresh();
                          }}
                        >
                          {
                            handles.filter(
                              (hand) => hand.name == filtMsp.name
                            )[0].handle
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
        </div>
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={mobileStyle}>
          <span
            style={{
              float: "right",
              marginTop: "-23px",
              marginRight: "-20px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            x
          </span>
          <ModalContent />
        </Box>
      </Modal>
    </div>
  );
};
