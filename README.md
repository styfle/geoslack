# GeoSlack

[![npm](https://img.shields.io/npm/v/geoslack.svg)](https://www.npmjs.com/package/geoslack)
[![Downloads](https://img.shields.io/npm/dt/geoslack.svg)](https://www.npmjs.com/package/geoslack)
[![Dependency Status](https://david-dm.org/styfle/geoslack.svg)](https://david-dm.org/styfle/geoslack)
[![devDependency Status](https://david-dm.org/styfle/geoslack/dev-status.svg)](https://david-dm.org/styfle/geoslack#info=devDependencies)
[![Build Status](https://travis-ci.org/styfle/geoslack.svg?branch=master)](https://travis-ci.org/styfle/geoslack)

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/fnqaM5soqgNJruSNFm8pdqUw/styfle/geoslack'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/fnqaM5soqgNJruSNFm8pdqUw/styfle/geoslack.svg' />
</a>

Slack integration that lets your team plot and share their locations on a map.

![Find Me](https://styfle.github.io/geoslack/img/findme.png)

## Prerequisites

1. You must be an admin for a Slack Workspace
2. You must have a way to deploy this node.js app such as
    - Heroku
    - Zeit Now
    - Host it yourself
3. You must have team members in the same Slack Team/Workspace (optional 😜)

!Tracking](https://styfle.github.io/geoslack/img/tracking.png)

## Create a Incoming Webhook

This is necessary for the GeoSlack app to post a message in slack with a map/location of the user.

- Login to your Slack workspace
- Go to [api.slack.com/incoming-webhooks](https://api.slack.com/incoming-webhooks#share_your_incoming_webhook_as_a_slack_app)
- Click on [incoming webhook integration](https://my.slack.com/services/new/incoming-webhook/) near the top
- Select a channel and then click the big green **Add Incoming WebHooks Integration** button
   ![IncomingWebhook01](https://styfle.github.io/geoslack/img/pic2.png)
- Scroll down to the **Integration Settings**
- Double check the channel name
- Copy the Webhook URL for later
- Assign a Custom Name such as "GeoSlack"
- Assign a Custom Icon such as the `:world_map:` emoji
   ![IncomingWebHook02](https://styfle.github.io/geoslack/img/pic3.png)
- Click the Save Settings button

## Deployment

The following assumes you want to deploy GeoSlack to Heroku.

However, you can deploy to any server that can run Node.js and change environment variables.

- Click this button [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)
- Type in a name for your app such as "geoslack"
- Click the **Deploy App** button
- Click the **Settings** tab at the top
- Click the **Reveal Config Vars** button to show environment variables
- Add the following key/value pairs:
   - `APP_URL` - From "domains", format: `http://<your_heroku_domain>/findme`
   - `SLACK_WEBHOOK_URL` - From Step 1 above, format: `https://hooks.slack.com/<more>`
   - `GMAPS_API_KEY` - From Google Maps [click to get api key](https://developers.google.com/maps/documentation/javascript/get-api-key)
   - `DESTINATION` - optional address or coordinates of your team's workplace
    ![HerokuConfigVars](https://styfle.github.io/geoslack/img/pic4.png)

## (Optional) Create an Outgoing Webhook

This is optional but will allow you to type a keyword and get a link to the GeoSlack app.

- Go to [api.slack.com/outgoing-webhooks](https://api.slack.com/outgoing-webhooks)
- Click on [outgoing webhook integration](https://my.slack.com/services/new/outgoing-webhook) near the top
- Click the big green **Add Outgoing Webhook Integration** button
- Add url `http://<your_heroku_domain>/slack`
    ![OutgoingWebhook](https://styfle.github.io/geoslack/img/pic5.png)

## Prior Art

This code was forked from [concurlabs/geoslack](https://github.com/concurlabs/geoslack) which is no longer maintained. Since forking, I added a couple new features including

1. A page to show everyone's location
2. ETA to your destination 
3. (future) Periodically update location
