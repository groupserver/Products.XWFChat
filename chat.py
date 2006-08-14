import sys
import re
import datetime
from sqlobject.index import DatabaseIndex
from sqlos._sqlos import SQLOS
from AccessControl.SecurityInfo import ClassSecurityInfo
from Globals import InitializeClass
from Products.Five import BrowserView

from sqlobject.index import DatabaseIndex
from sqlobject.col import ForeignKey, DateTimeValidator
from zope.app.container import constraints
from sqlos.container import SQLObjectContainer
from sqlos.interfaces.container import ISQLObjectContainer

from sqlobject import IntCol, BoolCol, EnumCol, UnicodeCol
from sqlobject import StringCol, FloatCol, DateTimeCol
from sqlobject import sqlbuilder

from DateTime import DateTime
from zope.app.datetimeutils import DateTimeParser

from jsonserver.jsoncomponent import JSONWriter #@UnresolvedImport
from feedparser import _HTMLSanitizer, _sanitizeHTML as sanitizeHTML #@UnresolvedImport

from formencode import validators #@UnresolvedImport
import time

# for some reason occasionally the wrong type of DateTime shows up. Bad.
def to_pythonPATCH( self, value, state ):
    if value is None:
        return None
    if isinstance( value, ( datetime.datetime, datetime.date, datetime.time, sqlbuilder.SQLExpression ) ):
        return value
    elif isinstance( value, DateTime ):
        stime = ( value.year(), value.month(), value.day(), value.hour(), value.minute(), value.second(), 0, 1, -1 )
    else:
        try:
            stime = time.strptime( value, self.format )
        except:
            raise validators.Invalid( "expected an date/time string of the '%s' format in the DateTimeCol '%s', got %s %r instead" % \
                                     ( self.format, self.name, type( value ), value ), value, state )
            
    return datetime.datetime( *stime[:7] )

DateTimeValidator.to_python = to_pythonPATCH

# In Zope 2.9, the IDatabaseOpenedEvent doesn't appear to get fired, so the
# table creation actually needs to be done manually, because these subscribers
# don't get fired!
def createTablesSubscriber( obj ): #@UnusedVariable
    # An event subscriber that can be used to create the testing tables
    createTables()

def createTables():
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
    uid_gid_index = DatabaseIndex( user_id, group_id, unique=True )

def time_delta_to_now_from_string( time_string ):
    """ Return a time delta as the number of seconds in past, given a datetime string.
    
    """
    dtparser = DateTimeParser()
    now_dt = datetime.datetime.now()
        
    dt = datetime.datetime( *dtparser.parse( str( time_string ) )[:-1] )
    
    delta_dt = now_dt-dt
    
    return ( delta_dt.days*86400+delta_dt.seconds )

substitutions = ( ( '(?i)(http://|https://)(.+?)(\&lt;|\&gt;|\)|\]|\}|\"|\'|$|\s)', 
                   '<a href="\g<1>\g<2>">\g<1>\g<2></a>\g<3>' ), 
                  ( '(?i)\*\:\)|\*\-\:\)', 
                   '<img src="++resource++smileys/yahoo_lightbulb.gif"/>' ), 
                  ( '(?i)\:\)|\:\-\)', 
                   '<img src="++resource++smileys/smile.png"/>' ), 
                  ( '(?i)\:\(|\:\-\(', 
                   '<img src="++resource++smileys/sad.png"/>' ), 
                  ( '(?i)\;\(|\;\-\(|:\.\(|:\.\.\(', 
                   '<img src="++resource++smileys/cry.png"/>' ), 
                  ( '(?i)\;\)|\;\-\)', 
                   '<img src="++resource++smileys/wink.png"/>' ), 
                  ( '(?i)\:\*|\:\-\*|\:x|\:\-x', 
                   '<img src="++resource++smileys/msn_kiss.png"/>' ), 
                  ( '(?i)@\};-', 
                   '<img src="++resource++smileys/msn_flower.png"/>' ), 
                  ( '(?i)\>\:\<|\>\:D\>', 
                   '<img src="++resource++smileys/yahoo_huggs.gif"/>' ), 
                   )

_HTMLSanitizer.acceptable_elements = ['a', 'abbr', 'acronym', 'address', 'area', 
      'b', 'big', 'blockquote', 'br', 'button', 'caption', 'center', 'cite', 'code', 
      'col', 'colgroup', 'dd', 'del', 'dfn', 'dir', 'div', 'dl', 'dt', 'em', 'fieldset', 
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'input', 'ins', 'kbd',
      'label', 'legend', 'li', 'map', 'menu', 'ol', 'optgroup', 'option', 'p', 'pre',
      'q', 's', 'samp', 'select', 'small', 'span', 'strike', 'strong', 'sub', 'sup',
      'table', 'tbody', 'td', 'textarea', 'tfoot', 'th', 'thead', 'tr', 'tt', 'u',
      'ul', 'var']

def markup_message( message ):
    for reg_exp, substitution in substitutions:
        message = re.sub( reg_exp, substitution, message )
        
    message = sanitizeHTML( message, 'UTF-8' )
    
    return message

class XWFChatView( BrowserView ):
    defaultBackoff = 14 # seconds
    backoffAfterMessage = 7 # seconds
    assumePartedAfter = 120 # seconds
    updateLastSeenAfter = 60 # don't update unless this many seconds have elapsed
    
    def _get_request_dict( self ):
        #createTables()
        rdict = {}
        rdict['group_id'] = self.request.form.get( 'group_id' )
        rdict['message'] = self.request.form.get( 'message', '' ).strip()
        rdict['last_timestamp'] = self.request.form.get( 'last_timestamp', 0 )
        
        #rdict['user_id'] = self.request.AUTHENTICATED_USER.getId()
        #if not rdict['user_id']:
        rdict['user_id'] = self.request.form.get( 'user_id', 'Anon' )
        
        return rdict
    
    def _get_chat_user( self ):
        rdict = self._get_request_dict()
        
        chat_users = ChatUser.selectBy( group_id=rdict['group_id'],
                                        user_id=rdict['user_id'] )
        if chat_users.count() == 0:
            chat_user = ChatUser( user_id=rdict['user_id'],
                                  group_id=rdict['group_id'] )
        else:
            chat_user = chat_users[0]
            
        return chat_user
    
    def cb_chat( self, backoff=None, skip_user_update=False, skip_messages=False ):
        rdict = self._get_request_dict()
        now_dt = datetime.datetime.now()
        
        if not skip_user_update:
            chat_user = self._get_chat_user()
            # an optimisation to not update the last seen time every iteration
            if time_delta_to_now_from_string( chat_user.last_seen ) > self.updateLastSeenAfter:
                chat_user.set( last_seen=now_dt ) #@UndefinedVariable
        
        clause = ( ChatUser.q.group_id == rdict['group_id'] )
        
        users = ChatUser.select( clause, orderBy=ChatUser.q.user_id )
        ulist = []
        for user in users:
            udict = {}
            last_seen = user.last_seen
            if last_seen:
                if time_delta_to_now_from_string( last_seen ) >= self.assumePartedAfter:
                    continue
                
            udict['user_id'] = user.user_id
            udict['joined'] = str( user.joined )
            udict['last_message'] = str( user.last_message )
            ulist.append( udict )
        
        last_timestamp = rdict['last_timestamp']
        if last_timestamp in ( 'null', '' ):
            last_timestamp = str( DateTime()-( 1.0/24.0 ) )
        
        writer = JSONWriter()
        
        clause = ( sqlbuilder.AND( ChatMessage.q.group_id == rdict['group_id'], 
                                  ChatMessage.q.timestamp > last_timestamp ) )
        
        messages = ChatMessage.select( clause, orderBy=ChatMessage.q.timestamp )
        # backoff is converted to milliseconds
        out = {'messages': [], 'users': ulist,
               'backoff': ( backoff or self.defaultBackoff )*1000.0}
        if not skip_messages:
            for message in messages:
                msg = {}
                
                msg['user_id'] = message.user_id
                msg['timestamp'] = message.timestamp.isoformat()
                msg['message'] = markup_message( message.message )
                
                out['messages'].append( msg )
            
        return writer.write( out )

    def submit_message( self ):
        rdict = self._get_request_dict()
        now_dt = datetime.datetime.now()
        
        clause = ( sqlbuilder.AND( ChatMessage.q.group_id == rdict['group_id'], 
                                  ChatMessage.q.user_id == rdict['user_id'] ) )
        
        past_messages = ChatMessage.select( clause, orderBy=ChatMessage.q.timestamp )
        messages = {}
        if past_messages.count():
            past_messages = past_messages.reversed()
            past_messages = past_messages.limit( 1 )
            message = past_messages[0]
            if message.message == rdict['message']:
                messages = self.cb_chat( backoff=self.defaultBackoff,
                                         skip_user_update=True, skip_messages=True )
        
        if not messages and not rdict['message']:
            messages = self.cb_chat( backoff=self.defaultBackoff,
                                     skip_user_update=True, skip_messages=True )
        elif not messages:
            chat_user = self._get_chat_user()
            chat_user.set( last_message=now_dt, last_seen=now_dt )
        
            ChatMessage( group_id=rdict['group_id'], 
                        user_id=rdict['user_id'], 
                        message=rdict['message'] )
        
            messages = self.cb_chat( backoff=self.backoffAfterMessage,
                                     skip_user_update=True )
        
        return messages

InitializeClass( XWFChatView )

