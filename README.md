# GeoSlack

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/fnqaM5soqgNJruSNFm8pdqUw/styfle/geoslack'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/fnqaM5soqgNJruSNFm8pdqUw/styfle/geoslack.svg' />
</a>

Slack integration that lets your team plot and share their locations on a map.

![GeoSlack](https://styfle.github.io/geoslack/img/pic1.png)

## Prerequisites

1. You must be an admin for a Slack Workspace
2. You must have a way to deploy this node.js app such as
    - Heroku
    - Zeit Now
    - Host it yourself

## Create a Incoming Webhook

- Login to your Slack workspace
- Go to [api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks#share_your_incoming_webhook_as_a_slack_app)
- Click on [incoming webhook integration](https://my.slack.com/services/new/incoming-webhook/) near the top
- You will see this page:
   ![IncomingWebhook01](https://styfle.github.io/geoslack/img/pic2.png)
- Select a channel and then click the big green **Add Incoming WebHooks Integration** button
- Scroll down to the **Integration Settings** where you will see this page:
   ![IncomingWebHook02](https://styfle.github.io/geoslack/img/pic3.png)

## Deployment

The following assumes you want to deploy GeoSlack to Heroku. However, you can deploy to any server that can run node.js and change environment variables.

- Click this button [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
- Type in a name for your app
- After deployment, scroll near the top and find the app's  **Settings**
- Add Heroku config variables for:
   - `APP_URL` - Format of URL is `http://<your_heroku_app_url>/findme`
   - `SLACK_INCOMING_WEBHOOK_URL` - From Step 1 above, but **SHOULD NOT** include the http://hooks.slack.com hostname.  See example below
   - `GMAPS_API_KEY` - From Google Maps [click to get api key](https://developers.google.com/maps/documentation/javascript/get-api-key)
    ![HerokuConfigVars](https://styfle.github.io/geoslack/img/pic4.png)

## (Optional) Create an Outgoing Webhook

- Go to [api.slack.com/outgoing-webhooks](https://api.slack.com/outgoing-webhooks)
- Click on [outgoing webhook integration](https://my.slack.com/services/new/outgoing-webhook) near the top
- Click the big green **Add Outgoing Webhook Integration** button
- Add url `http://<your_heroku_app_url>/slack`
    ![OutgoingWebhook](https://styfle.github.io/geoslack/img/pic5.png)

