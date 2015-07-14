// NOTE: RENAME this file to config.js

var config = {};

// Values can be pulled from process.env.{VARIABLE}

config.host_app = {};
config.host_app.url = process.env.APP_URL; //
config.host_app.decay_minutes = 10;
config.host_app.mapsize = "500x400";
config.host_app.maptype = "roadmap";
config.host_app.label = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
config.host_app.color = ["red","green","blue","orange","yellow","purple","gray","brown","black","white"];

config.slack = {};
config.slack.incoming_webhook_endpoint = process.env.SLACK_INCOMING_WEBHOOK_URL;

module.exports = config;