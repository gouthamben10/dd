import { createSelector } from 'reselect';

const selectPort = state => state.port;

export const selectPortButtons = createSelector(
  [selectPort],
  port => port.toggle
);