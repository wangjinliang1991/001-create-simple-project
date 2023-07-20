'use strict'

const moment = require('moment')

exports.relativeTime = time => {
  return moment(time).fromNow();
}