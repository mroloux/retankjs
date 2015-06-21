var BulletComponent = React.createClass({
    render: function () {
        return (
            <img src="images/bullet.png"
            style={{
                position: 'absolute',
                left: this.props.state.centerPnt.x - 5,
                top: this.props.state.centerPnt.y - 20,
                transform: 'rotate(' + this.props.state.direction + 'deg)'
            }} />
            );
    }
});

var bulletSound = new Audio("sound/44.wav");