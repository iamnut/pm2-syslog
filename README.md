# pm2-syslog

## Update

- fixed timezone offset is not integrated in the event date
- added feature custom server address, port, tag and facility

## default conf

- address = `localhost`
- port = `514`
- facility = `local0`
- tag = `pm2`

You can change them via `pm2 set pm2-syslog:[variable] [value]`

---

Redirect all logs of PM2 + Apps managed into `/var/log/syslog`

## Configure OS

Edit `/etc/rsyslog.conf` and uncomment:

```
# provides UDP syslog reception
module(load="imudp")
input(type="imudp" port="514")
```

Restart rsyslog:

```
$ sudo service rsyslog restart
```

## Install module

```
# Install
$ pm2 install pm2-syslog

# Uninstall
$ pm2 uninstall pm2-syslog
```

# License

MIT
