const config = {
    "temp":{
        "index":{
            title:"首页",
            filename:"index.html",
            template:"./src/page/index/index.html",
            chunks:[
                "index"
            ]
        }
    },
    "entrys":{
        "index":["./src/page/index/index.jsx"]
    }
}

module.exports = config;