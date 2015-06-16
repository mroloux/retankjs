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

var Tank = function () {
    this.id = Date.now();
    this.isTurning = false;
    this.turningDirection = '';
    this.turningSpeed = 5;
    this.drivingSpeed = 2;
    this.left = 0;
    this.top = 0;
    this.direction = 0;
    this.width = 70;
    this.height = 100;
};

Tank.prototype.boundingBox = function () {
    return new BoundingBox(this.left, this.top, this.width, this.height);
};