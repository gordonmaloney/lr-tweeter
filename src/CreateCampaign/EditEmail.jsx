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

export const EditEmail = ({ campaign }) => {
  const [emailBody, setEmailBody] = useState(campaign.template);
  const [target, setTarget] = useState(campaign.target);
  const [customTarget, setCustomTarget] = useState("");
  const [link, setLink] = useState("");

  const [name, setName] = useState(campaign.name);
  const [shortLink, setShortLink] = useState("");
  const [subject, setSubject] = useState(campaign.subject);
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
      target: target !== "custom" ? target : customTarget,
      channel: "email",
      hashtag: "none",
      template: emailBody,
      subject,
    };
    const response = await axios.post(API + '/' + campaign.name, body);

    setLink(window.location.host + "/campaign/" + response.data.name);
    setShortLink(window.location.host + "/campaign/" + response.data.name);
  };

  console.log("link: ", link);
  return (
    <div className="landing">
      <div className="landingContainer">
        <span className="bebas header header2">edit email campaign</span>

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

            width: target == "custom" ? "40px" : "100px",
            color: target == "custom" ? "transparent" : "black",
            transition: "0s !important",

            "& .MuiInputBase-input": {
              padding: "11.5px",
              paddingLeft: "10px",
              paddingRight: "0",
            },
          }}
        >
          <MenuItem value="msps">MSPs</MenuItem>
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
          disabled
          helperText={
            <span style={{ color: "white", lineHeight: "10px" }}>
              You cannot edit the name of a campaign once you've created it
            </span>
          }
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <center>
          <Button sx={BtnStyle} onClick={postLink}>
            Save campaign
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
