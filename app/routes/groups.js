import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
    host: config.APP.AgolRestEndpoint,
	token: "",
	buildURL: function() {
		let session = this.get('session');
        this.token = this.session.content.token;
		return this.host + "sharing/rest/community/self/?f=json&token=" + this.session.content.token;
	},

	model: function() {
		let url = this.buildURL();
		let token = this.token;
		let host = this.host;
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.$.getJSON(url).then(function(data) {
                data.groups.forEach(function(group){
					// access
					if (group.access==="private") {
						group.isPrivate = true;
					}
					else {
						group.isPrivate = false;
					}
                    /*
					// thumbnail
					if (item.thumbnail) {
						item.thumbnailUrl = host + "items/" + item.id + "/info/" + item.thumbnail + "?token=" + token;
					}
					else {
						item.thumbnailUrl = "assets/img/blankthumbnail.png";
					}
                    */
				});
				Ember.run(null, resolve, data);
			}, function(jqXHR) {
				jqXHR.then = null; // tame jQuery's ill mannered promises
				Ember.run(null, reject, jqXHR);
			});
		});
	}
});
