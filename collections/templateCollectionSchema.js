import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// All "template style" Collections.
InfluencerTemplate = new Mongo.Collection('InfluencerTemplate');
AthleteTemplate = new Mongo.Collection('AthleteTemplate');
CinematographerTemplate = new Mongo.Collection('CinematographerTemplate');


TemplateCollectionSchema = new SimpleSchema({

  templateTitle: {

    type: String,
    label: "templateTitle",

  },

  templateRenderName: {

    type: String,
    label: "templateRenderName",

  },

  templateTypeCategory: {

    type: String,
    label: "templateTypeCategory",

  },

  templateThumbnailAddress: {

  type: String,     // Here is the file address of the thumbnail for the template on display in our sitebuilder.
  label: "templateThumbnailAddress",

  },


});

InfluencerTemplate.attachSchema(TemplateCollectionSchema);
AthleteTemplate.attachSchema(TemplateCollectionSchema);
CinematographerTemplate.attachSchema(TemplateCollectionSchema);
