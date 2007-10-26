lastTimestamp = null;
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
    //form = document.getElementById('chat_form');
    var form = jQuery("#chat_form");
    //form['message'].value = '';
    //form['message'].focus();
    jQuery('#message').val('').focus();
    
    //form['submit'].value = 'send';
    jQuery('#submit').val('send');
    //form['submit'].disabled = false;
    jQuery('#submit').attr('disabled','');
    
    //data = eval(transport.responseText);
    var data = eval(transport);
    populate_messages( data );
    // And reset
    resetBind();
};

function populate_user_list( user_container_object, data ) {
    user_container_object.innerHTML = '';
    for (var x = 0; x < data.length; x++)
    {
       //userContainer = document.createElement("div");
       userContainer = jQuery(user_container_object).append("<div/>").children(':last-child');
       //userContainer.className = 'chatusercontainer';
       userContainer.addClass('chatusercontainer');
       
       //userDiv = document.createElement("div");
       userDiv = userContainer.append("<div/>").children(':last-child');
       //userDiv.id = 'chatuserid_'+data[x]['user_id'];
       userDiv.attr('id', 'chatuserid_' + data[x]['user_id']);
       //userDiv.innerHTML = data[x]['user_realname'];
       userDiv.html(data[x]['user_realname']);
       //userDiv.className = 'chatuserid';
       userDiv.addClass('chatuserid');
       
       //userContainer.appendChild(userDiv);
       //user_container_object.appendChild(userContainer);
       
       timestamp = Date.parseIso8601(data[x]['last_message']);
    }
};

function populate_messages( data ) {
    if (!data) {
      return;
    }

    //chatMessages = document.getElementById('chatmessages');
    var chatMessages = jQuery('#chatmessages');
    //chatUsers = document.getElementById('chatusers');
    var chatUsers = jQuery('#chatusers');
    //chatPastUsers = document.getElementById('chatpastusers');
    var chatPastUsers = jQuery('#chatpastusers');
    //form = document.getElementById('chat_form');

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
    var oddRow = false;
    
    for (var x = 0; x < mess.length; x++)
    {
       //msgContainer = document.createElement("div");
       msgContainer = chatMessages.append('<div/>').children(':last-child');
       
       //Toggle between odd and even.
       if (oddRow) {
           //msgContainer.className = 'chatmessagerowodd';
           msgContainer.addClass('chatmessagerowodd');
       } else {
           //msgContainer.className = 'chatmessageroweven';
           msgContainer.addClass('chatmessageroweven');
       }
       oddRow = !oddRow;
       
       //userDiv = document.createElement("div");
       userDiv = msgContainer.append('<div/>').children(':last-child');
       //userDiv.innerHTML = mess[x]['user_realname']
       userDiv.text(mess[x]['user_realname']);
       //userDiv.className = 'userid';
       userDiv.addClass('userid');
       
       //timeDiv = document.createElement("div");
       timeDiv = msgContainer.append('<div/>').children(':last-child');
       timestamp = Date.parseIso8601(mess[x]['timestamp']);
       //timeDiv.innerHTML = '('+timestamp+')'
       timeDiv.text('('+timestamp+')');
       //timeDiv.className = 'timestamp';
       timeDiv.addClass('timestamp');

       //msgDiv = document.createElement("div");
       msgDiv = msgContainer.append('<div/>').children(':last-child');
       //msgDiv.innerHTML = mess[x]['message']
       msgDiv.text(mess[x]['message']);
       //msgDiv.className = 'message';
       msgDiv.addClass('message');
       
       //msgContainer.appendChild(userDiv);
       //msgContainer.appendChild(timeDiv);
       //msgContainer.appendChild(msgDiv);
       
       //chatMessageLength = chatMessages.childNodes.length;
       chatMessageLength = chatMessages.children().length;
       if (chatMessageLength >= maxChatMessages) {
           chatMessages.removeChild(chatMessages.childNodes[0]);
       //     chatMessages.appendChild(msgContainer);
       //} else {
        //chatMessages.appendChild(msgContainer);;
       };
    
       lastTimestamp = mess[x]['timestamp']; 
       // form['last_timestamp'].value = lastTimestamp;
       jQuery('#last_timestamp').val(lastTimestamp);
       
       lastChecksum = mess[x]['checksum']; 
       // form['last_checksum'].value = lastChecksum;
       jQuery('#last_checksum').val(lastChecksum);
       
       chatMessages.scrollTop = chatMessages.scrollHeight-chatMessages.clientHeight;
    }
    
    populate_user_list(chatUsers, users);
    populate_user_list(chatPastUsers, pastusers);
};

function resetBind() {
    if (isCallInProgress()) {
        callInProgress.transport.abort();
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

        switch (callInProgress.transport.readyState) {
            case 1: case 2: case 3:
                return true;
                break;
            default:
                return false;
                break;               
        };
};

function chatBind () {
    //form = document.getElementById('chat_form');
    var form = jQuery('#chat_form');
    //groupID = form['group_id'].value;
    var groupID = form.children('group_id').value;
    //userID = form['user_id'].value;
    var userID = form.children('user_id').value
    if (isCallInProgress()) {
        callInProgress.transport.abort();
        callInProgress = null;
    };

    /*
    callInProgress = new Ajax.Request('cb_chat', 
       {parameters: {'group_id': groupID,
                     'user_id': userID,
                     'last_timestamp': lastTimestamp,
                     'last_checksum': lastChecksum},
        onSuccess: cb_chat,
        onFailure: onErrorHandler,
        onComplete: function(transport, json) { callInProgress = null; }
       }
    );
    */
    jQuery.ajax(
      {'url':     'cb_chat',
       'data':   {'group_id': groupID,
                  'user_id': userID,
                  'last_timestamp': lastTimestamp,
                  'last_checksum': lastChecksum},
       'success':  cb_chat,
       'error':    onErrorHandler,
       'complete': function(transport, json) { callInProgress = null; }
     });
}

function chatSubmit ( event ) {
    // stop the form getting submitted

    //Event.stop(event);
    jQuery('#chat_form').unbind('submit') // No clean map
    
    if (isCallInProgress()) {
        callInProgress.transport.abort();
        callInProgress = null;
    };
    
    if (currentTimeoutId) {
       window.clearTimeout(currentTimeoutId);
    }
    
    //form = $('chat_form');
    form = jQuery('#chat_form');
    //form['message'].blur();
    jQuery('#message').blur();
    //form['submit'].disabled;
    jQuery('#submit').attr("disabled","disabled");
    jQuery('#submit').val('Sending\u2026');
    //form['submit'].value = 'sending...';
    
    /*
    callInProgress = new Ajax.Request('submit_message', 
       {parameters: form.serialize(true),
        onSuccess: populate_after_submit,
        onFailure: onErrorHandler,
        onComplete: function(transport, json) { callInProgress = null; }
       }
    );
    */
    jQuery.ajax(
      {'url':      'submit_message',
       'data':     form.serialize(),
       'success':  populate_after_submit,
       'error':    onErrorHandler,
       'complete': function(transport, json) { callInProgress = null; }
     });
    
    return false;
};
  
function chatForm() {
  //Event.observe($('chat_form'), 'submit', chatSubmit);
  jQuery('#chat_form').submit(chatSubmit);
}

//Event.observe(window, 'load', chatForm);
//Event.observe(window, 'load', chatBind);
jQuery(document).ready( function () {
    chatForm();
    chatBind();
});

