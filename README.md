# GeoSlack
Slack integration that lets your Slack team plot and share their locations on a map
![GeoSlack](https://g63f5g.bn1301.livefilestore.com/y3pcSJShoDpkk0DEc4jD1h8B5xdH0Cs8tSSN-WbfEQXDg8clyIIn4Ez5gicTjgDlcdr9dPXAc18LZUgOsvng5f-nqq3VitlJDCPIR3Ea-R7CAGqiHjago_9MvC5iU2parNaYsrJRAQD594jEKw13JTNJQWhKS9s7OeGM1iiFCSGP_A/01GeoSlack.png?psid=1)

## Configuration and Installation

1. Generate a Slack Incoming Webhook
   - Login to Slack
   - Go to this [link](https://api.slack.com/incoming-webhooks#share_your_incoming_webhook_as_a_slack_app)
   - Click on "..__incoming webhook integration__" near the top paragraph of the page.  Then you'll se this page..

   ![IncomingWebhook01](https://jfqcza.bn1301.livefilestore.com/y3p_S5RMPKFKxoC_zxhI98n5BAS32_GCFjrUQDC4t67_t728rQYkKz8aaXVFs53YUNxufIoIfoXD59s1pj_4cDzltcS502hNhGNAOB-lMKDcBAb8gSjFBMljjDiC0Zm9X8rxJ8ACgR8gabTd2LlEUaPyR7e7aDmg6eMBYCAs4fXQkA/webhooks01.PNG?psid=1)

    - Click the green button above, then you'll see this page (below).  You'll have to scroll down to the __Integration Settings_ to see it:

   ![IncomingWebHook02](https://hcikiq.blu.livefilestore.com/y3pwzyFTFZyaKzc37ldIv1nPP9TVS21yA1PgDC4MLunpdj9y9DboT4_ME70hNPKbdeIjm_N1x_yZgeIveudbUu6XrxGLNfb2dmUBS_KG2-WYZ9N9i4zzJI-HDio9L9WaxXibCDmxnZxG1GrTTXXggav-6X6ND1TInWCarz4iYuxa3Q/SlackWebhookIncoming.PNG?psid=1)

2. Click the button below to deploy the app to your Heroku account.

   [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

   Name your app. Under __Settings__, add Heroku config variables for:
   - __`APP_URL`__- Format of URL is `http://<your_heroku_app_url>/geoloc.htm`
   - __`SLACK_INCOMING_WEBHOOK_URL`__ - From Step 1 above, but __SHOULD NOT__ include the http://hooks.slack.com hostname.  See example below

    ![HerokuConfigVars](https://hyikiq.bn1301.livefilestore.com/y3pSyprbfGCGpcCwuPorF5I52RnrQP4L-zo_ulGRUh4Cvdzdj6vEZZOog8cctYH7jTEjgq0V6NjqpcgbzN6swUblTuhPtPjdZsqj1YxB0F2Gik46Ll6viBcdznbItTqrNFAET6aMzYnn6m1qRKLZ_owYjjs65ux2MzMzUHrhItoq00/03GeoSlack.PNG?psid=1)

3. Set up a Slack Outgoing Webhook.  

    ![OutgoingWebhook](https://hiikiq.bn1301.livefilestore.com/y3p28q8dPuwOVI1KLIlPXFWUGJ_rY-qzOEu8OtXHWT4Sz_xeODcoAUXj0QQ87hffpuhhE1fUJ5Gak8irw0YDh8cSI0MCmuVTa7v8l0wEmKRiYbdt_qe6ujL3QzmeXfneJexl4GoHpb1STTE_sFWVltplSTcnLFCt5EA65zOoK77jXY/SlackWebhookOutgoing.PNG?psid=1)

    - URL(s) - Format of URL is `http://<your_heroku_app_url>/slack`

## Questions, Comments, Suggestions
Email me at chris.ismael@gmail.com

## License
The MIT License (MIT)
Copyright (c) 2015 Chris Ismael

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
