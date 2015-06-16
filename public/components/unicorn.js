var Unicorn = React.createClass({
    render: function () {
        return (
            <img src="images/unicorn.png"
            style={{
                position: 'absolute',
                top: this.props.top,
                left: this.props.left,
                width: '100px',
                zIndex: -1
            }} />
            );
    }
});

var horsySound = new Audio("sound/horse.mp3");

function createUnicorn(unicorn) {
    var div = document.createElement('div');
    document.getElementById('battleground').appendChild(div);
    React.render(<Unicorn left={unicorn.x} top={unicorn.y} />, div);
    gamestate.unicorns.push(unicorn);
    horsySound.play();
}