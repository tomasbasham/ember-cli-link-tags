import Ember from 'ember';

const documentHead = (
  typeof window !== 'undefined' &&
  window.document.head &&
  Ember.$(window.document.head)
);

export default documentHead;
