Router.configure({
        layoutTemplate: "masterLayout",
        loadingTemplate: "loading"
});
Router.onBeforeAction('loading');
Router.map(function() {
    this.route('home', {path: '/', data: function(){Session.set("currentroom", ""); return {};}});
    this.route('room', {
            path: '/rooms/:_id',
            waitOn: function() {
                return Meteor.subscribe("rooms");
            },
            data: function() { 
                var x = Room.findOne(this.params._id);
                Session.set("currentroom", this.params._id);
                if(x){
                    x.relative_time = $.timeago(new Date(x.last_active));
                    x.last_active = new Date(x.last_active).toISOString();
                    x.ismine = (x.owner == Meteor.userId());
                }
                var messages = Messages.find({room: this.params._id}).fetch();
                var newMsgs = [];
                messages.forEach(function(y){ 
                    var color = "#" + CryptoJS.MD5(y.sendername).toString().slice(0, 6);
                    // SHAMELESSLY STOLEN FROM STACKOVERFLOW
                    function hexToRgb(hex) {
                        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                        return result ? {
                            r: parseInt(result[1], 16),
                            g: parseInt(result[2], 16),
                            b: parseInt(result[3], 16)
                        } : null;
                    }
                    color = hexToRgb(color);
                    y.magic = "background-color:rgba(" + color.r + "," + color.g + "," + color.b + ",0.1)"
                    newMsgs.push(y);
                });
                x.messages = newMsgs;
                var id = this.params._id;
                x.present = Presences.find({}).fetch().filter(function(x) {
                    try {
                        return x.state.room == id;
                    }
                    catch(e){ return false; }
                }).map(function(x) {
                    try{
                        var user = Meteor.users.findOne(x.userId);
                        return {name: user.profile.name, id: x.userId, room: id,
                            muted: (Bans.find({user: x.userId, room:id}).fetch().length > 0) };
                    }
                    catch(e){ return "unknown user"; }
                });
                console.log(x);
                window.setTimeout(function() {
                    $("#allmsgs").scrollTop($("#allmsgs")[0].scrollHeight);
                }, 10);
                x.participants = [];
                x.messages.forEach(function(y) {
                    if(x.participants.indexOf(y.sendername) == -1)
                        x.participants.push(y.sendername);
                });
                x.participants = x.participants.join(", ");
                return x;
            }
    });
});
console.log("routes done");
