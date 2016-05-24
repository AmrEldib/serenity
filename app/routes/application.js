import Ember from 'ember';

export default Ember.Route.extend({
    
	beforeModel: function(transition) {
		// Save the previous route in a property
		// This is used by the login route to send users back
		// to where they came from before authentication
		var controller = this.controllerFor('application');
		controller.set('previousTransition', transition);
	},

	actions: {
		accessDenied: function() {
			this.transitionTo('login');
		},
		invalidateSession: function() {
			this.get('session').close('arcgis-oauth-bearer');
			this.transitionTo('login');
		}
	}
	
});
