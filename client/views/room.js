Template.room.events({
        'keyup #message': function(e) {
            if(!e) e = window.event;
            if(e.keyCode == 13) {
                var text = $("#message").val();
                Messages.insert({
                        room: this._id,
                        text: text,
                        sender: Meteor.userId(),
                        sendername: getUser(Meteor.userId()),
                        time: +new Date
                });
                $("#message").val("");
            }
        }
});

Messages.find({room: Session.get("currentroom")}).observe({
        added: function() {
            console.log("the needful is being done soon!");
            window.setTimeout(function(){
                $("#allmsgs").scrollTop($("#allmsgs")[0].scrollHeight);
            }, 10);
        }
});
