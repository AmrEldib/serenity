import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login');
  this.authenticatedRoute('items');
  this.authenticatedRoute('item', { path: '/items/:item_id'});
  this.authenticatedRoute('groups');
  this.authenticatedRoute('group', { path: '/groups/:group_id'});
});

export default Router;
