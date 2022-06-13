const express = require("express");
const cors = require("cors");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");
const url = "https://www.leagueoflegends.com/en-us/champions/";

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);
dotenv.config();
app.use(cors());

app.get("/v1", (req, resp) => {
  let imgList = [];
  try {
    axios(url).then((res) => {
      const html = res.data;
      const $ = cheerio.load(html);
      $(".style__Wrapper-n3ovyt-0").each(function () {
        let image = $(this).find("img").attr("src");
        let name = $(this).find(".style__Text-n3ovyt-3").text();
        imgList.push({
          name: name,
          image: image,
        });
      });
      resp.status(200).json(imgList);
    });
  } catch (err) {
    resp.status(500).json(err);
  }
});

app.listen(8000, () => console.log("Server is running..."));
