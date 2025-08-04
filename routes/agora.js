// routes/agora.js
import express from "express";
import dotenv from "dotenv";
import pkg from "agora-access-token"; // ✅ ESM-friendly import for CommonJS

const { RtcTokenBuilder, RtcRole } = pkg;

dotenv.config();

const router = express.Router();

const APP_ID = process.env.AGORA_APP_ID;
const APP_CERTIFICATE = process.env.AGORA_APP_CERTIFICATE;

router.post("/get-token", (req, res) => {
  const { channelName,ishost,uid } = req.body;

  if (!channelName) {
    return res.status(400).json({ error: "channelName is required" });
  }

//   const uid = Math.floor(Math.random() * 100000);
  const role = ishost?RtcRole.PUBLISHER: RtcRole.SUBSCRIBER; // Use PUBLISHER for host, SUBSCRIBER for others
  const expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );

  res.json({ token, uid, appId: APP_ID, channelName });
});

export default router;
