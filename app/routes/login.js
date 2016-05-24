import Ember from 'ember';

export default Ember.Route.extend({
    // If the user was attempting to go to a protected route
	// and they got redirected here, this function will send them back to the protected route
	// If not, they should go to 'items'
	goToBeforeLogin: function() {
		let controller = this.controllerFor('application');
		let previousTransition = controller.get('previousTransition');
		if (previousTransition) {
			controller.set('previousTransition', null);
			if (previousTransition.targetName === "login") {
				this.transitionTo('items');
			}
			else {
				previousTransition.retry();
			}
		} else {
			// Default back to items
			this.transitionTo('items');
		}
	},

	activate: function() {
		let route = this;
		this.get("session").fetch('agol').then(function(){
			//route.transitionTo('items');
			route.goToBeforeLogin();
		}, function(error){
			Ember.debug(error);
		});
	},

	actions: {
		signin: function(){
            /*
			let route = this,
				controller = this.controllerFor('login'),
				session = this.get('session');
			controller.set('error', null);
			session.open('agol').then(function(){
				route.goToBeforeLogin();
			}, function(error){
				console.log(error);
				controller.set('error', error.message);
			});
            */
            
            let route = this,
				controller = this.controllerFor('login');
            controller.set('error', null);
            this.get('session').open('arcgis-oauth-bearer')
            .then((authorization) => {
                Ember.debug('AUTH SUCCESS: ');
                //transition to some secured route or... so whatever is needed
                route.goToBeforeLogin();
            })
            .catch((err)=>{
                Ember.debug('AUTH ERROR: ', err);
                controller.set('error', err.message);
            });
		}
        
	}
});
