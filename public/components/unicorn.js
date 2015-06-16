var Unicorn = React.createClass({
    render: function () {
        return (
            <img src="images/unicorn.jpg"
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

function createUnicorn(unicorn) {
    var div = document.createElement('div');
    document.body.appendChild(div);
    React.render(<Unicorn left={unicorn.x} top={unicorn.y} />, div);
    gamestate.unicorns.push(unicorn);
    var snd = new Audio("sound/horse.mp3");
    snd.play();
}