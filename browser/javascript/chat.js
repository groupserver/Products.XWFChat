lastTimestamp = null;
lastId = null;
lastChecksum = null;
currentTimeoutId = null;
maxChatMessages = 50;
callbackBackoff = 10000;
timeout = 30;
oddRow = true;

function cb_timeout() {
    chatBind();
};

function populate_after_submit( transport ){
    jQuery('#message').val('').focus();
    jQuery('#submit').val('send').attr('disabled','');
    
    var data = eval(transport);
    populate_messages( data );
    resetBind();
};

function populate_user_list( user_container_object, data ) {
    user_container_object.empty();
    var seenIds = {};
    
    for (var x = 0; x < data.length; x++)
    {
       if (!(data[x]['user_id'] in seenIds)) {
           seenIds[data[x]['user_id']] = '';
           
           userContainer = jQuery(user_container_object).append("<div/>").children(':last-child');
           userContainer.addClass('chatusercontainer');
           
           userDiv = userContainer.append("<div/>").children(':last-child');
           userDiv.attr('id', 'chatuserid_' + data[x]['user_id']);
           userDiv.text(data[x]['real_name']);
           userDiv.addClass('chatuserid');
           
           timestamp = Date.parseIso8601(data[x]['last_message']);
        }
    }
};

function populate_messages( data ) {
    if (!data) {
      return;
    }

    var chatMessages = jQuery('#chatmessages');
    var form = jQuery('#chat_form');
    var callbackBackoff = data['backoff'];
    var mess = data['messages'];
    var users = data['users'];
    var pastusers = data['past_users'];

    var timeDiv = null;
    var timestamp = null;
    var msgDiv = null;
    var msgContainer = null;
    var chatMessageLength = null;

    var x = 0;
    for ( x in mess )
    {
       msgContainer = chatMessages.append('<div/>').children(':last-child');
       
       //Toggle between odd and even.
       if (oddRow) {
           msgContainer.addClass('chatmessagerowodd');
       } else {
           msgContainer.addClass('chatmessageroweven');
       }
       oddRow = !oddRow;
       
       userDiv = msgContainer.append('<div/>').children(':last-child');
       userDiv.text(mess[x]['real_name']);
       userDiv.addClass('userid');
       
       timeDiv = msgContainer.append('<div/>').children(':last-child');
       timestamp = Date.parseIso8601(mess[x]['timestamp']);
       timeDiv.text('('+timestamp+')');
       timeDiv.addClass('timestamp');

       msgDiv = msgContainer.append('<div/>').children(':last-child');
       msgDiv.html(mess[x]['message']);
       msgDiv.addClass('message');
       
       chatMessageLength = chatMessages.children().length;
       if (chatMessageLength >= maxChatMessages) {
          for (var ind = 0; ind < (chatMessageLength - maxChatMessages); ind++) {
               chatMessages.children(':first-child').remove()
          };
       };
    
       lastTimestamp = mess[x]['timestamp']; 
       jQuery('#last_timestamp').val(lastTimestamp);
       
       lastChecksum = mess[x]['checksum']; 
       jQuery('#last_checksum').val(lastChecksum);
       
       lastId = mess[x]['message_id'];       
       jQuery('#last_id').val(lastId);
       
       chatMessages.each(function(){this.scrollTop = this.scrollHeight});

    }
    
    var chatUsers = jQuery('#chatusers');
    populate_user_list(chatUsers, users);
    var chatPastUsers = jQuery('#chatpastusers');
    populate_user_list(chatPastUsers, pastusers);
};

function resetBind() {
    jQuery('#chat-o-swirl').css('display', 'none');

    if (isCallInProgress()) {
        callInProgress.abort();
        callInProgress = null;
    };
    delay = callbackBackoff;   
    currentTimeoutId = window.setTimeout( "cb_timeout()", delay /* milliseconds */);
};

function cb_chat( transport, json ) {
    var data = eval(transport);
    populate_messages( data );
    resetBind();
};

function onErrorHandler( transport, json ) {
    resetBind();
};

callInProgress = null;

function isCallInProgress ( ) {
        if (callInProgress == null ) {
            return false;
        };

        switch (callInProgress.readyState) {
            case 1: case 2: case 3:
                return true;
                break;
            default:
                return false;
                break;               
        };
};

function chatBind () {
    var form = jQuery('#chat_form');
    var groupID = jQuery('#group_id').val();
    var userID = jQuery('#user_id').val();
    if (isCallInProgress()) {
        callInProgress.abort();
        callInProgress = null;
    };

    jQuery('#chat-o-swirl').css('display', 'block');

    callInProgress = jQuery.ajax(
      {'url':     'cb_chat',
       'data':   {'group_id': groupID,
                  'user_id': userID,
                  'last_timestamp': lastTimestamp,
                  'last_checksum': lastChecksum,
                  'last_id': lastId},
       'success':  cb_chat,
       'error':    onErrorHandler,
       'complete': function(transport, json) { callInProgress = null; },
       'cache': false
     });
}

function chatSubmit ( event ) {
    // stop the form getting submitted
    
    if (isCallInProgress()) {
        callInProgress.abort();
        callInProgress = null;
    };
    
    if (currentTimeoutId) {
       window.clearTimeout(currentTimeoutId);
    }
    
    form = jQuery('#chat_form');
    jQuery('#message').blur();
    jQuery('#submit').attr("disabled","disabled");
    jQuery('#submit').val('Sending\u2026');

    jQuery('#chat-o-swirl').css('display', 'block');

    callInProgress = jQuery.ajax(
      {'url':      'submit_message',
       'data':     form.serialize(),
       'success':  populate_after_submit,
       'error':    onErrorHandler,
       'complete': function(transport, json) { callInProgress = null; },
       'cache': false
     });
    
    return false;
};

function chatForm() {
  jQuery('#chat_form').submit(chatSubmit);
}

jQuery(document).ready( function () {
    chatForm();
    chatBind();
});

