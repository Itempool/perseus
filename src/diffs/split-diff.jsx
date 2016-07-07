/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

const _ = require("underscore");

// Split a word-wise diff generated by jsdiff into multiple lines, for the
// purpose of breaking up the diffs into lines, so that modified lines can be
// faintly highlighted

var splitDiff = function(diffEntries) {
    var lines = [];
    var currentLine = [];
    _.each(diffEntries, (entry) => {
        var values = entry.value.split("\n");
        _.each(values, (value, i) => {
            var isNewline = i > 0;
            if (isNewline) {
                lines.push(currentLine);
                currentLine = [];
            }
            var newEntry = _.extend({}, entry, { value: value });
            currentLine.push(newEntry);
        });
    });

    if (currentLine.length) {
        lines.push(currentLine);
    }
    return lines;
};


module.exports = splitDiff;
