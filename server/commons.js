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
Meteor.publish("rooms", function() {
    return Room.find();
});
Meteor.publish("messages", function() {
    return Messages.find();
});
