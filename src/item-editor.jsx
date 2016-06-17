/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var, react/prop-types, react/sort-comp */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

var React = require('react');
var _ = require("underscore");

var ApiOptions = require("./perseus-api.jsx").Options;
var Editor = require("./editor.jsx");
var ItemExtrasEditor = require("./item-extras-editor.jsx");
var ITEM_DATA_VERSION = require("./version.json").itemDataVersion;

var ItemEditor = React.createClass({
    propTypes: {
        apiOptions: ApiOptions.propTypes,
        gradeMessage: React.PropTypes.string,
        imageUploader: React.PropTypes.func,
        previewWidth: React.PropTypes.number.isRequired,
        wasAnswered: React.PropTypes.bool,
    },

    getDefaultProps: function() {
        return {
            onChange: () => {},
            question: {},
            answerArea: {},
        };
    },

    // Notify the parent that the question or answer area has been updated.
    updateProps: function(newProps, cb, silent) {
        var props = _(this.props).pick("question", "answerArea");

        this.props.onChange(_(props).extend(newProps), cb, silent);
    },

    render: function() {
        var previewWidth = this.props.previewWidth;

        return <div className="perseus-editor-table">
            <div className="perseus-editor-row perseus-question-container">
                <div className="perseus-editor-left-cell">
                    <div className="pod-title">Question</div>
                    <Editor
                        ref="questionEditor"
                        placeholder="Type your question here..."
                        className="perseus-question-editor"
                        imageUploader={this.props.imageUploader}
                        onChange={this.handleEditorChange}
                        enabledFeatures={this.props.enabledFeatures}
                        apiOptions={this.props.apiOptions}
                        showWordCount={true}
                        {...this.props.question}
                    />
                </div>

                <div
                    className="perseus-editor-right-cell"
                    style={{width: previewWidth, maxWidth: previewWidth}}
                >
                    <div id="problemarea">
                        <div id="workarea" className="workarea" />
                        <div
                            id="hintsarea"
                            className="hintsarea"
                            style={{display: "none"}}
                        />
                    </div>
                </div>
            </div>

            <div className="perseus-editor-row perseus-answer-container">
                <div className="perseus-editor-left-cell">
                    <div className="pod-title">Question extras</div>
                    <ItemExtrasEditor
                        ref="itemExtrasEditor"
                        onChange={this.handleItemExtrasChange}
                        {...this.props.answerArea}
                    />
                </div>

                <div
                    className="perseus-editor-right-cell"
                    style={{width: previewWidth, maxWidth: previewWidth}}
                >
                    <div id="answer_area" />
                </div>
            </div>
        </div>;
    },

    handleEditorChange: function(newProps, cb, silent) {
        var question = _.extend({}, this.props.question, newProps);
        this.updateProps({ question }, cb, silent);
    },

    handleItemExtrasChange: function(newProps, cb, silent) {
        var answerArea = _.extend({}, this.props.answerArea, newProps);
        this.updateProps({ answerArea }, cb, silent);
    },

    getSaveWarnings: function() {
        return this.refs.questionEditor.getSaveWarnings();
    },

    serialize: function(options) {
        return {
            question: this.refs.questionEditor.serialize(options),
            answerArea: this.refs.itemExtrasEditor.serialize(options),
            itemDataVersion: ITEM_DATA_VERSION,
        };
    },

    focus: function() {
        this.questionEditor.focus();
    },
});

module.exports = ItemEditor;
