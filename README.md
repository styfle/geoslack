# GeoSlack
Slack integration that lets your Slack team plot and share their locations on a map
![GeoSlack](https://styfle.github.io/geoslack/img/pic1.png)

## Configuration and Installation

1. Generate a Slack Incoming Webhook
   - Login to Slack
   - Go to [this link](https://api.slack.com/incoming-webhooks#share_your_incoming_webhook_as_a_slack_app)
   - Click on "..__incoming webhook integration__" near the top paragraph of the page.  Then you'll see this page..

   ![IncomingWebhook01](https://styfle.github.io/geoslack/img/pic2.png)

    - Click the green button (see above), then you'll see this page (below).  You'll have to scroll down to the __Integration Settings__ to see it:

   ![IncomingWebHook02](https://styfle.github.io/geoslack/img/pic3.png)

2. Click the button below to deploy the app to your Heroku account.

   [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

   Name your app. After it has been deployed, scroll near the top and find the app's  __Settings__. Add Heroku config variables for:
   - __`APP_URL`__- Format of URL is `http://<your_heroku_app_url>/findme`
   - __`SLACK_INCOMING_WEBHOOK_URL`__ - From Step 1 above, but __SHOULD NOT__ include the http://hooks.slack.com hostname.  See example below
   - __`GMAPS_API_KEY`__ - From Google Maps [click to get api key](https://developers.google.com/maps/documentation/javascript/get-api-key)

    ![HerokuConfigVars](https://styfle.github.io/geoslack/img/pic4.png)

3. Set up a Slack Outgoing Webhook.  
   - Go to this [link](https://api.slack.com/outgoing-webhooks)
   - Click on "..__outgoing webhook integration__" near the top paragraph of the page.  It will take you to a page with a big green button that says __Add Outgoing Webhook Integration__.  Click that.  You will be then taken to this page..
    ![OutgoingWebhook](https://styfle.github.io/geoslack/img/pic5.png)

    - URL(s) - Format of URL is `http://<your_heroku_app_url>/slack`

