dojo.require("dojo.date");
dojo.require("dojo.widget.Tooltip");

lastTimestamp = null;
lastChecksum = null;
dojoCurrentRequest = null;
currentTimeoutId = null;
maxChatMessages = 50;
callbackBackoff = 10000;
timeout = 30;
oddRow = true;

function cb_timeout() {
    chatBind();
};

function populate_after_submit( type, data, event, kwArgs ){
    form = document.getElementById('chat_form');
    form['message'].value = '';
    form['submit'].value = 'send';
    form['submit'].disabled = false;
    populate_messages( type, data, event, kwArgs );
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
       
       tooltip = dojo.widget.createWidget("Tooltip", { connectId: userDiv.id,
                                                       toggle: "fade",
                                                       templateCssString: "",
                                                       templateCssPath: "",
                                                       hideDelay: 0.75,
                                                       showDelay: 0 });
       
       timestamp = dojo.date.fromIso8601(data[x]['last_message']);
       tooltip.setContent('<b>user</b>: '+data[x]['user_realname']+'<br/><b>last message:</b> '+timestamp);
    }
  

};

function populate_messages( type, data, event, kwArgs ) {
    
    chatMessages = document.getElementById('chatmessages');
    chatUsers = document.getElementById('chatusers');
    chatPastUsers = document.getElementById('chatpastusers');
    
    form = document.getElementById('chat_form');
    
    callbackBackoff = data['backoff'];
    
    messages = data['messages'];
    users = data['users'];
    pastusers = data['past_users'];
    
	dojo.debug("Retrieved data, length is "+data['messages'].length);
	dojo.debug("Backoff set to", data['backoff']);
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
       timestamp = dojo.date.fromIso8601(messages[x]['timestamp'])
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
    delay = callbackBackoff;   
    currentTimeoutId = window.setTimeout( "cb_timeout()", delay /* milliseconds */);    
};

function cb_chat( type, data, event, kwArgs ) {
    populate_messages( type, data, event, kwArgs);
    resetBind();
};

function onErrorHandler( type, data, event, kwArgs ) {
    resetBind();
};

function chatBind () {
    form = document.getElementById('chat_form');
    groupID = form['group_id'].value;
    userID = form['user_id'].value;
    dojoCurrentRequest = dojo.io.bind({
    	url: "cb_chat",
	load: cb_chat,
    	mimetype: "text/json",
    	encoding: "utf-8",
    	content: {'group_id': groupID, 'user_id': userID, 'last_timestamp': lastTimestamp, 'last_checksum': lastChecksum},
	error: onErrorHandler,
	timeout: onErrorHandler,
	timeoutSeconds: timeout, //The number of seconds to wait until firing timeout callback in case of timeout.
    	preventCache: true
    }); 
}

function chatForm() {
  var x = new dojo.io.FormBind({
  formNode: document.getElementById('chat_form'),
  mimetype: 'text/json',
  encoding: "utf-8",
  load: populate_after_submit,
  error: onErrorHandler,
  timeout: onErrorHandler,
  timeoutSeconds: timeout
  });
  x.onSubmit = function (form) {
    // Make sure we don't double up on requests
    if (dojoCurrentRequest) {
       dojoCurrentRequest.abort();
    }
    if (currentTimeoutId) {
       window.clearTimeout(currentTimeoutId);
    }
  	form['submit'].disable = true;
  	form['submit'].value = 'sending...';
  	return true;
  };
}

dojo.addOnLoad(chatForm);
dojo.addOnLoad(chatBind);
