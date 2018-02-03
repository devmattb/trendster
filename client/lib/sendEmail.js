const sendTo = "matt_bergstrom@icloud.com";
const subject = "Someone has contacted the Trendster.Site Team";

Template.body.events({

  /**
  *   Sends an email when using the contact us modal.
  **/
  //TODO: Broken atm. Email not sending...
  "submit #contactUsForm":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const target = event.target;
    const fromEmail =  target.email.value;
    const emailMsg = target.emailMsg.value;

    if ( Meteor.isClient ) {
      Meteor.call("sendEmail", sendTo, fromEmail, subject, emailMsg);
      alert("Email sent");
    }

    //Clear form
    target.email.value = "";
    target.emailMsg.value = "";

  },

});
