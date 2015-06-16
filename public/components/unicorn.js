var UnicornComponent = React.createClass({
    render: function () {
        return (
            <img src="images/unicorn.png"
            style={{
                position: 'absolute',
                top: this.props.state.top,
                left: this.props.state.left,
                width: '100px'
            }} />
            );
    }
});

var horsySound = new Audio("sound/horse.mp3");
