Template.SiteBuilderLayout.onCreated(function() {

    // Account Variables:
    var acc = Accounts.findOne({_id: Session.get("id")});
    Template.SiteBuilderLayout.displayName = new ReactiveVar(acc.displayName);
    Template.SiteBuilderLayout.siteBuilderStep = new ReactiveVar(acc.siteBuilderStep);
    Template.SiteBuilderLayout.pageOne = new ReactiveVar(acc.pageOne);
    Template.SiteBuilderLayout.pageTwo = new ReactiveVar(acc.pageTwo);
    Template.SiteBuilderLayout.pageThree = new ReactiveVar(acc.pageThree);
    Template.SiteBuilderLayout.pageFour = new ReactiveVar(acc.pageFour);
    Template.SiteBuilderLayout.stepInfo = new ReactiveVar("Choose the <b>layout</b> of your site:");
    Template.SiteBuilderLayout.renderTemplateName = new ReactiveVar();
    Template.SiteBuilderLayout.siteDesc = new ReactiveVar(acc.siteDesc);

    // Thumbnail addresses connected to selected template pages.
    if (acc.pageOneThumbnailAddr && acc.pageTwoThumbnailAddr && acc.pageThreeThumbnailAddr ) {

      Template.SiteBuilderLayout.pageOneThumbnailAddr = new ReactiveVar(acc.pageOneThumbnailAddr);
      Template.SiteBuilderLayout.pageTwoThumbnailAddr = new ReactiveVar(acc.pageTwoThumbnailAddr);
      Template.SiteBuilderLayout.pageThreeThumbnailAddr = new ReactiveVar(acc.pageThreeThumbnailAddr);

    } else {
      Template.SiteBuilderLayout.pageOneThumbnailAddr = new ReactiveVar();
      Template.SiteBuilderLayout.pageTwoThumbnailAddr = new ReactiveVar();
      Template.SiteBuilderLayout.pageThreeThumbnailAddr = new ReactiveVar();
    }

    // Influencer Template Arrays
    Template.SiteBuilderLayout.influencerHomeTemplate = InfluencerTemplate.find({"templateTypeCategory": "home"});
    Template.SiteBuilderLayout.influencerFlowTemplate = InfluencerTemplate.find({"templateTypeCategory": "flow"});
    Template.SiteBuilderLayout.influencerShopTemplate = InfluencerTemplate.find({"templateTypeCategory": "shop"});

});

Template.SiteBuilderLayout.helpers({

  displayName: function() {
    return Template.SiteBuilderLayout.displayName.get();
  },

  siteBuilderStep: function() {
    return Template.SiteBuilderLayout.siteBuilderStep.get();
  },

  pageOne: function() {
    return Template.SiteBuilderLayout.pageOne.get();
  },

  pageTwo: function() {
    return Template.SiteBuilderLayout.pageTwo.get();
  },

  pageThree: function() {
    return Template.SiteBuilderLayout.pageThree.get();
  },

  pageFour: function() {
    return Template.SiteBuilderLayout.pageFour.get();
  },

  stepInfo: function() {
    return Template.SiteBuilderLayout.stepInfo.get();
  },

  renderTemplateName: function() {
    return Template.SiteBuilderLayout.renderTemplateName.get();
  },

  currentPageNo: function() {
    return Template.SiteBuilderLayout.currentPageNo.get();
  },

  siteDesc: function() {
      return Template.SiteBuilderLayout.siteDesc.get();
  },

  influencerHomeTemplate: function() {
    return InfluencerTemplate.find({"templateTypeCategory": "home"});
  },

  influencerFlowTemplate: function() {
    return InfluencerTemplate.find({"templateTypeCategory": "flow"});
  },

  influencerShopTemplate: function() {
    return InfluencerTemplate.find({"templateTypeCategory": "shop"});
  },

  pageOneThumbnailAddr: function(){
    return Template.SiteBuilderLayout.pageOneThumbnailAddr.get();
  },

  pageTwoThumbnailAddr: function(){
    return Template.SiteBuilderLayout.pageTwoThumbnailAddr.get();
  },

  pageThreeThumbnailAddr: function(){
    return Template.SiteBuilderLayout.pageThreeThumbnailAddr.get();
  },

});
