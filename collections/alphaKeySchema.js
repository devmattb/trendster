import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

AlphaKeys = new Mongo.Collection('AlphaKeys');

AlphaKeySchema = new SimpleSchema({

  alphaKey: {
    type: String,
    label:"alphaKey",
    optional: false
  },

  createdAt: {
      type: Date,
      label: "CreatedAt",
      autoValue: function() {
          return new Date();
      }
  }

});

AlphaKeys.attachSchema(AlphaKeySchema);
