Room.allow({
        insert: function(user, room) {
            room.ownername = getFriendlyName(user);
            return room.owner === user;
        },
        remove: function(user, room) {
            room.ownername = getFriendlyName(user);
            return room.owner === user;
        }
});
