Template.LoginLayout.events({

  /**
  *   Creates an account and puts details in to the Accounts collection.
  **/
  "submit #createAccountForm":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    //Get values from form:
    const target = event.target;
    const firstName = target.firstName.value;
    const displayName = target.displayName.value;
    const media = $('#media').val().toString();
    const type = target.type.value;
    const user =  target.email.value;
    const pass = CryptoJS.SHA256(target.pass.value).toString();
    const pass2 = CryptoJS.SHA256(target.pass2.value).toString();
    const alphaKey = target.alphaKey.value;
    var hasAlphaKey = false; // Unless we notice invalid alphaKey.
    const agreedEmailList =  $("#agreedEmailList").prop("checked"); // Returns 1 or 0 (true or false)
    const agreedTermsOfUse =  $("#agreedTermsOfUse").prop("checked");

    if ( !agreedTermsOfUse ) { // If they didnt agree with terms of use...

      Materialize.toast('Please agree with our "Terms of Use!"', 4000, "red");

    } else if ( firstName && media && type && user && pass ) {  // Successful registration regardless of Alpha Key.

      if ( agreedEmailList ) { // If they agreed to join our email list:

        if (!(EmailList.findOne({email: user}))) {
          try {
            EmailList.insert({email: user});
          } catch(e) {
            console.log("ERROR in EMAILLIST SIGNUP: " + e);
          }
        }

      }

      if ( alphaKey ) { hasAlphaKey = true; }

      if ( hasAlphaKey && !(AlphaKeys.findOne({alphaKey: alphaKey})) ) { // If the alpha key is incorrect...

        Materialize.toast('Alpha Key invalid. Try again.', 4000, "red");
        return; //Cancel exec.

      } else if (  pass != pass2 ) {

        Materialize.toast("Your Passwords didn't match!", 4000, "red");
        return; // Cancel exec.

      } else if ( Accounts.findOne({user: user}) ) { // If the user already exists.

        Materialize.toast('A user with that Email already exists...', 4000, "red");
        return; // Cancel exec.

      } else if( Accounts.findOne({displayName: displayName}) ) {

        Materialize.toast('A user with that Display Name already exists.', 4000, "red");
        return; // Cancel exec.

      } else { // The user does not exist. Put the user in our DB/Accounts collection.

        if ( hasAlphaKey ) { // Remove this unique alpha key (One time use only!)
          const aKey = AlphaKeys.findOne({alphaKey: alphaKey});
          try {
          AlphaKeys.remove({_id: aKey._id});
          } catch(e) {
            console.log("ERROR in LOGIN/SIGNUP ALPHAKEY REMOVAL: " + e);
          }
        }

        try {

          Accounts.insert({firstName: firstName, user: user, pass: pass, displayName: displayName, media: media, type: type, alphaKey: alphaKey, hasAlphaKey: hasAlphaKey, agreedEmailList: agreedEmailList, agreedTermsOfUse: agreedTermsOfUse, siteTags: type, siteBuilderStep: 1,});
          console.log("An account with the mail: " + user + " was successfully created.");

        } catch(e) {

          console.log("ERROR in LOGIN/SIGNUP: " + e);
          Materialize.toast('Something went wrong. Developers have been notified.', 4000, "red");
          return;
        }

      }

      // Send an extra notification if user has no alpha key...
      if ( !hasAlphaKey ) {
        Materialize.toast('Please note that we will send you a mail with your Alpha Key when we are ready.', 12000);
      }
      // Everything went smoothly...
      Materialize.toast('Account successfully registered.', 4000, "green");

    } else {  // They forgot to fill in mandatory details.

      Materialize.toast('You have not filled in some mandatory details...', 4000, "red");

    }

  },

  /**
  *   Logs you in to the Trendster.Site Service.
  **/
  "submit #loginForm":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    const target = event.target;
    const user = target.email.value;
    const pass = CryptoJS.SHA256(target.pass.value).toString();

    if ( Accounts.findOne({user: user, pass: pass}) ) { // If we find a user with this username and password.

        const acc = Accounts.findOne({user: user, pass: pass});

        // Set account info in a session variable.
        Session.set({
          id: acc._id,
        });

        FlowRouter.go("dashboard");

    } else {

      Materialize.toast('Wrong username or password.', 4000, "red");

    }

  },

});
