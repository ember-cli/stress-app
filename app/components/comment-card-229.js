import { computed } from '@ember/object';
// app/components/comment-card-229.js
//Author: @chancancode. Taken from https://github.com/chancancode/hn-reader/blob/master/app/components/comment-card.js
import $ from 'jquery';

import { scheduleOnce } from '@ember/runloop';
import Component from '@ember/component';

const CommentCard = Component.extend({
  classNames: ['comment-card'],
  classNameBindings: ['isExpanded:expanded', 'isHighlighted:highlighted'],

  actions: {
    toggleReplies: function() {
      var expanded = this.toggleProperty('isExpanded');

      if (expanded) {
        this.expandAll();
      }
    }
  },

  bodyStyle: computed('comment.quality', function() {
    var quality = this.get('comment.quality');

    if (typeof quality === 'undefined') {
      quality = 1;
    }

    return `opacity: ${quality}`;
  }),

  level: computed('parentView', function() {
    var level = this.get('comment.isInternal') ? -1 : 0;

    var parent = this.parentView;

    while (parent instanceof CommentCard) {
      level += 1;
      parent = parent.get('parentView');
    }

    return level;
  }),

  isExpanded: computed('level', 'preferences.autoFold', 'preferences.autoFoldDepth', function() {
    if ( this.get('preferences.autoFold') ) {
      return this.level < this.get('preferences.autoFoldDepth');
    } else {
      return true;
    }
  }),

  isHighlighted: computed('highlight', 'comment', function() {
    return this.highlight === this.get('comment.id');
  }),

  _onHighlighted: observer('isHighlighted', function() {
    if (this.isHighlighted) {
      var parent = this.parentView;

      while (parent instanceof CommentCard) {
        parent.set('isExpanded', true);
        parent = parent.get('parentView');
      }

      scheduleOnce('afterRender', this, () => {
        var $body = this.$('> .body');
        var scrollBy = $body.position().top - $(window).height() / 4;
        var $container = $body.closest('.app-panel');

        $container.animate({
          scrollTop: $container.scrollTop() + scrollBy
        }, 500);
      });
    }
  }).on('init'),

  expandAll: function() {
    this.set('isExpanded', true);
    this.childViews.forEach( (child) => (child instanceof CommentCard) && child.expandAll() );
  },

});

export default CommentCard;
