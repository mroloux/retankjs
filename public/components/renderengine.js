var renderEngine = (function() {

    function renderEngine() {
        tank.setState({left: Math.random() * 950, top: Math.random() * 700, direction: gamestate.tanks[0].direction});
    }

    return renderEngine;
})();

