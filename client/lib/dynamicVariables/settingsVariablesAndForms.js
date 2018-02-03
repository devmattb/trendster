Template.SettingsLayout.onCreated(function() {
  var acc = Accounts.findOne({_id: Session.get("id")});

  // Account Info
  Template.SettingsLayout.displayName = new ReactiveVar(acc.displayName);
  Template.SettingsLayout.pass = new ReactiveVar(acc.pass);
  Template.SettingsLayout.hasAlphaKey = new ReactiveVar(acc.hasAlphaKey);
  Template.SettingsLayout.alphaKey = new ReactiveVar(acc.alphaKey);
  Template.SettingsLayout.media = new ReactiveVar(acc.media);
  Template.SettingsLayout.type = new ReactiveVar(acc.type);

 //Site Info
 Template.SettingsLayout.siteTags = new ReactiveVar(acc.siteTags);  // Site tags in string form only
 Template.SettingsLayout.siteDesc = new ReactiveVar(acc.siteDesc);
})

Template.SettingsLayout.helpers({

  displayName: function() {
    return Template.SettingsLayout.displayName.get();
  },

  pass: function() {
    return Template.SettingsLayout.pass.get();
  },

  hasAlphaKey: function() {
    return Template.SettingsLayout.hasAlphaKey.get();
  },

  alphaKey: function() {
    return Template.SettingsLayout.alphaKey.get();
  },

  media: function() {
    return Template.SettingsLayout.media.get();
  },

  type: function() {
    return Template.SettingsLayout.type.get();
  },

  siteDesc: function() {
    return Template.SettingsLayout.siteDesc.get();
  },

  siteTags: function() {
    return Template.SettingsLayout.siteTags.get();
  },

});

/**
*   Site tags:
**/
Template.settingsModals.onCreated(function() {
  //Site tags in chip form...
 Template.SettingsLayout.siteChipsReadable = new ReactiveVar();
})

Template.settingsModals.helpers({

  siteChipsReadable: function(){

    var str = Template.SettingsLayout.siteTags.get();
    var arr = str.split(",");
    var out = '<div id="allChips">';

    for ( var i = 0; i < arr.length; i++ ) {
      out += '<div class="chip">' + arr[i] + '<i class="close material-icons">close</i> </div>';
    }

    return out + '</div>';

  },

});

Template.body.events({

  /**
  *       SETTINGS FORMS:
  **/

  //  EMAIL
  "submit #settingsEmail":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const target = event.target;
    const email =  target.email.value;

    if ( !email ) {
      Materialize.toast('Please fill the field above the button!', 4000, "red");
      return;
    }

    const doc = { $set: { user: email, }, };

    if ( Accounts.findOne({user: email}) ) { //Email already in use.

      Materialize.toast('A user with that Email already exists...', 4000, "red");
      return;

    } else { //Email not in use.. Lets update it in our DB.

      try {
        Meteor.call( 'accountUpsert', Session.get("id"), doc );
        Materialize.toast('Email changed successfully.', 4000, "green");
      } catch(e) {
        console.log("ERROR in SETTINGS: " + e);
        Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
      }

    }

  },

  //  PASSWORD
  "submit #settingsPassword":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const target = event.target;
    const oldPass = CryptoJS.SHA256(target.oldPass.value).toString();
    const newPass = CryptoJS.SHA256(target.newPass.value).toString();
    const newPass2 = CryptoJS.SHA256(target.newPass2.value).toString();

    if ( !oldPass || !newPass || !newPass2 ) {
      Materialize.toast('Please fill the fields above the button!', 4000, "red");
      return;
    } else if ( newPass != newPass2 ) {
      Materialize.toast("Your passwords didn't match.", 4000, "red");
      return;
    } else if ( oldPass != Accounts.findOne({_id: Session.get("id")}).pass ) {
      Materialize.toast("The old password did not match your current password.", 4000, "red");
      return;
    } else { // All good

      try {
          const doc = { $set: { pass: newPass, }, };
          Meteor.call( 'accountUpsert', Session.get("id"), doc );

          //Change reactive var:
          Template.SettingsLayout.pass.set(newPass);

          Materialize.toast('Password successfully changed.', 4000, "green");

      } catch(e) {
          console.log("ERROR in SETTINGS: " + e);
          Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");

      }

    }

  },

  //  MEDIA
  "submit #settingsMedia":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const media = $('#media').val().toString();
    const doc = { $set: { media: media,  }, };

    if ( !media ) { Materialize.toast('Please fill the field above the button!', 4000, "red"); return; }

    try {

      Meteor.call( 'accountUpsert', Session.get("id"), doc );
      Template.SettingsLayout.media.set(media);

      Materialize.toast('Social Media Pages successfully changed.', 4000, "green");
      return;
    } catch(e) {
        console.log("ERROR in SETTINGS: " + e);
        Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
    }

  },

  //  TYPE/CATEGORY
  "submit #settingsCategory":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const target = event.target;
    const type = target.type.value;
    const doc = { $set: { type: type, }, };

    if ( !type ) { Materialize.toast('Please fill the field above the button!', 4000, "red"); return; }

    try {

      // Change the type of the website
      Meteor.call( 'accountUpsert', Session.get("id"), doc );
      Template.SettingsLayout.type.set(type);

      Materialize.toast('Site Category successfully changed', 4000, "green");
      return;
    } catch(e) {
        console.log("ERROR in SETTINGS: " + e);
        Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
    }

  },

  //  ALPHA KEY
  "submit #settingsAlphaKey":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const target = event.target;
    const alphaKey =  target.alphaKey.value;
    const doc = { $set: { alphaKey: alphaKey, }, };

    if ( !alphaKey ) { Materialize.toast('Please fill in the field above the button!', 4000, "red"); return; }

    if ( !(AlphaKeys.findOne({alphaKey: alphaKey})) ) { // If the alpha key is incorrect...

      Materialize.toast('Alpha Key invalid. Try again.', 4000, "red");
      return; //Cancel exec.
    }

    try {

      // Add this alpha key to the signed in account.
      Meteor.call( 'accountUpsert', Session.get("id"), doc );

      Template.SettingsLayout.alphaKey.set(alphaKey);
      Template.SettingsLayout.hasAlphaKey.set(true);

      // Destroy the alpha key.
      const aKey = AlphaKeys.findOne({alphaKey: alphaKey});
      AlphaKeys.remove({_id: aKey._id});

      Materialize.toast('Alpha key added successfully.', 4000, "green");

    } catch(e) {
        console.log("ERROR in SETTINGS: " + e);
        Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
    }

  },

  "submit #addTags":function(event) {

    event.preventDefault();
    const data = $('.chips-autocomplete').material_chip('data');
    const acc = Accounts.findOne({_id : Session.get("id")});
    var tagString = [];
    tagString.push(acc.siteTags);
    // For each added tag, push it in to a tag string.
    for ( var i = 0; i < data.length; i++ ) {
      tagString.push(data[i].tag);
    }

    tagString = tagString.toString();

    const doc = { $set: { siteTags: tagString, }, };

    try {
      Meteor.call( 'accountUpsert', Session.get("id"), doc );
      Template.SettingsLayout.siteTags.set(tagString);
      Materialize.toast('Tags successfully added.', 4000, "green");
    } catch(e) {
      console.log("ERROR in SETTINGS: " + e);
      Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
      return;
    }

  },

  "submit #changeDesc":function(event) {

    event.preventDefault();
    const desc = $("#desc").val().toString();
    const doc = { $set: { siteDesc: desc, }, };

    try {
      Meteor.call( 'accountUpsert', Session.get("id"), doc );
      Template.SettingsLayout.siteDesc.set(desc);
      Materialize.toast('Site description successfully changed.', 4000, "green");
      //Clear form

    } catch(e) {
      console.log("ERROR in SETTINGS: " + e);
      Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
      return;
    }

  },
  /**
  *  Remove tags from site functions    TODO BROKEN
  **/
  /*$('.chips').on('chip.add', function(e, chip){
    var data= $('.chips-autocomplete').material_chip('data');
    for ( var i = 0; i < data.length; i++ ) {
      alert(data[i].tag);
    }
  });

});
$('.chips').on('chip.delete', function(e, chip){
  alert("");
});
  "click .chip .close" : function() {
    alert("");
      var data= $(this).parent().material_chip('data');
      alert(data.tag);
  },*/

});
