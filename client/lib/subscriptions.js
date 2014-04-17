Meteor.subscribe("rooms");
Meteor.subscribe("messages");
Meteor.subscribe("presence");
Meteor.subscribe("more-users");
Meteor.subscribe("bans");
Meteor.subscribe("voices");
console.log("subscriptions done");
Presence.state = function() {
    return {online: true, room: Session.get("currentroom")};
}
