const express = require("express");

const app = express();

const mongoose = require("./utils/database")(app);

const UrlEntity = require("./models/UrlEntity");


app.get("/", (req, res) => {
  return res.send("Hello world");
});

app.get("/:hash", async (req, res) => {
  const { hash } = req.params;

  try {
    const url = await UrlEntity.findOne({ urlHash: hash });
    //console.log(url);
    const today = new Date();
    const { baseUrl } = url;

    console.log(baseUrl);

    if (today < url.dateExpires) {
      console.log(url.baseUrl);
      return res.redirect(url.baseUrl);
    } else {
      return res.status(401).send("this link is expired")
    }
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.listen(80)