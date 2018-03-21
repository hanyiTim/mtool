var client = require('scp2');

var serverConfig = {
    host: '172.17.6.19',
    username: 'root',
    password: 'vm09#ops.fm',
    path: '/mnt/lizhi_static/public/sfestival/static/hotRocketSwitch/'
}
client.scp('./dist/', serverConfig, (err) => {
    if (!err) {
        console.log('发布到开发环境成功');
    }
})