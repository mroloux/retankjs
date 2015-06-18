var BulletComponent = React.createClass({
    render: function () {
        return (
            <img src="images/bullet.png"
            style={{
                position: 'absolute',
                top: this.props.state.top,
                left: this.props.state.left,
                transform: 'rotate(' + this.props.state.direction + 'deg)'
            }} />
            );
    }
});

var bulletSound = new Audio("sound/44.wav");