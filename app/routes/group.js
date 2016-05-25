import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
    host: config.APP.AgolRestEndpoint,
	token: "",
	buildURL: function(id) {
		var session = this.get('session');
		this.token = this.session.content.token;
		return this.host + "sharing/rest/community/groups/" + id + "?f=json&token=" + this.session.content.token;
	},

	model: function(params) {
		var url = this.buildURL(params.group_id);
		var token = this.token;
		var host = this.host;
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.getJSON(url).then(function(group) {
				// access
				if (group.access==="private") {
					group.isPrivate = true;
				}
				else {
					group.isPrivate = false;
				}
				
				Ember.run(null, resolve, group);
			}, function(jqXHR) {
				jqXHR.then = null; // tame jQuery's ill mannered promises
				Ember.run(null, reject, jqXHR);
			});
		});
	}
});
