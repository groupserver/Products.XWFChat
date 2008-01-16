import sys
import re
import datetime
from AccessControl.SecurityInfo import ClassSecurityInfo
from Globals import InitializeClass
from Products.Five import BrowserView

from zope.app.container import constraints

from DateTime import DateTime
from zope.app.datetimeutils import DateTimeParser

from zif.jsonserver.jsoncomponent import JSONWriter #@UnresolvedImport
from feedparser import _HTMLSanitizer, _sanitizeHTML as sanitizeHTML #@UnresolvedImport

from formencode import validators #@UnresolvedImport
import time

import md5

import ThreadLock
import Products.GSContent 

import sqlalchemy as sa
from sqlalchemy.exceptions import NoSuchTableError

_thread_lock = ThreadLock.allocate_lock()

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

def pruneIsoTime( isotime ):
    isobits = isotime.split('.')
    if len(isobits) == 2:
        ms = isobits[1]
        if len(ms) > 3:
            isotime = '%s.%s' % (isobits[0], isobits[1][:3])

    return isotime

class ChatQuery(object):
    def __init__(self, context, da, site_id, group_id):
        self.context = context
        
        self.chatUserTable = da.createMapper('chat_user')[1]
        self.chatMessageTable = da.createMapper('chat_message')[1]

        self.now = datetime.datetime.now()

        # TODO: We currently can't use site_id
        site_id = ''
        self.site_id = site_id
        self.group_id = group_id

    def get_chat_users(self):
        cut = self.chatUserTable
        
        user_select = cut.select()
        user_select.append_whereclause(cut.c.site_id == self.site_id)
        user_select.append_whereclause(cut.c.group_id == self.group_id)
        user_select.order_by(sa.desc(cut.c.user_id))
        
        r = user_select.execute()
        retval = []
        if r.rowcount:
            retval = [{'user_id': x['user_id'],
                       'real_name': self.context.get_chat_user_realname(r['user_id']),
                       'group_id': x['group_id'],
                       'joined': x['joined'],
                       'last_seen': x['last_seen'],
                       'last_message': x['last_message']} for x in r]
        
        return retval

    def get_chat_user(self, user_id):
        cut = self.chatUserTable
        
        user_select = cut.select()
        user_select.append_whereclause(cut.c.site_id == self.site_id)
        user_select.append_whereclause(cut.c.group_id == self.group_id)
        user_select.append_whereclause(cut.c.user_id == user_id)

        r = user_select.execute()
        retval = {}
        if r.rowcount:
            r = r[0]
            retval = {'user_id': r['user_id'],
                      'group_id': r['group_id'],
                      'joined': r['joined'],
                      'last_seen': r['last_seen'],
                      'last_message': r['last_message'],
                      'real_name': self.context.get_chat_user_realname(r['user_id'])}
        else:
            self.add_chat_user(self.site_id, self.group_id, user_id)
            retval = self.get_chat_user(self.site_id, self.group_id, user_id)
        
        return retval

    def add_chat_user(self, user_id):
        cut = self.chatUserTable
        
        i = cut.insert()
        i.execute(site_id=self.site_id,
                  group_id=self.group_id,
                  user_id=user_id,
                  joined=self.now,
                  last_seen=self.now,
                  last_message=None)

    def update_last_seen(self, user_id):
        cut = self.chatUserTable
        
        cut.update(site_id==self.site_id,
                   group_id==self.group_id,
                   user_id==user_id).execute(last_seen=self.now)

    def update_last_message(self, user_id):
        cut = self.chatUserTable
        
        cut.update(site_id==self.site_id,
                   group_id==self.group_id,
                   user_id==user_id).execute(last_seen=self.now,
                                            last_message=self.now)

    def get_latest_messages(self, since):
        cmt = self.chatMessageTable

        cm_select = cmt.select()
        cm_select.append_whereclause(cmt.c.site_id == self.site_id)
        cm_select.append_whereclause(cmt.c.group_id == self.group_id)
        cm_select.append_whereclause(cmt.c.user_id == user_id)
        cm_select.order_by(sa.desc(cmt.c.last_message > since))

        r = cm_select.execute()
        retval = []
        if r.rowcount:
            retval = [{'user_id': x['user_id'],
                       'real_name': self.context.get_chat_user_realname(r['user_id']),
                       'group_id': x['group_id'],
                       'message_id': x['message_id'],
                       'timestamp': x['timestamp'],
                       'message': x['message']} for x in r]
        
        return retval

    def insert_message(self, user_id, message):
        cut = self.chatMessageTable
        
        i = cmt.insert()
        i.execute(site_id=self.site_id,
                  group_id=self.group_id,
                  user_id=user_id,
                  timestamp=self.now,
                  message=message)


class XWFChatView( BrowserView ):
    defaultBackoff = 14 # seconds
    backoffAfterMessage = 7 # seconds
    assumePartedAfter = 120 # seconds
    updateLastSeenAfter = 60 # don't update unless this many seconds have elapsed
    pastUsersTimeLimit = 86400*3 # 3 days
    maximumMessageAge = 3600*6 # 6 hours
        
    def __init__( self, context, request ):
        self.context = context
        self.request = request
        self.siteInfo = Products.GSContent.view.GSSiteInfo( context )

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
        
        rdict['user_id'] = self.request.form.get( 'user_id', 'Anon' )
        
        return rdict
    
    def get_chat_user_realname( self, user_id ):
        # DEPRECATED
        return self.context.Scripts.get.user_realnames( user_id, True )
    
    def cb_chat( self, backoff=None, skip_user_update=False, skip_messages=False ):
        da = self.zsqlalchemy 
        assert da
        rdict = self._get_request_dict()

        chatQuery = ChatQuery(self, da, '', rdict['group_id'])
        
        last_timestamp = rdict['last_timestamp']
        if last_timestamp in ( 'null', '' ):
            last_timestamp = str( DateTime()-( self.maximumMessageAge/86400.0 ) )
            
        if not skip_user_update:
            # TODO: implement site_id support
            chat_user = chatQuery.get_chat_user(user_id=rdict['user_id'])
            # an optimisation to not update the last seen time every iteration
            if (chatQuery.now - chat_user['last_seen']) >= self.updateLastSeenAfter:
                chatQuery.update_last_seen()
        
        users = chatQuery.get_chat_users()
        ulist = []
        olist= []
        for user in users:
            last_seen = user['last_seen']
            if last_seen:
                time_delta = chatQuery.now - last_seen
                if time_delta >= self.assumePartedAfter:
                    if time_delta <= self.pastUsersTimeLimit:
                        olist.append( user )                    
                    continue
                
            ulist.append( user )
        
        messages = chatQuery.get_latest_messages( last_timestamp )
        
        # backoff is converted to milliseconds
        out = {'messages': [], 'users': ulist, 'past_users': olist,
               'backoff': ( backoff or self.defaultBackoff )*1000.0}
        if not skip_messages:
            for message in messages:
                message['checksum'] = md5.new(rdict['group_id']+message['user_id']+message['message']).hexdigest()
                
                # an extra paranoid double check
                if message['checksum'] != rdict['last_checksum']:
                    out['messages'].append( message )

        self.request.response.setHeader('content-type', 'application/x-javascript')
        
        writer = JSONWriter()
        
        return '('+writer.write( out )+')'

    def submit_message( self ):
        da = self.zsqlalchemy 
        assert da
        rdict = self._get_request_dict()

        chatQuery = ChatQuery(self, da, '', rdict['group_id'])

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
            chatQuery.update_last_message(user_id=rdict['user_id'])
                    
            # we were encountering a race condition when two messages were hitting the database
            # at the same instance, which happened more frequently than one would think!
            try:
                _thread_lock.acquire()
                chatQuery.insert_message(user_id=rdict['user_id'],
                                         message=rdict['message'])
        
                messages = self.cb_chat( backoff=self.backoffAfterMessage,
                                         skip_user_update=True )
            finally:
                _thread_lock.release()
        
        return messages

InitializeClass( XWFChatView )

