var app = {

  server: 'http://127.0.0.1:3000/classes/messages',

  friends: [],

  banned: [],

  rooms: [],

  messageOptions: '<div id="options"> <button class="choices" id="friend">Add friend</button> <button class="choices" id="ban">Block</button> </div>',

  init: function() {

    var that = this;

    setInterval(function(){
      that.fetch();
    },2000);

  },

  send: function(message) {
    console.log(message);
    $.ajax({
      url: this.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log(data);
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  },

  handleData: function(data, targetUsername) {
    targetUsername = targetUsername || null;
    app.clearMessages();

    for (var i = 0; i < data.length; i++) {
      if (data[i].userid === targetUsername) {
        app.addMessage(data[i]);
      } else if (targetUsername === null) {
        app.addMessage(data[i]);
        app.addRoom(data[i].roomname);
      }
    }
  },

  fetch: function() {
    $.ajax({

      url: this.server,
      type: 'GET',
      contentType: 'application/json',
      dataType: 'json',
      success: function (data) {
        app.handleData(data);
        console.log('chatterbox: Message fetched');
      },
      error: function (data) {
        console.error('chatterbox: Failed to fetch message');
      }
    });
  },

  addMessage: function(message) {
    var userid;
    var message;


    if (message.userid === undefined || message.message === undefined) {
      userid = "undefined";
      message = "undefined";
    } else {
      userid = message.userid
      message = message.message
    }
    if (app.friends.indexOf(userid) !== -1) {
      userid =  "<b>" + userid + "</b>";
      message = "<b>" + message + "</b>";
    }
    var $toSend = '<div class="chat"><a class="username">' + userid + '</a>: ' + message + app.messageOptions + '</div>';
    $('#chats').append($toSend);
  },

  clearMessages: function() {
    $('.chat').remove();
  },

  addRoom: function(roomname) {

    if (roomname === undefined || roomname === "") {
      roomname = "lobby";
    }

    roomname = roomname.replace(/[^a-z,.!?' ]+/gi, "");

    if (app.rooms.indexOf(roomname) === -1) {
      $('#chatrooms').append('<li>' + roomname + '</li>');
      app.rooms.push(roomname);
    }

  },

  handleSubmit: function() {
    var msg = {
      userid: location.search.substring(10),
      message: $('.draft').val(),
      roomname: 'abattoir'
    };
    this.send(msg);
  },


  // addFriend: function() {

  //   //NO FRIENDS :(
  // }

};


$(document).ready(function(){

  app.init();

  $('.buttonSend').on('click', function() {
    app.handleSubmit();
    $('.draft').val('');
    return false;
  });

  $('.draft').keypress(function (e) {
    if (e.which == 13) {
      app.handleSubmit();
      $('.draft').val('');
      return false;
    }
  });

  $('body').on('click', '#friend', function() {
    var thatUser = this.parentElement.parentElement.children[0].textContent;
    if (app.friends.indexOf(thatUser) === -1) {
      app.friends.push(thatUser);
    }
  });

  $('body').on('click', '#ban', function() {
    var thatUser = this.parentElement.parentElement.children[0].textContent;
    // TODO
    // deal with overlap between banned list and friends list
    if (app.banned.indexOf(thatUser) === -1) {
      app.banned.push(thatUser);
    }
  });

});
