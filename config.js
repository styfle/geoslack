const { APP_URL, GMAPS_API_KEY, SLACK_INCOMING_WEBHOOK_URL, PORT } = process.env;
if (!APP_URL) {
    console.error('Expected APP_URL');
}
if (!GMAPS_API_KEY) {
    console.error('Expected GMAPS_API_KEY');
}
if (!SLACK_INCOMING_WEBHOOK_URL) {
    console.error('Expected SLACK_INCOMING_WEBHOOK_URL');
}
const config = {
    port: PORT || 5000,
    app_url: APP_URL,
    gmaps_api_key: GMAPS_API_KEY,
    slack_incoming_webhook_url: SLACK_INCOMING_WEBHOOK_URL,
    decay_minutes: 10,
    mapsize: "500x400",
    maptype: "roadmap",
    label: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
    color: ["red","green","blue","orange","yellow","purple","gray","brown","black","white"],
};

module.exports = config;