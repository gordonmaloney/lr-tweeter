import { useEffect } from "react";
import { useState } from "react";
import { handles } from "./Data/HANDLES";
import { Chip, Paper } from "@mui/material";
import { msps } from "./Data/MSPS";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, FormLabel, Grid, TextField, Button } from "@mui/material";
import { BtnStyle, CheckBoxStyle, BtnStyleSmall } from "./Shared";
import AddCircleIcon from "@mui/icons-material/AddCircle";
//accordion imports
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
//modal imports
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { ModalContent } from "./ModalContent";
import { mobileStyle } from "./ModalContent";

import axios from "axios";
import { OPTIN_API } from "./API";

export const Emailer = ({
  campaign,
  mspProp,
  constMSPs,
  constituency,
  region,
  setConstituency,
  postcode,
  cllrs,
  ward,
}) => {
  const [emailing, setEmailing] = useState([]);
  const [notEmailing, setNotEmailing] = useState([]);

  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [signOff, setSignOff] = useState("Regards,\n");
  const [optIn, setOptIn] = useState(false);

  const [email, setEmail] = useState("");

  const target = campaign?.target;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const openModal = () => {
    setTimeout(() => {
      setOpen(true);
    }, 1000);
  };
  let Parties = ["SNP", "Labour", "Tory", "LibDem", "Green"];

  useEffect(() => {
    if (campaign) {
      setSubject(campaign.subject);
      setBody(campaign.template);
    } else {
      setSubject("Will you stand with tenants?");
      setBody(
        "Hi there,\n\nI am writing as one of your constituents to ask that you stand with tenants."
      );
    }
  }, [constMSPs]);

  useEffect(() => {
    target !== "Edinburgh" && setEmailing(constMSPs);
  }, [constMSPs]);

  useEffect(() => {
    target == "Edinburgh" && setEmailing(cllrs);
  }, [target, ward, cllrs]);

  console.log(emailing);

  const handleOptin = async () => {
    console.log("opting in: ", optIn);
    if (optIn) {
      const body = {
        email: email,
        msg: "I agree to Living Rent contacting me by email about this campaign and others like it.",
        source: window.location["href"].toString(),
        postcode: postcode,
      };
      console.log(body);

      const response = await axios.post(OPTIN_API, body);
      console.log(response);
    } else {
      console.log("not opted in");
    }
  };

  return (
    <div>
      <span className="bebas header header2">Draft your email</span>
      <br />
      <br />
      {campaign?.target == "msps" && constMSPs.length > 1 && (
        <>
          Everyone in Scotland has multiple MSPs. By default, this tool allows
          you to email them all. But if you'd like, you can choose which of your
          MSPs you'd like to message.
        </>
      )}

      <Grid item xs={12} sm={8} md={7}>
        <div className="email">
          <br />
          <span
            id="objection"
            className="bebas header3 header"
            style={{ color: "white", marginLeft: "10px" }}
          >
            Your Email
          </span>
          <br /> <br />
          <FormLabel sx={{ marginLeft: "2.5%", color: "white" }}>To:</FormLabel>
          <Paper
            sx={{
              width: "93%",
              margin: "1px 2.5% 7px 2.5%",
              padding: "5px",
              paddingY: "15px",
            }}
          >
            {emailing.map((msp) => (
              <Chip
                size="small"
                label={msp.name + " - " + msp.party}
                variant="outlined"
                sx={{ backgroundColor: "white", margin: "2px" }}
                onClick={() => {
                  setEmailing((prev) =>
                    prev.filter((prevMSP) => prevMSP.name !== msp.name)
                  );
                  setNotEmailing((prev) => [...prev, msp]);
                }}
                onDelete={() => {
                  setEmailing((prev) =>
                    prev.filter((prevMSP) => prevMSP.name !== msp.name)
                  );
                  setNotEmailing((prev) => [...prev, msp]);
                }}
              ></Chip>
            ))}
            {campaign?.target !== "msps" &&
              campaign?.target !== "Edinburgh" &&
              !Parties.includes(target) && (
                <span style={{ marginLeft: "10px" }}>{campaign?.target}</span>
              )}
            {(campaign?.target == "msps" ||
              Parties.includes(target) ||
              campaign?.target == "Edinburgh") &&
              emailing.length == 0 && (
                <div style={{ color: "red", marginLeft: "10px" }}>
                  You need to pick at least one recipient!
                </div>
              )}
          </Paper>
          {notEmailing.length > 0 && (
            <>
              <div
                style={{
                  width: "95%",
                  marginLeft: "2.5%",
                  marginBottom: "5px",
                }}
              >
                <Accordion
                  className="notEmailing"
                  sx={{
                    backgroundColor: "rgba(0, 66, 25, 0.9)",
                    borderRadius: "5px !important",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="details"
                    sx={{
                      backgroundColor: "white",
                      borderRadius: "5px 5px 0 0",
                    }}
                  >
                    <div
                      style={{
                        color: "black",
                      }}
                    >
                      {target == "Edinburgh" ? "Councillors " : "MSPs "}you
                      aren't emailing:
                    </div>
                  </AccordionSummary>
                  <AccordionDetails
                    sx={{
                      paddingY: "10px",
                      paddingX: "10px",
                      marginTop: "-10px",
                      backgroundColor: "white",
                      borderRadius: "0 0 5px 5px",
                    }}
                  >
                    <div style={{ marginLeft: "5px" }}>
                      These are the{" "}
                      {target == "Edinburgh" ? "councillors " : "MSPs "} not
                      included in your email. If you'd like to include them,
                      just tap their name.
                    </div>
                    <br />
                    {notEmailing.map((msp) => (
                      <Chip
                        size="small"
                        label={msp.name + " - " + msp.party}
                        variant="outlined"
                        sx={{ backgroundColor: "white", margin: "2px" }}
                        deleteIcon={
                          <AddCircleIcon style={{ fontSize: "large" }} />
                        }
                        onDelete={() => {
                          setNotEmailing((prev) =>
                            prev.filter((prevMSP) => prevMSP.name !== msp.name)
                          );
                          setEmailing((prev) => [...prev, msp]);
                        }}
                        onClick={() => {
                          setNotEmailing((prev) =>
                            prev.filter((prevMSP) => prevMSP.name !== msp.name)
                          );
                          setEmailing((prev) => [...prev, msp]);
                        }}
                      ></Chip>
                    ))}
                  </AccordionDetails>
                </Accordion>
              </div>
            </>
          )}
          <FormLabel sx={{ marginLeft: "2.5%", color: "white" }}>
            Subject:
          </FormLabel>
          <br />
          <TextField
            sx={{
              width: "95%",
              margin: "1px 2.5% 7px 2.5%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <br />
          <FormLabel sx={{ marginLeft: "2.5%", color: "white" }}>
            Body:
          </FormLabel>
          <br />
          <TextField
            sx={{
              width: "95%",
              margin: "1px 2.5% 7px 2.5%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            multiline
            minRows={6}
          />
          <br />
          <FormLabel sx={{ marginLeft: "2.5%", color: "white" }}>
            Your details:
          </FormLabel>
          <br />
          <TextField
            sx={{
              width: "95%",
              margin: "1px 2.5% 7px 2.5%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            value={signOff}
            onChange={(e) => setSignOff(e.target.value)}
            multiline
            minRows={2}
          />
          <p
            style={{
              width: "95%",
              margin: "1px 2.5% 7px 2.5%",
              fontSize: "small",
            }}
          >
            Make sure you include your address so they know you're an Edinburgh
            resident!
          </p>
          <FormLabel sx={{ marginLeft: "2.5%", color: "white" }}>
            Your email address:
          </FormLabel>
          <br />
          <TextField
            sx={{
              width: "95%",
              margin: "1px 2.5% 7px 2.5%",
              backgroundColor: "white",
              borderRadius: "5px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormGroup sx={{ width: "95%", margin: "1px 2.5% 7px 2.5%" }}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={CheckBoxStyle}
                  value={optIn}
                  onChange={() => setOptIn(!optIn)}
                />
              }
              label={
                <p style={{ fontSize: "12px", lineHeight: "14px" }}>
                  I agree to Living Rent contacting me by email about this
                  campaign and others like it.
                </p>
              }
            />
          </FormGroup>
          <Grid container justifyContent="space-around">
            <Grid item xs={12} sm={6}>
              <center>
                <Button
                  href={`mailto:${
                    !campaign?.target ||
                    campaign?.target == "msps" ||
                    campaign?.target == "Edinburgh"
                      ? emailing.map((msp) => msp.email).join(",")
                      : campaign?.target
                  }?subject=${subject}&bcc=objectionapp@livingrent.org&body=${
                    body.replace("%", "%25").replace(/\n/g, "%0A") +
                    "%0A%0A" +
                    signOff.replace(/\n/g, "%0A")
                  }`}
                  //disabled={signOff == "Regards,\n"}
                  size="large"
                  variant="contained"
                  style={{ ...BtnStyleSmall, margin: 2 }}
                  onClick={() => {
                    openModal();
                    handleOptin();
                  }}
                >
                  Send your email
                </Button>
              </center>
            </Grid>
            <Grid item sx={{ display: { xs: "none", sm: "block" } }}>
              <center>
                <Button
                  //disabled={signOff == "Regards,\n"}
                  className="hideOnMob"
                  size="large"
                  variant="contained"
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${
                    !campaign?.target ||
                    campaign?.target == "msps" ||
                    campaign?.target == "Edinburgh"
                      ? emailing.map((msp) => msp.email).join(",")
                      : campaign?.target
                  }&bcc=objectionapp@livingrent.org&su=${subject}&body=${
                    body.replace("%", "%25").replace(/\n/g, "%0A") +
                    "%0A%0A" +
                    signOff.replace(/\n/g, "%0A")
                  }`}
                  target="_blank"
                  onClick={() => {
                    openModal();
                    handleOptin();
                  }}
                  style={{ ...BtnStyleSmall, margin: 2 }}
                >
                  Send via Gmail
                </Button>
              </center>
            </Grid>

            <Grid item xs={12}>
              <center style={{fontSize: 'small', marginTop: '5px', width: '80%', marginLeft: 'auto', marginRight: 'auto'}}>
                Clicking send will open your email client in a new window, where
                you will be able to proof-read your email and hit send.
              </center>
            </Grid>
          </Grid>
        </div>
      </Grid>

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
