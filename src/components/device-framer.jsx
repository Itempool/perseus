/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */

/**
 * A component that displays its contents inside a device frame.
 */

var React = require("react");

var SCREEN_SIZES = {
    phone: {
        width: 375,
        height: 667,
        framedWidth: 375,
    },
    tablet: {
        width: 768,
        height: 946,
        framedWidth: 768,
    },
    desktop: {
        width: 1024,
        height: 640,
        framedWidth: 960,
    },
};

var DeviceFramer = React.createClass({
    propTypes: {
        deviceType: React.PropTypes.string.isRequired,
    },

    render: function() {
        const deviceType = this.props.deviceType;

        if (deviceType === "noframe") {
            return <div style={{ border: "1px solid black", width: 540 }}>
                <div style={{ margin: 30 }}>
                    {this.props.children}
                </div>
            </div>;
        }

        const scale = SCREEN_SIZES[deviceType].framedWidth /
            SCREEN_SIZES[deviceType].width;

        const scaled = <div style={{ zoom: scale, margin: 30 }}>
            {this.props.children}
        </div>;

        const screenStyle = {
            backgroundColor: "white",
            color: "black",
            overflow: "scroll",
            textAlign: "left",
        };

        const screen = <div
            className="screen"
            style={screenStyle}
        >
            {scaled}
        </div>;

        if (deviceType === "desktop") {
            return <div
                className="marvel-device macbook"
                style={{
                    marginLeft: 45,
                    marginRight: 45,
                    zoom: 0.8,
                }}
            >
                <div className="top-bar"></div>
                <div className="camera"></div>
                {screen}
                <div className="bottom-bar"></div>
            </div>;
        } else if (deviceType === "tablet") {
            return <div
                className="marvel-device ipad silver"
            >
                <div className="camera"></div>
                {screen}
                <div className="home"></div>
            </div>;
        } else if (deviceType === "phone") {
            return <div className="marvel-device iphone6 silver">
                <div className="top-bar"></div>
                <div className="sleep"></div>
                <div className="volume"></div>
                <div className="camera"></div>
                <div className="sensor"></div>
                <div className="speaker"></div>
                {screen}
                <div className="home"></div>
                <div className="bottom-bar"></div>
            </div>;
        }
    },
});

module.exports = DeviceFramer;
