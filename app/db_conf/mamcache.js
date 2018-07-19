var Memcached = require('memcached');
memcached = new Memcached('192.168.0.102:11211');

function god_add (id, val) {
    // через промиcы не зашло...
    return // new Promise ((resolve, reject)=> {
        memcached.add(`${id}`, val, 100, (err) => {
            if (err)
            { 
                throw new err
             //   reject(err)
            }
            console.log(val);
               return(id);// resolve(id);
        })
    //})
}
    function god_del (id) { return new Promise((resolve, reject) => {
        memcached.del(`${id}`, (err) =>
        {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
    }
    })})};
    function get_god (id)  {return new Promise((resolve, reject) => {
        memcached.get(`${id}` , (err , data) => {
        if(err) reject(err);
        console.log(id);
        console.log(data);
    resolve(data);
})
  })
}
module.exports = {get_god, god_add, god_del};