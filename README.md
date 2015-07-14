# GeoSlack
Slack integration that lets your Slack team plot and share their locations on a map
![GeoSlack](https://jfqcza.bn1301.livefilestore.com/y3pQJRaIZBHV3qkhOccesQeGC7mVlBmoicg2hu6oRh3sRQCjvcyGPwVcZAddSmg7VEOY5dmP81L8jDWjSUf6No7ZbPMMMIMYM2CeWnvjpR-J6pey0rjk3sINUpf-i7hnroO4iEVerwR-wlb2GEIRH4b6zv-L9bJVaO7MqEd8qJJ0Ow/00GeoSlack.PNG?psid=1)

## Configuration and Installation

1. Set up a Slack Incoming Webhook

   ![IncomingWebHook](https://jfqcza.blu.livefilestore.com/y3pS2bZuHnSbgWHHXHpQZS_Bfaa9QhwGB4-yO2RnzmMI7kQABtLps38ZxraFZSYw8zm7sVp2vd5Xl0pFn9EALxS3z-a-XLSTJF9ne7C0MbppA2xKMO8NTaIEIepy2rvu_lkJyG9tW1YVodbJXY9K08hBHU1KiVlNEIypNMdcvXllxQ/SlackWebhookIncoming.PNG?psid=1)

2. Click the button below to deploy the app to your Heroku account.

   [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

   Name your app. Under __Settings__, add Heroku config variables for:
   - __`APP_URL`__- Format of URL is `http://<your_heroku_app_url>/geoloc.htm`
   - __`SLACK_INCOMING_WEBHOOK_URL`__ - From Step 1 above, but __SHOULD NOT__ include the http://hooks.slack.com hostname.  See example below
   
    ![HerokuConfigVars](https://jfqcza.bn1301.livefilestore.com/y3p-sakzecAu1p8XW5mFse0YCNfncPLhtr5155-mJPXavSKLdJ3x0aID6lgOU1xLqlKk11BXyszWhB2Ix3vpnEcvnCMfYhxtjVv38zs2cM702oRad_MYOW1j9r6a4MxxnfJnukz2VcSAvEJXSGWFd4JLdKZrhoNwhJot9qy18m7tbM/03GeoSlack.PNG?psid=1)
   
3. Set up a Slack Outgoing Webhook.  

    ![OutgoingWebhook](https://jfqcza.bn1301.livefilestore.com/y3ptDXbbsjVGtWCgMy4W1fc3Jr7i3_HduCha_KtUIan9Q7qrHWfKc7fNrp-k_MOGpy3El1le7yyEvmPnaUDzWEGu460PHdcCaojw2Se0ces7wuN84r82173nSZvtzYLyEjN8BfbJ6VVmZpZwnhdIirKAZSVp-_w9diUn1IvthxzPkQ/SlackWebhookOutgoing.PNG?psid=1)
    
    - URL(s) - Format of URL is `http://<your_heroku_app_url>/slack`