import Model, { attr } from '@ember-data/model';

export default Model.extend({
  email: attr('string'),
  password: attr('string'),
  otpCode: attr('string')
});
