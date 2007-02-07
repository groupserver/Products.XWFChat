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

from sqlobject import UnicodeCol, DateTimeCol
from sqlobject import sqlbuilder

from DateTime import DateTime
from zope.app.datetimeutils import DateTimeParser

from jsonserver.jsoncomponent import JSONWriter #@UnresolvedImport
from feedparser import _HTMLSanitizer, _sanitizeHTML as sanitizeHTML #@UnresolvedImport

from formencode import validators #@UnresolvedImport
import time

import md5

import ThreadLock
 
_thread_lock = ThreadLock.allocate_lock()

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
    user_id = UnicodeCol( notNull=True )
    group_id = UnicodeCol( notNull=True )
    timestamp = DateTimeCol( notNull=True, default=sqlbuilder.func.NOW() ) #@UndefinedVariable
    message = UnicodeCol( notNull=True )

class ChatUser( SQLOS ):
    user_id = UnicodeCol( notNull=True )
    group_id = UnicodeCol( notNull=True )
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

class ContextInfoAdapter(object):
    def __init__(self, context):
        self.context = context

    def context_info(self):
        context = self.context
        return {'id': context.getId(),
                'title': context.title_or_id(),
                'short_title': context.title_or_id()[:20],
                'uri': context.absolute_url(1)}

class ContextInfoView(BrowserView):
    def context_info(self):
        context_info = ContextInfoAdapter(self.context)
        return context_info.context_info()

class XWFChatView( BrowserView ):
    defaultBackoff = 14 # seconds
    backoffAfterMessage = 7 # seconds
    assumePartedAfter = 120 # seconds
    updateLastSeenAfter = 60 # don't update unless this many seconds have elapsed
    pastUsersTimeLimit = 86400*3 # 3 days
    maximumMessageAge = 3600*6 # 6 hours
        
    def title( self ):
        return 'Group Chat'
    
    def _get_request_dict( self ):
        #createTables()
        rdict = {}
        rdict['group_id'] = self.request.form.get( 'group_id' )
        rdict['message'] = self.request.form.get( 'message', '' ).strip()
        
        rdict['message'] = rdict['message'].decode('utf-8')
        
        rdict['last_timestamp'] = self.request.form.get( 'last_timestamp', 0 )
        rdict['last_checksum'] = self.request.form.get( 'last_checksum', '' )
        
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

    def _get_chat_user_realname( self, user_id ):
        # DEPRECATED
        return self.context.Scripts.get.user_realnames( user_id, True )
    
    def cb_chat( self, backoff=None, skip_user_update=False, skip_messages=False ):
        rdict = self._get_request_dict()
        
        last_timestamp = rdict['last_timestamp']
        if last_timestamp in ( 'null', '' ):
            last_timestamp = str( DateTime()-( self.maximumMessageAge/86400.0 ) )
            
        now_dt = datetime.datetime.now()
        
        if not skip_user_update:
            chat_user = self._get_chat_user()
            # an optimisation to not update the last seen time every iteration
            if time_delta_to_now_from_string( chat_user.last_seen ) > self.updateLastSeenAfter:
                chat_user.set( last_seen=now_dt ) #@UndefinedVariable
        
        clause = ( ChatUser.q.group_id == rdict['group_id'] )
        
        users = ChatUser.select( clause, orderBy=ChatUser.q.user_id )
        ulist = []
        olist= []
        for user in users:
            udict = {}
            
            udict['user_id'] = user.user_id
            udict['user_realname'] = self._get_chat_user_realname( user.user_id )
            try:
                udict['joined'] = user.joined.isoformat('T')[:-3]
            except:
                udict['joined'] = ''
            try:
                udict['last_message'] = user.last_message.isoformat('T')[:-3]
            except:
                udict['last_message'] = ''
                    
            last_seen = user.last_seen
            if last_seen:
                time_delta = time_delta_to_now_from_string( last_seen )
                if time_delta >= self.assumePartedAfter:
                    if time_delta <= self.pastUsersTimeLimit:
                        olist.append( udict )                    
                    continue
                
            ulist.append( udict )
        
        clause = ( sqlbuilder.AND( ChatMessage.q.group_id == rdict['group_id'], 
                                   ChatMessage.q.timestamp > last_timestamp ) )
        
        messages = ChatMessage.select( clause, orderBy=ChatMessage.q.timestamp )
        
        # backoff is converted to milliseconds
        out = {'messages': [], 'users': ulist, 'past_users': olist,
               'backoff': ( backoff or self.defaultBackoff )*1000.0}
        if not skip_messages:
            for message in messages:
                msg = {}
                
                msg['user_id'] = message.user_id
                msg['user_realname'] = self._get_chat_user_realname( message.user_id )
                msg['timestamp'] = message.timestamp.isoformat('T')[:-3]
                msg['message'] = markup_message( message.message )
                
                msg['checksum'] = md5.new(rdict['group_id']+msg['user_id']+msg['message']).hexdigest()
                
                # an extra paranoid double check
                if msg['checksum'] != rdict['last_checksum']:
                    out['messages'].append( msg )

        self.request.response.setHeader('content-type', 'application/x-javascript')
        
        writer = JSONWriter()
        
        return '('+writer.write( out )+')'

    def submit_message( self ):
        rdict = self._get_request_dict()
        now_dt = datetime.datetime.now()
        
        checksum = md5.new(rdict['group_id']+rdict['user_id']+rdict['message']).hexdigest()
        
        # skip because we've already seen this before!
        messages = {}
        if rdict['last_checksum'] == checksum:
            messages = self.cb_chat( backoff=self.defaultBackoff,
                                     skip_user_update=True, skip_messages=True )
        
        if not messages and not rdict['message']:
            messages = self.cb_chat( backoff=self.defaultBackoff,
                                     skip_user_update=True, skip_messages=True )
        elif not messages:
            chat_user = self._get_chat_user()
            chat_user.set( last_message=now_dt, last_seen=now_dt )
        
            # we were encountering a race condition when two messages were hitting the database
            # at the same instance, which happened more frequently than one would think!
            try:
                _thread_lock.acquire()
                ChatMessage( group_id=rdict['group_id'], 
                             user_id=rdict['user_id'], 
                             message=rdict['message'] )
        
                messages = self.cb_chat( backoff=self.backoffAfterMessage,
                                         skip_user_update=True )
            finally:
                _thread_lock.release()
        
        return messages

InitializeClass( XWFChatView )

