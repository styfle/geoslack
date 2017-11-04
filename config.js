const { APP_URL, GMAPS_API_KEY, SLACK_WEBHOOK_URL, DESTINATION, PORT } = process.env;
if (!APP_URL) {
    console.error('Expected APP_URL');
}
if (!GMAPS_API_KEY) {
    console.error('Expected GMAPS_API_KEY');
}
if (!SLACK_WEBHOOK_URL) {
    console.error('Expected SLACK_WEBHOOK_URL');
}
const config = {
    port: PORT || 5000,
    app_url: APP_URL,
    gmaps_api_key: GMAPS_API_KEY,
    slack_webhook_url: SLACK_WEBHOOK_URL,
    destination: DESTINATION,
    decay_minutes: 10,
    mapsize: "500x400",
    maptype: "roadmap",
    colors: ["red","green","blue","orange","yellow","purple","gray","brown","black","white"],
};

module.exports = config;