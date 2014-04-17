Room.allow({
        insert: function(user, room) {
            room.ownername = getUser(user)
            room.last_active = +new Date;
            return room.owner === user;
        },
        remove: function(user, room) {
            return room.owner === user;
        }
});
Messages.allow({
        insert: function(user, msg) {
            console.log("doing the needful...");
            msg.sendername = getUser(user);
            msg.time = +new Date;
            console.log(msg);
            if(msg.sender == user) {
                console.log("the needful has been done!");
                if(Bans.find({room: msg.room, user: user}).fetch().length > 0) {
                    return false;
                }
                Room.update(msg.room, {$set: {last_active: +new Date}});
                return true;
            }
            console.log("the needful has failed!");
            return false;
        },
        remove: function(user, msg) {
            return false;
        }
});
Bans.allow({
        insert: function(user, ban) {
            console.log(ban);
            ban.name = getUser(ban.user);
            return Room.findOne(ban.room).owner === user;
        },
        remove: function(user, ban) {
            return Room.findOne(ban.room).owner === user;
        }
});
Meteor.publish("rooms", function() {
    return Room.find();
});
Meteor.publish("messages", function() {
    return Messages.find();
});
Meteor.publish("presence", function() {
    return Presences.find({}, {fields: {state: 1, room: 1, userId: 1}});
});
Meteor.publish("more-users", function() {
    return Meteor.users.find();
});
Meteor.publish("bans", function() {
    return Bans.find();
});
