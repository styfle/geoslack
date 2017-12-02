# GeoSlack <img alt="Logo" width="28" height="28" src="https://styfle.github.io/geoslack/img/geoslack.svg" align="left" />

[![npm](https://img.shields.io/npm/v/geoslack.svg)](https://www.npmjs.com/package/geoslack)
[![Downloads](https://img.shields.io/npm/dt/geoslack.svg)](https://www.npmjs.com/package/geoslack)
[![Dependency Status](https://david-dm.org/styfle/geoslack.svg)](https://david-dm.org/styfle/geoslack)
[![devDependency Status](https://david-dm.org/styfle/geoslack/dev-status.svg)](https://david-dm.org/styfle/geoslack#info=devDependencies)
[![Build Status](https://travis-ci.org/styfle/geoslack.svg?branch=master)](https://travis-ci.org/styfle/geoslack)

GeoSlack is a simple Slack integration that lets your team plot and share their locations on a map 🗺

If your team works in the same office building, GeoSlack can make it easy to keep everyone in the loop on who's running late to work. Team members can bookmark GeoSlack which will post the member's location (optionally auto-refresh your location) and their estimated time of arrival (ETA) in a Slack channel.

It's a one-click solution to tell your team, "I'm on my way!". You can even visit GeoSlack to see everyone's location on a single map.

Your team will thank you when they see you're going to be 10 minutes late due to the traffic downtown and know they must delay that early meeting 📅

![Find Me](https://styfle.github.io/geoslack/img/findme.png)

## Prerequisites

1. You must be an admin for a Slack Workspace
2. You must have a way to deploy this node.js app such as
    - Heroku
    - Zeit Now
    - Host it yourself
3. You must have team members in the same Slack Team/Workspace (optional 😜)

![Tracking](https://styfle.github.io/geoslack/img/tracking.png)

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
- Assign a Custom Icon such as the [GeoSlack Logo](https://styfle.github.io/geoslack/img/geoslack.png)
   ![IncomingWebHook02](https://styfle.github.io/geoslack/img/webhook-name.png)
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

This code was forked from [concurlabs/geoslack](https://github.com/concurlabs/geoslack) which is no longer maintained.

Since forking, the following new features were added:

1. A new page to show everyone's location
2. Display ETA to user's destination 
3. Periodically update the user's location
4. A logo

Follow [ceriously.com](https://www.ceriously.com) for more Open Source Software!