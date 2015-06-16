var Bullet = React.createClass({
    getInitialState: function () {
        return {left: 0, top: 0, direction: 0};
    },
    render: function () {
        return (
            <img src="images/bullet.png"
                 style={{
                position: 'relative',
                top: this.state.top,
                left: this.state.left,
                transform: 'rotate(' + this.state.direction + 'deg)'
            }} />
        );
    }
});

var bullet = React.render(
    <Bullet />,
    document.getElementById('bullet')
);