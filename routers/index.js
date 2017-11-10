const routeControllers = require('../controllers');


module.exports = (router) => {
    for(let route in routeControllers) {
        if (routeControllers.hasOwnProperty(route)) {
            const routeParams = route.split(' ');
            const method = routeParams[0];
            const name = routeParams[1];
            router[method.toLowerCase()](name, routeControllers[route]);
        }
    }
}