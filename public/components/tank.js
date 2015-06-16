var TankComponent = React.createClass({
    render: function () {
        return (
            <img src="images/tank.png"
            style={{
                position: 'relative',
                top: this.props.state.top,
                left: this.props.state.left,
                transform: 'rotate(' + this.props.state.direction + 'deg)'
            }} />
            );
    }
});