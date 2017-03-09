define(function(){
    var data = {
        // 路由信息
        "routeList": [{
            "href": "#/",
            "title": "应用与工具"
        }, {
            "href": "#/news",
            "title": "新闻与阅读"
        }, {
            "href": "#/music",
            "title": "音乐与视频"
        }, {
            "href": "#/pic",
            "title": "图片与照片"
        }, {
            "href": "#/shop",
            "title": "购物与团购"
        }, {
            "href": "#/sport",
            "title": "体育与旅行"
        }, {
            "href": "#/blog",
            "title": "社交与博客"
        }, {
            "href": "#/tec",
            "title": "数码与科技"
        }, {
            "href": "#/game",
            "title": "游戏与娱乐"
        }, {
            "href": "#/edu",
            "title": "教育与招聘"
        }],
		// 捕捉路由
		"hashList":['#/','#/news','#/music','#/pic','#/shop','#/sport','#/blog','#/tec','#/game','#/edu'],
		// 自定义标签颜色信息
		"bgcolorList":['#1ABC9C','#2ECC71','#33C5C5','#3498DB','#9B59B6','#34495E','#F1C40F','#E67E22','#E74C3C','#95A5A6','#39F076','#D80843'],
		// 字体颜色信息
		"fontcolorList":['#FFF','#2ECC71','#33C5C5','#3498DB','#9B59B6','#34495E','#F1C40F','#E67E22','#E74C3C','#95A5A6','#39F076','#D80843'],
		// 搜索类型信息
		"searchTypeList":[{
			title:'网页'
		},{
			title:'图片'
		},{
			title:'地图'
		},{
			title:'视频'
		},{
			title:'新闻'
		}],
		// 搜索引擎类型信息
		"searchBrowserList":[[
			'https://www.baidu.com/s?ie=UTF-8&wd=',
			'http://image.baidu.com/search/index?tn=baiduimage&word=',
			'http://map.baidu.com/?newmap=1&ie=utf-8&s=s%26wd%3D',
			'http://video.baidu.com/v?ie=utf-8&word=',
			'http://news.baidu.com/ns?tn=news&ie=utf-8&word='				
		],[
			'https://www.google.com/search?q=',
			'https://www.google.com/search?tbm=isch&q=',
			'https://www.google.com/maps/preview?q=',
			'https://www.google.com/search?tbm=vid&q=',
			'https://www.google.com/search?tbm=nws&q='
		]],
    }

    return data;

})
