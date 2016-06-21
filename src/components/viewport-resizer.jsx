/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * A component that displays controls for choosing a viewport size.
 * Renders three buttons: "Phone", "Tablet", and "Desktop".
 */

var React = require("react");

var ButtonGroup = require("react-components/button-group.jsx");

var ViewportResizer = React.createClass({
    propTypes: {
        // A callback that is passed (width, height) as the dimensions of the
        // viewport to resize to.
        onViewportSizeChanged: React.PropTypes.func.isRequired,
    },

    getInitialState: function() {
        return {value: "noframe"};
    },

    handleChange: function(value) {
        this.setState({value});

        this.props.onViewportSizeChanged(value);
    },

    render: function() {
        var phoneButtonContents = <span>
            <i className="icon-mobile-phone" />{" "}Phone
        </span>;
        var tabletButtonContents = <span>
            <i className="icon-tablet" />{" "}Tablet
        </span>;
        var desktopButtonContents = <span>
            <i className="icon-desktop" />{" "}Desktop
        </span>;
        var noframeButtonContents = <span>
            No Frame
        </span>;

        // TODO(david): Allow input of custom viewport sizes.
        return <span className="viewport-resizer">
            Viewport:{" "}
            <ButtonGroup value={this.state.value}
                allowEmpty={false}
                buttons={[
                    {value: 'phone', content: phoneButtonContents},
                    {value: 'tablet', content: tabletButtonContents},
                    {value: 'desktop', content: desktopButtonContents},
                    {value: 'noframe', content: noframeButtonContents},
                ]}
                onChange={this.handleChange}
            />
        </span>;
    },
});

module.exports = ViewportResizer;
