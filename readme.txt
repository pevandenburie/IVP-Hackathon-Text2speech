24-April-2017 Doron Tzur
Enhanced wishlist functionality. GET will not iterate through the list and bring content info from ITK.


23-April-2017 Doron Tzur
Added basic wishlist following functionality - Adding, removing and Getting list of instances - when server is closed, the list is deleted
* POST: http://localhost:8090/wishList/auto:Nice_Guys~Nice_GuysinstanceId~vod
* DELETE: http://localhost:8090/wishList/auto:Nice_Guys~Nice_GuysinstanceId~vod
* GET: http://localhost:8090/wishList

20-April-2017 Doron Tzur
* Added get actions API. Dummy functions in defined format.
  In order to run:
  http://localhost:8090/actions?instanceId=auto%3ANice_Guys~Nice_GuysinstanceId~vod
* Enhanced logging in case of communication errors


*****
19-April-2017 Doron Tzur
Added the following functionality:
* GET /agg/content and GET contentInstances using ITK as well as with dummy files. 
Default usage: Dummy files.

In order to use ITK:
*******************
* In app.js set var content and var contentInstance to point to ITK implementation
*  Set constants.js AuthToken with the access_token as described bellow.

Getting ITK access_token:
********************************
In order to use ITK, you need to provide do the following:
Every n time set constants.js AuthToken with the Token provided by the following process:
call: https://cloudsso.cisco.com/as/token.oauth2?grant_type=client_credentials&client_id=462747c98b7746de8f1a3d38317c6b99&client_secret=572ebe4c956648d28DE89EAF25E4BE83
Just check to be in POST mode, not in GET mode.
And you should have something like that:
{
  "access_token": "JkWkK3yRtM7aymWU6O33o1WKV834",
  "token_type": "Bearer",
  "expires_in": 3599
}

In order to run
***************
* In directory where the project is found make sure to install all npm packages.
* Run node app.js (defualt port number is 8090)
* From local browser you can run the following:
http://localhost:8090/ctap/r1.3.0/agg/content?categoryId=urn%3Aspvss%3Aih%3Azorro%3Aterm%3A7000%3AACTION
http://localhost:8090/ctap/r1.3.0/contentInstances/auto%3ANice_Guys~Nice_GuysinstanceId~vod

Note that if you are using ITK, you need to make sure to use existing categories and assets.
