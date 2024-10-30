import {
  FormLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  Paper,
} from "@mui/material";
import { useState, useRef } from "react";
import { BtnStyle, BtnStyleSmall } from "../Shared";
import React from "react";
import { useEffect } from "react";
import { Tooltip } from "@mui/material";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { API } from "../API";
import axios from "axios";
import { QR } from "../QR";

export const CreateTweet = () => {
  const [tweetBody, setTweetBody] = useState("");
  const [hashtag, setHashtag] = useState("#");
  const [target, setTarget] = useState("msps");
  const [customTarget, setCustomTarget] = useState("@");
  const [party, setParty] = useState('')
  const [link, setLink] = useState("");

  const [name, setName] = useState("");
  const [shortLink, setShortLink] = useState("");

  const [links, setLinks] = useState();

  const [length, setLength] = useState(0);

  useEffect(() => {
    target == "msps" && setLength(tweetBody.length + hashtag.length + 2 + 21);

    target == "custom" &&
      setLength(
        tweetBody.length + hashtag.length + 2 + customTarget.length + 5
      );

    target == "none" && setLength(tweetBody.length + hashtag.length + 2);
  }, [tweetBody, hashtag, target, customTarget]);

  const getCampaigns = async () => {
    const campaigns = await fetch(API + "/all");
    const campaignsData = await campaigns.json();
    console.log(campaignsData);
    setLinks(campaignsData);
  };
  useEffect(() => {
    getCampaigns();
  }, []);

  //tooltip
  const [tooltipOpen, setTooltipOpen] = useState(false);
  useEffect(() => {
    if (tooltipOpen) {
      setTimeout(() => {
        setTooltipOpen(false);
      }, 1000);
    }
  }, [tooltipOpen]);

  const postLink = async () => {
    const body = {
      name: name.replace(" ", "-"),
      target:
       ( target == "custom" || target=="party")
          ? customTarget.replace("@", "")
          : target.replace("@", ""),
      channel: "tweet",
      hashtag: hashtag.replace("#", ""),
      template: tweetBody,
    };
    const response = await axios.post(API, body);

    setLink(window.location.host + "/campaign/" + response.data.name);
    setShortLink(window.location.host + "/campaign/" + response.data.name);
  };

  console.log("link: ", link);
  return (
    <div className="landing">
      <div className="landingContainer">
        <span className="bebas header header2">Create a twitter campaign</span>

        <br />

        <div
          style={{
            textAlign: "right",
            color: `rgb(${255}, ${255 - (length - 250) * 10}, ${
              255 - (length - 250) * 10
            })`,
          }}
        >
          {length}/280
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
            placement="left"
            arrow
            title="This number includes a few things that get added after the tweet is generated, which is why it's longer than you'd expect."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
        </div>
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
            title="Draft your tweet here - don't include hashtags or your target - they'll get added!"
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Template tweet{" "}
        </FormLabel>
        <br />
        <TextField
          className={"notFlash"}
          fullWidth
          required
          id="user-tweet"
          multiline
          minRows={3}
          value={tweetBody}
          inputProps={{ maxLength: 280 - (length - tweetBody.length) }}
          onChange={(e) => {
            setTweetBody(`${e.target.value}`);
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
            title="Your hashtag will be in all the tweets sent using this tool - it will help you analyse performance and see how people are using it."
          >
            <HelpCenterIcon sx={{ marginBottom: "-6px" }} />
          </Tooltip>
          Hashtag
        </FormLabel>
        <br />
        <TextField
          className="notFlash"
          fullWidth
          id="hashtag"
          value={hashtag}
          InputProps={{
            style: {
              backgroundColor: "white",
            },
          }}
          inputProps={{ maxLength: 280 - (length - hashtag.length + 1) }}
          onChange={(e) =>
            setHashtag(
              `${e.target.value[0] !== "#" ? "#" : ""}${e.target.value}`
            )
          }
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
          <MenuItem value="custom">Custom</MenuItem>
          <MenuItem value="Edinburgh">Edinburgh City Council</MenuItem>
          <MenuItem value="Glasgow">Glasgow City Council</MenuItem>
          <MenuItem value="none">None</MenuItem>
        </Select>

        {target == "custom" && (
          <>{" "}
            <TextField
              id="customTarget"
              value={customTarget}
              onChange={(e) =>
                setCustomTarget(
                  `${e.target.value[0] !== "@" ? "@" : ""}${e.target.value}`
                )
              }
              sx={{ marginTop: "3px", width: "230px" }}
              InputProps={{
                style: {
                  backgroundColor: "white",
                  maxWidth: "230px",
                },
              }}
              inputProps={{
                maxLength: 280 - (length - customTarget.length + 1),
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
              length > 280 ||
              (name !== "" &&
                links?.filter((link) => link.name == name).length > 0)
            }
            sx={BtnStyle}
            onClick={postLink}
          >
            Generate link
          </Button>
          <br />
          <br />
          <Button
            disabled={length > 280}
            sx={BtnStyle}
            href={
              "https://twitter.com/intent/tweet?text=" +
              encodeURIComponent(
                (target == "msps"
                  ? "Hi @PatrickHarvie, "
                  : target == "Edinburgh"
                  ? "Hi @adamrmcvey, "
                  : target == "custom"
                  ? `Hi @${customTarget.replace("@", "")}, `
                  : ``) +
                  tweetBody +
                  " #" +
                  hashtag.replace("#", "")
              )
            }
            target="_blank"
          >
            Preview tweet
          </Button>
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
              <QR link={shortLink} />
            </center>
          </>
        )}
      </div>
    </div>
  );
};
