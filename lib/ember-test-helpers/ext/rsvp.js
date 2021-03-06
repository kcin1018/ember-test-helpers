import Ember from 'ember';

const { RSVP, run } = Ember;

let originalAsync;
export function _setupPromiseListeners() {
  originalAsync = RSVP.configure('async');

  RSVP.configure('async', function(callback, promise) {
    run.backburner.schedule('actions', () => {
      callback(promise);
    });
  });
}

export function _teardownPromiseListeners() {
  RSVP.configure('async', originalAsync);
}
