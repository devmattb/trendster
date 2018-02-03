import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

Accounts = new Mongo.Collection('Accounts');

AccountsSchema = new SimpleSchema({

  firstName: {
    type: String,
    label:"firstName",
    optional: true
  },

  user: {
    type: String,
    label:"user",
    optional: true
  },

  pass: {
    type: String,
    label:"pass",
    optional: true
  },

  displayName: {
    type: String,
    label:"displayName",
    optional: true
  },

  media: {
    type: String,
    label:"media",
    optional: true
  },

  type: {
    type: String,
    label:"type",
    optional: true
  },

  alphaKey: {
    type: String,
    label:"alphaKey",
    optional: true
  },

  hasAlphaKey: {
    type: Boolean,
    label:"hasAlphaKey",
    optional: true,
  },

  agreedEmailList: {
    type: Boolean,
    label:"agreedEmailList",
    optional: true
  },

  agreedTermsOfUse: {
    type: Boolean,
    label:"agreedTermsOfUse",
    optional: true
  },

  siteDesc: {
    type: String,
    label:"siteDesc",
    optional: true,
    defaultValue: "Small description of your Site / Profile.",

  },

  siteTags: {
    type: String,
    label:"siteTags",
    optional: true
  },

  siteBuilderStep: {
    type: SimpleSchema.Integer,
    label:"siteBuilderStep",
    optional: true,
    min: 1,
    max: 5,
  },

  pageOne: {
    type: String,
    label:"pageOne",
    optional: true
  },

  pageTwo: {
    type: String,
    label:"pageTwo",
    optional: true
  },

  pageThree: {
    type: String,
    label:"pageThree",
    optional: true
  },

  pageFour: {
    type: String,
    label:"pageFour",
    optional: true
  },

  pageOneThumbnailAddr: {
    type: String,
    label:"pageOneThumbnailAddr",
    optional: true
  },

  pageTwoThumbnailAddr: {
    type: String,
    label:"pageTwoThumbnailAddr",
    optional: true
  },

  pageThreeThumbnailAddr: {
    type: String,
    label:"pageThreeThumbnailAddr",
    optional: true
  },

  siteCode: {
    type: String,
    label:"siteCode",
    optional: true
  },

  lastActive: {
      type: Date,
      label: "lastActive",
      autoValue: function() {
          return new Date();
      }
  }

});

Accounts.attachSchema(AccountsSchema);
