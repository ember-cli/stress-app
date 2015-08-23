// app/models/session-038.js
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  password: DS.attr('string'),
  otpCode: DS.attr('string')
});
