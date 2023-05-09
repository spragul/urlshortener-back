const express = require("express");
const shortid = require("shortid");
const URL = require("../schemas/urlSchema");
const {validation}=require('../common/auth')
const router = express.Router();


router.get("/list",validation,async (req, res)=> {
  const result = await URL.find({});
  if(!result){
    return res.status(500).json({message:"Internal Error"})
  }else{
  return res.status(200).json({result});
  }
})
  router.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOne({shortId:shortId});
  res.redirect(entry.redirectURL);
});
router.post("/", async (req, res)=>{
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();
  let link =`https://urlshortener-3bwd.onrender.com/url/${shortID}`

  const data = await URL.create({
    shortId: shortID,
    redirectURL: body.url,
  });
  console.log(shortID);

  return res.json({ data });
}
)


  
module.exports = router;


