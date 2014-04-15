Room = new Meteor.Collection("rooms");
Messages = new Meteor.Collection("messages");

function getFriendlyName(user) {
    return Meteor.users.findOne({_id: user}).username;
}

Router.configure({
        layoutTemplate: "masterLayout"
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('room', {
            path: '/rooms/:_id',
            data: function() { return Room.findOne(this.params._id) }
    });
});
