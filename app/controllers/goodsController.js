'use strict'
var keys = []
const co = require('co');
const {god_add, god_del, get_god } = require('../db_conf/mamcache');
module.exports = {


    get_list: co.wrap(function * get_list (ctx, next) {
      if(get_god(parseInt(ctx.params.id))){

        ctx.res.writeHead(200 , {"Content-type":"text/plain"});
          ctx.body = yield get_god(parseInt(ctx.params.id));
        
          yield next();
        }
    }),
    post_goods: co.wrap(function * post_goods (ctx, next) {
        try{
            var id;
            do{
                id = Math.round(Math.random() * 100);

            }
            while(keys.some(val => val == id));
            keys.push(id);
        }
        catch(err) {

            ctx.res.writeHead(400 , {"Content-Type" : "text/plain"});
            ctx.body = '' ;
        }

        try{
            ctx.res.writeHead(201 , {"Content-Type" : "text/plain"});
            function readBody (ctx) {
                return new Promise((resolve , reject) => {
                  try{
                    ctx.req.on('data' , data => {
                      resolve(data.toString());
                    });
                  }catch(err){
                    reject(err);
                  }
                })
              }
         
              ctx.body= yield god_add(id, `${readBody(ctx)}`);
       
        
            }
        catch (err) {
            ctx.res.writeHead(404 , {"Content-type":"text/plain"});
            ctx.body = 404;
        }}),

    del_goods: co.wrap(function * del_goods (ctx, next) {
        ctx.res.writeHead(204, {"Content-Type" : "text/plain"});
        god_del(parseInt(ctx.params.id));

        keys = keys.map(val => {
       if(val == parseInt(ctx.params.id)
        );
        else
        return val;
    })})}