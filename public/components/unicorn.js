var UnicornComponent = React.createClass({
    render: function () {
        return (
            <img src="images/unicorn.png"
            style={{
                position: 'absolute',
                top: this.props.state.top,
                left: this.props.state.left,
                width: '100px',
                zIndex: -1
            }} />
            );
    }
});

var horsySound = new Audio("sound/horse.mp3");
