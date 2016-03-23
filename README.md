# GeoSlack
Slack integration that lets your Slack team plot and share their locations on a map
![GeoSlack](https://g63f5g.bn1301.livefilestore.com/y3pcSJShoDpkk0DEc4jD1h8B5xdH0Cs8tSSN-WbfEQXDg8clyIIn4Ez5gicTjgDlcdr9dPXAc18LZUgOsvng5f-nqq3VitlJDCPIR3Ea-R7CAGqiHjago_9MvC5iU2parNaYsrJRAQD594jEKw13JTNJQWhKS9s7OeGM1iiFCSGP_A/01GeoSlack.png?psid=1)

## Configuration and Installation

1. Generate a Slack Incoming Webhook
   - Login to Slack
   - Go to this [link](https://api.slack.com/incoming-webhooks#share_your_incoming_webhook_as_a_slack_app)
   - Click on "..__incoming webhook integration__" near the top paragraph of the page.  Then you'll see this page..

   ![IncomingWebhook01](https://jfqcza.bn1301.livefilestore.com/y3p_S5RMPKFKxoC_zxhI98n5BAS32_GCFjrUQDC4t67_t728rQYkKz8aaXVFs53YUNxufIoIfoXD59s1pj_4cDzltcS502hNhGNAOB-lMKDcBAb8gSjFBMljjDiC0Zm9X8rxJ8ACgR8gabTd2LlEUaPyR7e7aDmg6eMBYCAs4fXQkA/webhooks01.PNG?psid=1)

    - Click the green button (see above), then you'll see this page (below).  You'll have to scroll down to the __Integration Settings__ to see it:

   ![IncomingWebHook02](https://hcikiq.blu.livefilestore.com/y3pwzyFTFZyaKzc37ldIv1nPP9TVS21yA1PgDC4MLunpdj9y9DboT4_ME70hNPKbdeIjm_N1x_yZgeIveudbUu6XrxGLNfb2dmUBS_KG2-WYZ9N9i4zzJI-HDio9L9WaxXibCDmxnZxG1GrTTXXggav-6X6ND1TInWCarz4iYuxa3Q/SlackWebhookIncoming.PNG?psid=1)

2. Click the button below to deploy the app to your Heroku account.

   [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

   Name your app. After it has been deployed, scroll near the top and find the app's  __Settings__. Add Heroku config variables for:
   - __`APP_URL`__- Format of URL is `http://<your_heroku_app_url>/geoloc.htm`
   - __`SLACK_INCOMING_WEBHOOK_URL`__ - From Step 1 above, but __SHOULD NOT__ include the http://hooks.slack.com hostname.  See example below

    ![HerokuConfigVars](https://hyikiq.bn1301.livefilestore.com/y3p_vZT1hhmrdl2miONAd6x1VJH5dB7WPesWLClmTHsqaqpYGWunJHkmaBOKFzvSBknQ8ZEZfXZ0hI2RGCyeBcuwdTRAujxmNBJ4eAkUZM-eQxtWlrr6xTh59MUMc5RRDUAqNBXVrfeU0fbsSSDmktT3xCxrAWtw0qx2wHhKrqJPl4/03GeoSlack.PNG?psid=1)

3. Set up a Slack Outgoing Webhook.  
   - Go to this [link](https://api.slack.com/outgoing-webhooks)
   - Click on "..__outgoing webhook integration__" near the top paragraph of the page.  It will take you to a page with a big green button that says __Add Outgoing Webhook Integration__.  Click that.  You will be then taken to this page..
    ![OutgoingWebhook](https://hiikiq.bn1301.livefilestore.com/y3pX3jSVjMkUp6UN2Jr7sO85ijcYa-s_lVuVW9FO7azyM47GXlwPFRkHx-r3n2W37cUCYTHQboLBa8vZ4Rx7JdIzL7uWgGEx6WqnM51DG5KeR9BK9krJNDjexkyKX4xBJI_lsmw4XiypcAFJMOGUplZAGtunDtlK7fxRttuCUbGx54/SlackWebhookOutgoing.PNG?psid=1)

    - URL(s) - Format of URL is `http://<your_heroku_app_url>/slack`

## Questions, Comments, Suggestions
Email me at chris.ismael@gmail.com

## License
The MIT License (MIT)
Copyright (c) 2015 Chris Ismael

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
