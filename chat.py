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
    for table in [ChatMessage]:
        if table._connection.tableExists( table.sqlmeta.table ):
            print 'WARNING: Table already exists. Dirty test???'
        table.createTable( ifNotExists=True )
                                  
class ChatMessage( SQLOS ):
    user_id = StringCol( notNull=True )
    group_id = StringCol( notNull=True )
    timestamp = DateTimeCol( notNull=True, default=sqlbuilder.func.NOW() ) #@UndefinedVariable
    message = StringCol( notNull=True )

class XWFChatView(BrowserView):
    security = ClassSecurityInfo()
    def cb_chat( self ):
        group_id = self.request.form.get('group_id')
        last_timestamp = self.request.form.get('last_timestamp', 0)
        if last_timestamp == 'null':
            last_timestamp = 0
        
        writer = JSONWriter()
        
        clause = ( sqlbuilder.AND(ChatMessage.q.group_id == group_id,
                                  ChatMessage.q.timestamp > last_timestamp) )
        
        messages = ChatMessage.select( clause, orderBy=ChatMessage.q.timestamp )
        out = []
        for message in messages:
            msg = {}
            msg['user_id'] = message.user_id
            msg['timestamp'] = str(message.timestamp)
            msg['message'] = message.message
            
            out.append(msg)
      
        out.reverse()
        
        return writer.write(out)

    def submit_message( self ):
        group_id = self.request.form.get('group_id')
        user_id = self.request.form.get('user_id')
        message = self.request.form.get('message')
        
        user_id = self.request.AUTHENTICATED_USER.getId()
        
        print user_id
        print self.request
        
        ChatMessage(group_id=group_id, user_id=user_id, message=message)
        messages = self.cb_chat( )
        
        return messages

InitializeClass(XWFChatView)

