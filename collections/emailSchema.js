import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

EmailList = new Mongo.Collection('EmailList');

EmailListSchema = new SimpleSchema({

  email: {
    type: String,
    label:"email",
    optional: false
  }

});

EmailList.attachSchema(EmailListSchema);
