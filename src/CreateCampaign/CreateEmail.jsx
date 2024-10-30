import {
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { BtnStyle, BtnStyleSmall } from "../Shared";
import React from "react";
import { Tooltip } from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { API } from "../API";
import axios from "axios";
import { QR } from "../QR";

export const CreateEmail = () => {
  const [emailBody, setEmailBody] = useState("");
  const [target, setTarget] = useState("msps");
  const [customTarget, setCustomTarget] = useState("");
  const [party, setParty] = useState('')

  const [link, setLink] = useState("");

  const [name, setName] = useState("");
  const [shortLink, setShortLink] = useState("");
  const [subject, setSubject] = useState("");
  const [links, setLinks] = useState();

  //tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    if (tooltipOpen) {
      setTimeout(() => {
        setTooltipOpen(false);
      }, 1000);
    }
  }, [tooltipOpen]);

  const getCampaigns = async () => {
    const campaigns = await fetch(API + "/all");
    const campaignsData = await campaigns.json();
    console.log(campaignsData);
    setLinks(campaignsData);
  };
  useEffect(() => {
    getCampaigns();
  }, []);

  const postLink = async () => {
    const body = {
      name: name.replace(" ", "-"),
      target: (target == "custom" || target == "party") ? customTarget : target,
      channel: "email",
      hashtag: "none",
      template: emailBody,
      subject,
    };
    const response = await axios.post(API, body);

    setLink(window.location.host + "/campaign/" + response.data.name);
    setShortLink(window.location.host + "/campaign/" + response.data.name);
  };

  console.log("link: ", link);
  return (
    <div className="landing">
      <div className="landingContainer">
        <span className="bebas header header2">Create an email campaign</span>

        <br />

        <FormLabel sx={{ color: "white" }}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            placement="right"
            arrow
            title="Draft your subject line here"
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Subject{" "}
        </FormLabel>
        <br />
        <TextField
          className={"notFlash"}
          fullWidth
          required
          id="user-subject"
          value={subject}
          onChange={(e) => {
            setSubject(`${e.target.value}`);
          }}
          InputProps={{
            style: {
              backgroundColor: "white",
            },
          }}
        />
        <br />
        <FormLabel sx={{ color: "white" }}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            placement="right"
            arrow
            title="Draft your email here."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Template Email{" "}
        </FormLabel>
        <br />
        <TextField
          className={"notFlash"}
          fullWidth
          required
          id="user-email"
          multiline
          minRows={3}
          value={emailBody}
          onChange={(e) => {
            setEmailBody(`${e.target.value}`);
          }}
          InputProps={{
            style: {
              backgroundColor: "white",
            },
          }}
        />

        <br />
        <FormLabel sx={{ color: "white" }}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            sx={{ backgroundColor: "green" }}
            placement="right"
            arrow
            title="Choose your target (if you want one!). If you pick MSPs, it will filter by postcode so users only message their own MSPs."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Pick a target
        </FormLabel>
        <br />
        <Select
          value={target}
          className="notFlash"
          onChange={(e) => setTarget(e.target.value)}
          sx={{
            backgroundColor: "white",
            marginTop: "3px",
            marginBottom: "5px",
            marginLeft: "5px",

            width: target == "custom" || target == "party" ? "100px" : "100%",
            transition: "0s !important",

            "& .MuiInputBase-input": {
              padding: "11.5px",
              paddingLeft: "10px",
              paddingRight: "0",
            },
          }}
        >
          <MenuItem value="msps">MSPs</MenuItem>
          <MenuItem value="party">MSPs by party</MenuItem>
          <MenuItem value="Edinburgh">Edinburgh City Council</MenuItem>
          <MenuItem value="Glasgow">Glasgow City Council</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>

        {target == "custom" && (
          <>
            {" "}
            <TextField
              id="customTarget"
              value={customTarget}
              onChange={(e) => setCustomTarget(`${e.target.value}`)}
              sx={{ marginTop: "3px", width: "230px" }}
              InputProps={{
                style: {
                  backgroundColor: "white",
                  maxWidth: "230px",
                },
              }}
            ></TextField>
          </>
        )}

{target == "party" && (<>
           <Select
           value={customTarget}
           className="notFlash"
           onChange={(e) => setCustomTarget(e.target.value)}
           sx={{
             backgroundColor: "white",
             marginTop: "3px",
             marginBottom: "5px",
             marginLeft: "5px",
 
             "& .MuiInputBase-input": {
               padding: "11.5px",
               paddingLeft: "10px",
               paddingRight: "0",
             },
           }}
         >
           <MenuItem value="SNP">SNP</MenuItem>
           <MenuItem value="Labour">Labour</MenuItem>
           <MenuItem value="Green">Green</MenuItem>
           <MenuItem value="Tory">Tory</MenuItem>
           <MenuItem value="LibDem">LibDem</MenuItem>
         </Select></>
        )}


        <br />

        <FormLabel sx={{ color: "white" }}>
          <Tooltip
            componentsProps={{
              tooltip: {
                sx: {
                  bgcolor: "green",
                  "& .MuiTooltip-arrow": {
                    color: "green",
                  },
                },
              },
            }}
            placement="right"
            arrow
            title="Your campaign name will appear in the shareable shortlink."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Name your campaign
        </FormLabel>
        <br />
        <TextField
          className="notFlash"
          fullWidth
          id="campaignName"
          value={name}
          InputProps={{
            style: {
              backgroundColor: "white",
            },
          }}
          onChange={(e) => setName(e.target.value)}
          helperText={
            <span style={{ color: "red" }}>
              {name !== "" &&
                links?.filter((link) => link.name == name).length > 0 &&
                "Name in use - choose another!"}
            </span>
          }
        />
        <br />
        <br />

        <center>
          <Button
            disabled={
              name !== "" &&
              links?.filter((link) => link.name == name).length > 0
            }
            sx={BtnStyle}
            onClick={postLink}
          >
            Generate link
          </Button>
          <br />
          <br />
        </center>

        {link && (
          <>
            <br />

            <TextField
              fullWidth
              className="notFlash"
              id="link"
              value={shortLink}
              InputProps={{
                style: {
                  backgroundColor: "white",
                },
              }}
            />

            <center>
              <Tooltip
                title="copied"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "green",
                      "& .MuiTooltip-arrow": {
                        color: "green",
                      },
                    },
                  },
                }}
                open={tooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                placement="top"
                arrow
              >
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(shortLink);
                    setTooltipOpen(true);
                  }}
                  sx={{ ...BtnStyleSmall }}
                >
                  Copy Link
                </Button>
              </Tooltip>
              <br />
              <br />
              <QR link={shortLink} />{" "}
            </center>
          </>
        )}
      </div>
    </div>
  );
};
