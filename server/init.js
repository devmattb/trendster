import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { ReactiveVar }   from 'meteor/reactive-var';

if ( Meteor.isServer ) {

  Meteor.methods({

    accountUpsert: function( id, doc ) {
      try {
       Accounts.upsert( id, doc );
     } catch(e) {
       console.log("ERROR in UPSERT: " + e);
       Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
     }
   },

   dbUpsert: function( id, doc, db) {
     try {
      db.upsert( id, doc );
    } catch(e) {
      console.log("ERROR in UPSERT: " + e);
      Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
    }
  }

  });

  /**
  *    Publish all collections that the user are in need of:
  **/
  Meteor.publish("accounts", function () {
   return Accounts.find();
  });

  Meteor.startup( function() {
    /*Send Email Through Gmail SMTP*/
    process.env.MAIL_URL="smtps://mattegamer2%40gmail.com:" + encodeURIComponent("c0lin4664") + "@smtp.gmail.com:465";
  });

  /**
  *   All Meteor Methods for this script.
  **/
  Meteor.methods({

    /**
    *   Sends an email to our mail...
    **/
    sendEmail(to, from, subject, text) {

      if ( Meteor.isServer ) {
      // Make sure that all arguments are strings.
      //check([to, from, subject, text], [String]);
      // Let other method calls from the same client start running, without
      // waiting for the email sending to complete.
      this.unblock();

      Email.send({
        to: "matt_bergstrom@icloud.com",
        from: "no-reply@trendster.site",
        subject: "Meteor Can Send Emails via Gmail",
        text: "Its pretty easy to send emails via gmail."
      });

      }

    },

  });

}
