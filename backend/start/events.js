/** @type {import('@adonisjs/framework/src/Event')} */
const Event = use('Event');

Event.on('new::user', 'User.registered');

Event.on('verified::user', 'User.verified');
