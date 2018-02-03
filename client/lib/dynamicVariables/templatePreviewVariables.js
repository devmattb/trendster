// Used to render and save dynamic templates.
Template.templatePreview.renderTemplateName = new ReactiveVar();
Template.templatePreview.templateThumbnailAddr = new ReactiveVar();

Template.templatePreview.helpers({

  renderTemplateName: function() {
    return Template.templatePreview.renderTemplateName.get();
  },

  templateThumbnailAddr: function() {
    return Template.templatePreview.templateThumbnailAddr.get();
  },


});
