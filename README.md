angular-endpoints
=================

Sample project using Angular, Google Cloud Endpoints, and `endpoints-proto-datastore`

To try it, swap the `CLIENT_ID` in `app.js` and `main.py` for your own, then run:
```~/google_appengine/dev_appserver.py . --log_level=info --port=8888```
and also
```python -m SimpleHTTPServer 7777```

Then visit [http://localhost:7777](http://localhost:7777) in a browser.

###TODO  
Make auth lazier by storing the auth token and then refreshing in the background. Consider using routes to make a separate auth page.  
Upgrade to Angular 1.2  
Upgrade to Bootstrap 3
