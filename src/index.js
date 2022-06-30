const express = require("express");
const { v4: uuid } = require("uuid");
const isUrlValid = require("url-validation");

const app = express();

const mongoose = require("./utils/database")(app);

const UrlEntity = require("./models/UrlEntity");

app.use(express.json());


function generateString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

app.get("/", (req, res) => {
  return res.json({ message: "hello world!" });
});


app.post("/newUrl", async (req, res) => {
  const { url } = req.body;

  const expression = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

  const regex = new RegExp(expression);

  console.log(url.match(regex));
  console.log(isUrlValid(url));

  if (url.match(regex)) {
    const newId = generateString(5);

    const newUrl = {
      id: uuid(),
      baseUrl: url,
      urlHash: newId
    }

    try {
      await UrlEntity.create(newUrl);

      const resultUrl = "localhost/" + newId;
      return res.status(200).json({ shortUrl: resultUrl });
    } catch (err) {
      return res.status(500).json({ message: err });
    }
  } else {
    return res.status(401).json({ message: "Invalid URL" });
  }

});


app.listen(3000);