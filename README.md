# GeoSlack
Slack integration that lets your Slack team plot and share their locations on a map

![GeoSlack](https://hsikiq.bn1301.livefilestore.com/y3p6nsGwSei1Eh1DdaYiW-1IffNbzfzSSzlNc4orKBp_8jPFYuXZh9DSTVzWNxq_FsJ0bfAJ6uVL5ZaUVdJqwMib5PPDS42AjDgIFatuynGrVEFGG2eWE-MjL-0PGBvonRw7G0julDw0QLFuMbX-mlGvsHuinxiUMdC2OPGSz9pDIM/00GeoSlack.PNG?psid=1)

## Configuration and Installation

1. Set up a Slack Incoming Webhook 

   ![IncomingWebHook](https://hcikiq.bl3302.livefilestore.com/y3p_kLsv6o6yDajh-NGoAgc1L1vp90eOuwnL9Bbej1nYoz52emGqOmZRB94ZApW9YAWVp5blpkLzDG2ilReAq7hVF3QezMN2M0-X1SVIO_9y9xaapyoeQnFEHD_DxHtue-5jUaPD-kJ57K3dC8Y8kIwpsYtuj4Z1TqlUDaYxx28n-o/SlackWebhookIncoming.PNG?psid=1)

2. Click the button below to deploy the app to your Heroku account.

   [![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

   Name your app. Under __Settings__, add Heroku config variables for:
   - __`APP_URL`__- Format of URL is `http://<your_heroku_app_url>/geoloc.htm`
   - __`SLACK_INCOMING_WEBHOOK_URL`__ - From Step 1 above, but __SHOULD NOT__ include the http://hooks.slack.com hostname.  See example below
   
    ![HerokuConfigVars](https://hyikiq.bn1301.livefilestore.com/y3p9frXuTThjY1WMVjD3ktFGAGL4MsAeY5X7u9DczSHX-YaZjAa3f7a6EXlufjWDzFqISGkzgVjvaoGbUP5Fy9x_RaiZ6xK7NgtVT13Cr21N86HQm1QcHhNh0ZeTp6m-ferExjBy1OKjssRb6Ec-zc7aG8E7x1hV5XStrulBgCzoW8/03GeoSlack.PNG?psid=1)

3. Set up a Slack Outgoing Webhook.  

    ![OutgoingWebhook](https://hiikiq.bn1301.livefilestore.com/y3pjKeJPVnOFsoTT9yGkNXBMFXBh-GIdS1DVcBWk7Sp4_U_eEjVbWgWT2bW0ntE3XbQ4aqg2dEcq0sGUcEd4Q8TSECDmgE3_fxx3SfQsdA1HUWkewFdQHcw0fVb3U-NO0EjwuThpXESkJl4TXghYaijslkJ9v3qaJpIIGIz2za6p-k/SlackWebhookOutgoing.PNG?psid=1)
    
    - URL(s) - Format of URL is `http://<your_heroku_app_url>/slack`