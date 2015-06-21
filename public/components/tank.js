var TankComponent = React.createClass({
    render: function () {
        return (
            <div className="tank"
                 style={{
                    left: this.props.state.centerPnt.x - 35,
                    top: this.props.state.centerPnt.y - 50,
                }}>
                <img src="images/tank.png"
                style={{
                    transform: 'rotate(' + this.props.state.direction + 'deg)'
                }} />
                { this.props.state.name ? <p className="tank-label">{this.props.state.name}</p> : null }
            </div>
            );
    }
});