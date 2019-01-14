var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')

http.createServer(function (req, res) {
    var pathObj = url.parse(req.url, true)
    console.log(pathObj)
    switch (pathObj.pathname) {
        case '/getWeather':
            var weather = [
                '北京：晴',
                '杭州：阴',
                '上海：多云'
            ]
            res.setHeader('Content-Type','text/json;charset=utf-8')
            if(pathObj.query.callback){
                res.end(pathObj.query.callback + '(' + JSON.stringify(weather) + ')')
            }
            else{
                 res.end(JSON.stringify(weather))

            }
           
            break;

        default:
            fs.readFile(path.join(__dirname, pathObj.pathname), function (e, data) {
                if (e) {
                    console.log('404', 'not found')
                    res.end('<h1>404 not found</h1>')
                } else {
                    res.end(data)
                }
            })

    }


}).listen(8080)