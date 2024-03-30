const discord = require("discord.js");
const users = require("../../models/users");
const fetch = (..._0x312bf0) =>
  import("node-fetch").then(({ default: _0x70f5c }) => _0x70f5c(..._0x312bf0));
module.exports = {
  name: "clean",
  description: "🧹 Cleans the db",
  default_permission: true,
  timeout: 0xbb8,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,
  run: async (_0x5b9954, _0x20d1d9, _0x23fa25) => {
    const _0x39c495 = await users.find();
    var _0x1a2998 = 0x0;
    await _0x20d1d9.reply({
      embeds: [
        new discord.MessageEmbed().setDescription(
          "*Removing invalid members from db...**",
        ),
      ],
    });
    for (let _0x4855e7 = 0x0; _0x4855e7 < _0x39c495.length; _0x4855e7++) {
      try {
        const _0x354ed8 = _0x39c495[_0x4855e7].accessToken;
        fetch("https://discord.com/api/users/@me", {
          headers: {
            Authorization: "Bearer " + _0x354ed8,
          },
        }).then(async (_0x9a6b5e) => {
          await _0x9a6b5e.json()["catch"]((_0x357482) => {});
          let { status: _0x23bd5d } = _0x9a6b5e;
          if (_0x23bd5d == 0x191) {
            _0x1a2998++;
            await users.findOneAndDelete({
              accessToken: _0x354ed8,
            });
          }
          if (_0x23bd5d == 0x1ad) {
            console.log("Ratelimited");
            console.log(parseInt(_0x9a6b5e.headers.get("retry-after")));
            await sleep(parseInt(_0x9a6b5e.headers.get("retry-after")));
          }
        });
      } catch (_0x5e6faf) {}
    }
    await sleep(0x2710);
    _0x20d1d9.editReply({
      embeds: [
        {
          title: "Members removed from db",
          description: "**" + _0x1a2998 + " members removed**",
        },
      ],
    });
  },
};
function sleep(_0x365c76) {
  return new Promise((_0x1e02b9) => {
    setTimeout(_0x1e02b9, _0x365c76);
  });
}
