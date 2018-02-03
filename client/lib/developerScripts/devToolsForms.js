function checkCollection(c, doc) {

    if (c == "Influencer") {
      InfluencerTemplate.insert(doc);
    } else if ( c == "Athlete") {
      AthleteTemplate.insert(doc);
    } else if (c == "Cinematographer") {
      CinematographerTemplate.insert(doc);
    }

}


function checkTemplateType(collection, templateType, templateName, templateThumbnailAddress,  templateTitle ) {

    var doc;
    var id;

    if ( templateType == "home" ) {

      doc = { templateRenderName: templateName, templateTypeCategory: templateType, templateThumbnailAddress: templateThumbnailAddress, templateTitle: templateTitle, };
      checkCollection(collection, doc);
      //TODO: Schema for this is removed because of insert error here.. Future minor bugfix.

    } else if ( templateType == "flow" ) {

      doc = { templateRenderName: templateName, templateTypeCategory: templateType, templateThumbnailAddress: templateThumbnailAddress, templateTitle: templateTitle, };
      checkCollection(collection, doc);

    } else if ( templateType == "shop" ) {

      doc = { templateRenderName: templateName, templateTypeCategory: templateType, templateThumbnailAddress: templateThumbnailAddress, templateTitle: templateTitle, };
      checkCollection(collection, doc);

    }  else if ( templateType == "other" ) {
      Materialize.toast('ERROR! Template Type Category not handled yet. Please check devToolsForms.js.', 6000, "red");
      return;
    }

}

Template.DevToolsLayout.events({

  /**
  *   Adds a Template to our templateInfo collection!
  **/
  "submit #addTemplate":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    const target = event.target;
    const templateName = target.templateName.value;
    const templateTitle = target.templateTitle.value;
    const templateStyleCategory = $("#templateStyleCategory").val();
    const templateTypeCategory = $("#templateTypeCategory").val();
    const templateThumbnailAddress = target.templateThumbnailAddress.value;

    try {
      if ( templateStyleCategory == "Influencer" ) {

          checkTemplateType("Influencer", templateTypeCategory, templateName, templateThumbnailAddress, templateTitle);

      } else if ( templateStyleCategory == "Athlete" ) {

          checkTemplateType("Athlete", templateTypeCategory, templateName, templateThumbnailAddress, templateTitle);

      } else if ( templateStyleCategory == "Cinematographer" ) {

          checkTemplateType("Cinematographer", templateTypeCategory, templateName, templateThumbnailAddress, templateTitle);

      } else {

        Materialize.toast('ERROR! Unknown Template Style Category... Please check devToolsForms.js.', 6000, "red");
        return;
      }

      // All went well.
      Materialize.toast("Added " + templateName + " to our one of our template-info collections.", 6000, "green");
    } catch(e) {
      console.log("ERROR in inserting TEMPLATE to Template collection: " + e);
      Materialize.toast('ERROR! Check Console.', 6000, "red");
    }


  },

  "submit #addAlphaKey":function(event) {

    //Prevent default redirect.
    event.preventDefault();

    const target = event.target;
    const numGenAKeys = target.numGenAKeys.value;
    var allGenAKeys = [];//CryptoJS.SHA256(target.pass.value).toString();
    var num;

    // Create Alpha Keys
    for ( var i = 0; i < numGenAKeys; i++ ) {

      num = Math.random().toString();
      allGenAKeys.push(CryptoJS.SHA256(num).toString());

    }

    for ( var j = 0; j < allGenAKeys.length; j++ ) {

     try {
       AlphaKeys.insert({alphaKey: allGenAKeys[j],});
       if ( j == allGenAKeys.length-1) { Materialize.toast("DONE! " + numGenAKeys + " Alpha Keys Generated.", 6000, "green"); }
     } catch(e) {
       console.log("ERROR in inserting ALPHA KEY to AlphaKeys collection: " + e);
       Materialize.toast('ERROR! Check Console.', 6000, "red");
     }

    }

  },

});
