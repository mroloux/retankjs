var TankComponent = React.createClass({
    render: function () {
        return (
            <div className="tank"
                 style={{
                    top: this.props.state.top,
                    left: this.props.state.left,
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