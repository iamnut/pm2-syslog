var pm2 = require('pm2');
var pmx = require('pmx');
var SysLogger = require('ain2');

var config = {};

pmx.initModule({}, function(err, conf){
    if (err) return console.error(err);
    config = conf;
});

var logger = new SysLogger({
    tag: config.tag,
    facility: config.facility,
    address: config.address,
    port: parseInt(config.port)
});

pm2.launchBus(function(err, bus) {
    bus.on('*', function(event, data){
        if (event === 'process:event' && data.event === 'online') {
            logger.warn('app=pm2 target_app=%s target_id=%s restart_count=%s status=%s',
                data.process.name,
                data.process.pm_id,
                data.process.restart_time,
                data.event
            );
        }
    });

    bus.on('log:err', function(data) {
        logger.error('app=%s id=%s |stderr|%s', 
            data.process.name, 
            data.process.pm_id, 
            data.data
        );
    });

    bus.on('log:out', function(data) {
        logger.log('app=%s,id=%s|stdout|%s', 
            data.process.name, 
            data.process.pm_id, 
            data.data
        );
    });
});
