Template.home.rooms = function() {
    var data = Room.find({}, {sort: [["last_active", "desc"]]}).fetch();
    return data.map(function(x){
        x.relative_time = $.timeago(new Date(x.last_active));
        x.last_active = new Date(x.last_active).toISOString();
        x.ismine = (x.ownername == getUser(Meteor.userId()));
        return x;
    });
};

Template.home.events({
        'click #createButton': function(e) {
            var x = $("#newRoomName").val();
            Room.insert({
                    name: x,
                    owner: Meteor.userId(),
                    ownername: getUser(Meteor.userId()),
                    last_active: +new Date
            });
            $("#newRoomName").val("");
        },
        'click .deleteRoom': function(e) {
            Room.remove(this._id);
        }
});
