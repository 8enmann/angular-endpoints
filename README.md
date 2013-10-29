angular-endpoints
=================

Sample project using Angular, Google Cloud Endpoints, and `endpoints-proto-datastore`

Live demo: [http://8enmann.appspot.com/](http://8enmann.appspot.com/)  

To try it locally, swap the `CLIENT_ID` in `app.js` and `main.py` for your own, then run:
```~/google_appengine/dev_appserver.py . --log_level=info --port=8888 --use_mtime_file_watcher=true```

Then visit [http://localhost:8888](http://localhost:8888) in a browser.

###TODO  
Make auth lazier by storing the auth token and then refreshing in the background. Consider using routes to make a separate auth page.  
Add Angular touch
