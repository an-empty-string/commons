Router.configure({
        layoutTemplate: "masterLayout",
        loadingTemplate: "loading"
});
Router.onBeforeAction('loading');
Router.map(function() {
    this.route('home', {path: '/'});
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
                    x.ismine = (x.ownername == Meteor.user().username);
                }
                var messages = Messages.find({room: this.params._id}).fetch();
                var newMsgs = [];
                messages.forEach(function(y){ 
                    var color = "#" + CryptoJS.MD5(x.sendername).toString().slice(0, 6);
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
                console.log(x);
                return x;
            }
    });
});
console.log("routes done");
