var TankGame = React.createClass({
    render: function () {
        return (
            <img src="images/tank.png" style={{
                position: 'absolute'
            }} />
            );
    }
});

React.render(
    <TankGame />,
    document.getElementById('tankGame')
);