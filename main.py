# If you have not yet seen the source in basic/main.py, please take a look.

import endpoints
from google.appengine.ext import ndb
from protorpc import remote

from endpoints_proto_datastore.ndb import EndpointsModel


class Guestbook(EndpointsModel):
  content = ndb.StringProperty()
  created_at = ndb.DateTimeProperty(auto_now_add=True)
  created_by = ndb.UserProperty()


@endpoints.api(name='guestbook', version='v1', description='Simple guestbook API', allowed_client_ids=[endpoints.API_EXPLORER_CLIENT_ID, '465918363.apps.googleusercontent.com'])
class GuestbookApi(remote.Service):

  @Guestbook.method(user_required=True,
                  path='messages', http_method='POST', name='messages.insert')
  def GuestbookInsert(self, my_model):
    my_model.created_by = endpoints.get_current_user()
    my_model.put()
    return my_model

  @Guestbook.query_method(query_fields=('limit', 'order', 'pageToken'),
                          user_required=True,
                          path='messages', name='messages.list')
  def GuestbookList(self, query):
    return query.filter(Guestbook.created_by == endpoints.get_current_user())


application = endpoints.api_server([GuestbookApi], restricted=False)
