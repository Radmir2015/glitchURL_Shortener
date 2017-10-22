var app = require("express")();
var url = require("url");

var oldUrls = [];
var newUrls = [];

var mainUrl = "https://777.glitch.me";

var html = (link) => '<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="crossorigin="anonymous"></script><script>$(document).ready(function(){$("link").click(function(){$("<a href="' + link + '"></a>").click();})})</script>';

function stringGen(len)
{
    var text = "";
    var charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < len; i++)
        text += charset.charAt(Math.floor(Math.random() * charset.length));
    return text;
}

var regex = /(http(s)?:\/\/)/

app.use("/", function (req, res) {
  var urlParsed = decodeURI(url.parse(req.url, true).path.slice(1));
  // var url = req.params.url;
  if (urlParsed !== "favicon.ico" && urlParsed !== "") {
    if (~newUrls.indexOf(urlParsed))
      res.send(JSON.stringify({"site": oldUrls[newUrls.indexOf(urlParsed)]}) + "<br><a href='" + oldUrls[newUrls.indexOf(urlParsed)] + "'>Click to go to " + oldUrls[newUrls.indexOf(urlParsed)] + "</a>");
    if (~oldUrls.indexOf(urlParsed))
      res.send(JSON.stringify({"info": urlParsed + " already minified. Short link: " + mainUrl + "/" + newUrls[oldUrls.indexOf(urlParsed)]}) + "<br><a href='" + urlParsed + "'>Click to go to " + urlParsed + "</а>");
    if (!regex.test(urlParsed))
      res.send("Please write down URL with 'http(s)://'.");
    oldUrls.push(urlParsed);
    newUrls.push(stringGen(3));
    res.send("Ok, " + urlParsed + " site is added. Short link is " + mainUrl + "/" + newUrls[newUrls.length - 1]);
  }
  else
    res.send("Empty params found...")
});

app.listen(8000);