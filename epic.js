module.exports = {
  token: process.env['t'], 
  port: "3000",
  client: process.env['c'], 
  client_id: process.env['i'], 
  client_secret: process.env['s'], 
  redirect_uri: process.env['r'],
  footer: process.env['f'],
  support: process.env['sp'],
  log_channel: process.env['lc'],
  webhook_id: process.env['wi'],
  webhook_token: process.env['wt'], 
  autoaddid: process.env['aai'],
  wehbook: process.env['w'],
  owners: ["759388751477604353","1200057452314513543"],
  authLink: process.env['a'], 
  title: "Verified Account",
  message: "Your account has been successfully verified.",
  btn: "Go back.",
  mongodb: process.env['db']
}