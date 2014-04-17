Template.room.events({
        'keyup #message': function(e) {
            Session.set("currentroom", this._id);
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
        },
        'click #quiet': function() {
            Bans.insert({room: this.room, user: this.id});
        },
        'click #unquiet': function() {
            Bans.remove(Bans.findOne({room: this.room, user: this.id})._id);
        }
});

Template.room.helpers({
        timestring: function(time) {
            var d = new Date(time);
            function p(x){
                x = x.toString();
                if(x.length < 2) return "0" + x;
                return x;
            }
            return d.getMonth() + "/" + d.getDay() + " " + p(d.getHours())+":"+p(d.getMinutes())+":"+p(d.getSeconds());

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
