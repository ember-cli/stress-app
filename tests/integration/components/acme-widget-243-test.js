import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | acme widget', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    assert.expect(2);

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    await render(hbs`{{acme-widget}}`);

    assert.dom('*').hasText('');

    // Template block usage:
    await render(hbs`
      {{#acme-widget}}
        template block text
      {{/acme-widget}}
    `);

    assert.dom('*').hasText('template block text');
  });
});
