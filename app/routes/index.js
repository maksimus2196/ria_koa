/**
 * Main route rules
 * @param {koa} app - Koa appliacation
 * @param {helpers/passport} passport - Adapted passport module
 * @module routes
 */
module.exports = function routes(app, passport) {
    "use strict";

    const
        co   = require('co'),
        Router = require('koa-router'),
        authed = require('../helpers/authedMiddleware'),
        
        
    // Controllers
        indexController  = require('../controllers/indexController'),
        loginController  = require('../controllers/loginController'),
        secureController = require('../controllers/secureController'),
        goodsController = require('../controllers/goodsController');

    var router = new Router();

    router
        .get('/',          indexController.index)
        .get('/users',     indexController.list)
        .get('/users/:id', indexController.getId)
        .get('/goods/:id', goodsController.get_list)//200 - все ок , 404 - нет товара
        .post('/goods', goodsController.post_goods)  //201 удалось добавить товар
        .del('/goods/:id', goodsController.del_goods)// 204 удалось удалить товар  , 400 не  удалось удалить

        .get('/login',     loginController.login)
        .post('/login',
            passport.authenticate('local', {
                successRedirect: '/secure',
                failureRedirect: '/login'
            })
        )
        .get('/logout', co.wrap(function*(ctx) {
            ctx.logout();
            ctx.redirect('/login')
        }))
        .get('/secure', authed, secureController.index);

    app.use(router.routes());
    app.use(router.allowedMethods({
        throw: true,
        notImplemented: () => new Boom.notImplemented(),
        methodNotAllowed: () => new Boom.methodNotAllowed()
    }));
};