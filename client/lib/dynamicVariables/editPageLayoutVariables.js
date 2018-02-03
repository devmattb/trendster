
// This is the template name that we render upon clicking the carousel on SiteBuilderLayout.
Template.EditPageLayout.editThis = new ReactiveVar();

/**
*               Img Edit Reactive Variables.
**/

// Img Width / Height
Template.EditPageLayout.imgWidth = new ReactiveVar();
Template.EditPageLayout.imgHeight = new ReactiveVar();

/**
*           Helpers: To keep the page dynamicly updated.
**/
Template.EditPageLayout.helpers({

  editThis: function() {
    return Template.EditPageLayout.editThis.get();
  },

  imgWidth: function() {
    return Template.EditPageLayout.imgWidth.get();
  },

  imgHeight: function() {
    return Template.EditPageLayout.imgHeight.get();
  },


});
