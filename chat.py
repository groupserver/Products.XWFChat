import datetime
from sqlobject.index import DatabaseIndex
from sqlos._sqlos import SQLOS
from AccessControl.SecurityInfo import ClassSecurityInfo
from Globals import InitializeClass
from Products.Five import BrowserView

from sqlobject.index import DatabaseIndex
from sqlobject.col import ForeignKey
from zope.app.container import constraints
from sqlos.container import SQLObjectContainer
from sqlos.interfaces.container import ISQLObjectContainer

from sqlobject import IntCol, BoolCol, EnumCol, UnicodeCol
from sqlobject import StringCol, FloatCol, DateTimeCol
from sqlobject import sqlbuilder

from DateTime import DateTime
from zope.app.datetimeutils import DateTimeParser

from jsonserver.jsoncomponent import JSONWriter
#
# In Zope 2.9, the IDatabaseOpenedEvent doesn't appear to get fired, so
# the table creation actually needs to be done manually, because these
# subscribers don't get fired!
#
def createTablesSubscriber( obj ): #@UnusedVariable
    # An event subscriber that can be used to create the testing tables
    createTables()

def createTables( ):
    for table in [ChatMessage, ChatUser]:
        if table._connection.tableExists( table.sqlmeta.table ):
            print 'WARNING: Table already exists. Dirty test???'
        table.createTable( ifNotExists=True )
                                  
class ChatMessage( SQLOS ):
    user_id = StringCol( notNull=True )
    group_id = StringCol( notNull=True )
    timestamp = DateTimeCol( notNull=True, default=sqlbuilder.func.NOW() ) #@UndefinedVariable
    message = StringCol( notNull=True )

class ChatUser( SQLOS ):
    user_id = StringCol( notNull=True )
    group_id = StringCol( notNull=True )
    joined = DateTimeCol( notNull=True, default=sqlbuilder.func.NOW() ) #@UndefinedVariable
    last_seen = DateTimeCol( notNull=True, default=sqlbuilder.func.NOW() ) #@UndefinedVariable
    last_message = DateTimeCol( notNull=False, default=None )
    
    # integrity and performance
    uid_gid_index = DatabaseIndex(user_id, group_id, unique=True)

def time_delta_to_now_from_string( time_string ):
    """ Return a time delta as the number of seconds in past, given a datetime string.
    
    """
    dtparser = DateTimeParser()
    now_dt = datetime.datetime.now()
        
    dt = datetime.datetime(*dtparser.parse(str(time_string))[:-1])
    
    delta_dt = now_dt-dt
    
    return (delta_dt.days*86400+delta_dt.seconds)

class XWFChatView(BrowserView):
    defaultBackoff = 20 # seconds
    assumePartedAfter = 120 # seconds
    updateLastSeenAfter = 60 # don't update unless this many seconds have elapsed
    
    def _get_request_dict( self ):
        createTables()
        rdict = {}
        rdict['group_id'] = self.request.form.get('group_id')
        rdict['message'] = self.request.form.get('message')
        rdict['last_timestamp'] = self.request.form.get('last_timestamp', 0)
        
        #rdict['user_id'] = self.request.AUTHENTICATED_USER.getId()
        #if not rdict['user_id']:
        rdict['user_id'] = self.request.form.get('user_id', 'Anon')
        
        return rdict
    
    def _get_chat_user( self ):
        rdict = self._get_request_dict()
        
        chat_users = ChatUser.selectBy(group_id=rdict['group_id'],user_id=rdict['user_id'])
        if chat_users.count() == 0:
            chat_user = ChatUser(user_id=rdict['user_id'], group_id=rdict['group_id'])
        else:
            chat_user = chat_users[0]
            
        return chat_user
    
    def cb_chat( self, backoff=None, skip_user_update=False ):
        rdict = self._get_request_dict()
        now_dt = datetime.datetime.now()
        
        if not skip_user_update:
            chat_user = self._get_chat_user()
            # an optimisation to not update the last seen time every iteration
            if time_delta_to_now_from_string(chat_user.last_seen) > self.updateLastSeenAfter:
                chat_user.set(last_seen=now_dt) #@UndefinedVariable
        
        clause = ( ChatUser.q.group_id == rdict['group_id'] )
        
        users = ChatUser.select( clause, orderBy=ChatUser.q.user_id )
        ulist = []
        for user in users:
            udict = {}
            last_seen = user.last_seen
            if last_seen:
                if time_delta_to_now_from_string(last_seen) >= self.assumePartedAfter:
                    continue
                
            udict['user_id'] = user.user_id
            udict['joined'] = str(user.joined)
            udict['last_message'] = str(user.last_message)
            ulist.append(udict)
        
        last_timestamp = rdict['last_timestamp']
        if last_timestamp in ('null', ''):
            last_timestamp = str(DateTime()-(1.0/24.0))
        
        writer = JSONWriter()
        
        clause = ( sqlbuilder.AND(ChatMessage.q.group_id == rdict['group_id'],
                                  ChatMessage.q.timestamp > last_timestamp) )
        
        messages = ChatMessage.select( clause, orderBy=ChatMessage.q.timestamp )
        # backoff is converted to milliseconds
        out = {'messages': [], 'users': ulist, 'backoff': (backoff or self.defaultBackoff)*1000.0}
        for message in messages:
            msg = {}
            
            msg['user_id'] = message.user_id
            msg['timestamp'] = message.timestamp.isoformat()
            msg['message'] = message.message
            
            out['messages'].append(msg)
        
        return writer.write(out)

    def submit_message( self ):
        rdict = self._get_request_dict()
        now_dt = datetime.datetime.now()
        
        chat_user = self._get_chat_user()
        chat_user.set(last_message=now_dt, last_seen=now_dt)
        
        ChatMessage(group_id=rdict['group_id'],
                    user_id=rdict['user_id'],
                    message=rdict['message'])
        
        messages = self.cb_chat( backoff=8, skip_user_update=True )
        
        return messages

InitializeClass(XWFChatView)

