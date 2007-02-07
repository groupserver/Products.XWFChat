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
    form = document.getElementById('chat_form');
    form['message'].value = '';
    form['message'].focus();
    form['submit'].value = 'send';
    form['submit'].disabled = false;
    data = eval(transport.responseText);
    populate_messages( data );
    // And reset
    resetBind();
};

function populate_user_list( user_container_object, data ) {
    user_container_object.innerHTML = '';
    for (var x = 0; x < data.length; x++)
    {
       userContainer = document.createElement("div");
       userContainer.className = 'chatusercontainer';
       
       userDiv = document.createElement("div");
       userDiv.id = 'chatuserid_'+data[x]['user_id'];
       userDiv.innerHTML = data[x]['user_realname'];
       userDiv.className = 'chatuserid';
       
       userContainer.appendChild(userDiv);
       user_container_object.appendChild(userContainer);
       
       timestamp = Date.parseIso8601(data[x]['last_message']);
    }
};

function populate_messages( data ) {
    chatMessages = document.getElementById('chatmessages');
    chatUsers = document.getElementById('chatusers');
    chatPastUsers = document.getElementById('chatpastusers');
    
    form = document.getElementById('chat_form');
    
    callbackBackoff = data['backoff'];
    
    messages = data['messages'];
    users = data['users'];
    pastusers = data['past_users'];
    
    for (var x = 0; x < messages.length; x++)
    {
       msgContainer = document.createElement("div");
       
       if (oddRow) {
           msgContainer.className = 'chatmessagerowodd';
       } else {
           msgContainer.className = 'chatmessageroweven';
       }
       oddRow = !oddRow;
       
       msgDiv = document.createElement("div");
       msgDiv.innerHTML = messages[x]['message']
       msgDiv.className = 'message';
       userDiv = document.createElement("div");
       userDiv.innerHTML = messages[x]['user_realname']
       userDiv.className = 'userid';
       timeDiv = document.createElement("div");
       timestamp = Date.parseIso8601(messages[x]['timestamp'])
       timeDiv.innerHTML = '('+timestamp+')'
       timeDiv.className = 'timestamp';
       
       msgContainer.appendChild(userDiv);
       msgContainer.appendChild(timeDiv);
       msgContainer.appendChild(msgDiv);
       
       chatMessageLength = chatMessages.childNodes.length;
       if (chatMessageLength >= maxChatMessages) {
           chatMessages.removeChild(chatMessages.childNodes[0]);
        chatMessages.appendChild(msgContainer);
       } else {
        chatMessages.appendChild(msgContainer);;
       };
    
       lastTimestamp = messages[x]['timestamp']; 
       form['last_timestamp'].value = lastTimestamp;
       
       lastChecksum = messages[x]['checksum']; 
       form['last_checksum'].value = lastChecksum;
       
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
    data = eval(transport.responseText);
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
    form = document.getElementById('chat_form');
    groupID = form['group_id'].value;
    userID = form['user_id'].value;
    if (isCallInProgress()) {
        callInProgress.transport.abort();
        callInProgress = null;
    };

    callInProgress = new Ajax.Request('cb_chat', 
       {parameters: {'group_id': groupID,
                     'user_id': userID,
                     'last_timestamp': lastTimestamp,
                     'last_checksum': lastChecksum},
        onSuccess: cb_chat,
        onFailure: onErrorHandler,
        onComplete: function(transport, json) { callInProgress = null; },
       }
    );
}

function chatSubmit ( event ) {
    // stop the form getting submitted
    Event.stop(event);
    
    if (isCallInProgress()) {
        callInProgress.transport.abort();
        callInProgress = null;
    };
    
    if (currentTimeoutId) {
       window.clearTimeout(currentTimeoutId);
    }
    
    form = $('chat_form');
    form['message'].blur();
    form['submit'].disabled;
    form['submit'].value = 'sending...';
    
    callInProgress = new Ajax.Request('submit_message', 
       {parameters: form.serialize(true),
        onSuccess: populate_after_submit,
        onFailure: onErrorHandler,
        onComplete: function(transport, json) { callInProgress = null; },
       }
    );
    
    return false;
};
  
function chatForm() {
  Event.observe($('chat_form'), 'submit', chatSubmit);
}

Event.observe(window, 'load', chatForm);
Event.observe(window, 'load', chatBind);
