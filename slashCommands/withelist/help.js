const Discord = require("discord.js");

module.exports = {
  name: "help",
  description: "📙 Shows All Commands",
  default_permission: false,
  timeout: 3000,
  category: "whitelist",
  userPerms: ["SEND_MESSAGES"],
  ownerOnly: false,

  run: async (client, interaction, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle(` `)
      .setDescription(
        `> 👾 **oAuth2 Menu**\n\`clean, refresh, joinall, users, leave, wl [add/remove/list]\`\n\n> 👾 **Extra Cmds Menu**\n\`btn, links \`\n\n**Default Prefix:** \`/\`\n**After there authorized it brings them to the verified discord page!**`,
      )
      .setColor(`#FFFFF`)
      .setFooter({ text: ` ` });
    await interaction.reply({ embeds: [embed] });
  },
};
