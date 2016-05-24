import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
    host: config.APP.AgolRestEndpoint,
	token: "",
	buildURL: function(id) {
		var session = this.get('session');
		this.token = this.session.content.token;
		return this.host + "items/" + id + "?f=json&token=" + this.session.content.token;
	},

	model: function(params) {
		var url = this.buildURL(params.item_id);
		var token = this.token;
		var host = this.host;
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.getJSON(url).then(function(item) {
				// access
				if (item.access==="private") {
					item.isPrivate = true;
				}
				else {
					item.isPrivate = false;
				}
				// Rating
				item.rating = Math.round(item.avgRating);
				// thumbnail
				if (item.thumbnail) {
					item.thumbnailUrl = host + "items/" + item.id + "/info/" + item.thumbnail + "?token=" + token;
				}
				else {
					item.thumbnailUrl = "/assets/img/blankthumbnail.png";
				}
				Ember.run(null, resolve, item);
			}, function(jqXHR) {
				jqXHR.then = null; // tame jQuery's ill mannered promises
				Ember.run(null, reject, jqXHR);
			});
		});
	}
});
