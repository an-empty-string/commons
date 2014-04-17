Room = new Meteor.Collection("rooms");
Messages = new Meteor.Collection("messages");
console.log("collection creation done");
function getName(user) {
    var u = Meteor.users.findOne(user);
    return u.profile?u.profile.name:(u.username?u.username:"unknown-user")
}
getUser = getName;
