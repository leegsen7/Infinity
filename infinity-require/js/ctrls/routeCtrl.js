define(['app'],function(app){
	// 应用和工具控制器
	app.controller('appCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i4.buimg.com/573358/b38d1bf1c6ef661e.png',
			titleName: '支付宝',
			linkHref: 'https://www.alipay.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/0c4b728386098f3a.png',
			titleName: 'Google商店',
			linkHref: 'https://chrome.google.com/webstore'
		},{
			imgSrc: 'http://i4.buimg.com/573358/617bbbc88975c848.png',
			titleName: 'QQ邮箱',
			linkHref: 'http://mail.qq.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/ac3d00eece63abb6.png',
			titleName: '百度云',
			linkHref: 'http://pan.baidu.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/720fdb4c8b8a08c0.png',
			titleName: '百度地图',
			linkHref: 'http://map.baidu.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/7fa529e05f8433fb.png',
			titleName: 'APP每日推送',
			linkHref: 'http://appdp.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/94a50075937920bd.png',
			titleName: '微信公众平台',
			linkHref: 'https://mp.weixin.qq.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/8ea6ce8ab190d514.png',
			titleName: '360云盘',
			linkHref: 'http://yunpan.360.cn/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/0cd7b16132b1e691.png',
			titleName: '影梭',
			linkHref: 'http://www.ishadowsocks.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/9d18d74824b848df.png',
			titleName: '迅雷离线下载',
			linkHref: 'http://lixian.xunlei.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/144049d6f2127d93.png',
			titleName: '印象笔记',
			linkHref: 'http://www.yinxiang.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/d7038c1f253345e2.png',
			titleName: '高德地图',
			linkHref: 'http://ditu.amap.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/f75bab18725144da.png',
			titleName: 'Bootstrap文档',
			linkHref: 'http://v3.bootcss.com'
		},{
			imgSrc: 'http://i4.buimg.com/573358/02c4f8ce6633fcec.png',
			titleName: '最美应用',
			linkHref: 'http://zuimeia.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/bf59844aa755c6b9.png',
			titleName: '快递100',
			linkHref: 'http://www.kuaidi100.com/'
		}];
	})

	// 新闻和阅读控制器
	app.controller('newsCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i2.buimg.com/573358/682f6c420244c204.png',
			titleName: '凤凰新闻',
			linkHref: 'http://news.ifeng.com/'
		},{
			imgSrc: 'http://i2.buimg.com/573358/33756689699b9a10.png',
			titleName: '豆瓣',
			linkHref: 'http://douban.com/'
		},{
			imgSrc: 'http://i2.buimg.com/573358/7521615539e67dc6.png',
			titleName: '头条',
			linkHref: 'http://toutiao.com/'
		}]
	})
	// 音乐和视频控制器
	app.controller('musicCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i4.buimg.com/573358/f7ecd5eb89b13567.png',
			titleName: '哔哩哔哩',
			linkHref: 'http://www.bilibili.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/87d6b06d335c14af.png',
			titleName: '爱奇艺',
			linkHref: 'http://www.iqiyi.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/9b3d92b8746de5f6.png',
			titleName: '网易云',
			linkHref: 'http://music.163.com/'
		}]
	})
	// 图片与照片控制器
	app.controller('picCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i2.buimg.com/573358/6185c8edfbb6d99b.png',
			titleName: 'instagram',
			linkHref: 'http://www.instagram.com/'
		},{
			imgSrc: 'http://i2.buimg.com/573358/9458a8ad4d1e47c1.png',
			titleName: '花瓣网',
			linkHref: 'http://huaban.com/'
		},{
			imgSrc: 'http://i2.buimg.com/573358/2a77eec09dca8761.png',
			titleName: '优美图',
			linkHref: 'http://www.topit.me'
		}]
	})
	// 购物与团购控制器
	app.controller('shopCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i2.buimg.com/573358/0b7aab83357cd791.png',
			titleName: '淘宝',
			linkHref: 'http://taobao.com'
		}]
	})

	// 体育与旅行控制器
	app.controller('sportCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i2.buimg.com/573358/78279bb3fa8619d6.png',
			titleName: '虎扑体育',
			linkHref: 'http://hupu.com/'
		},{
			imgSrc: 'http://i2.buimg.com/573358/1a575689c904a49b.png',
			titleName: '新浪体育',
			linkHref: 'http://sports.sina.com.cn'
		},{
			imgSrc: 'http://i2.buimg.com/573358/7980435ae7f4e563.png',
			titleName: '去哪儿',
			linkHref: 'http://www.qunar.com/'
		}]
	})
	// 社交与博客控制器
	app.controller('blogCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i4.buimg.com/573358/d85994194b505596.png',
			titleName: '知乎',
			linkHref: 'http://zhihu.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/ab54bca46581ca4c.png',
			titleName: '新浪微博',
			linkHref: 'http://weibo.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/83286a69f6c1059b.png',
			titleName: '百度贴吧',
			linkHref: 'http://tieba.baidu.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/57244219a184cf63.png',
			titleName: '微信网页版',
			linkHref: 'http://wx.qq.com/'
		}]
	})
	// 数码和科技控制器
	app.controller('tecCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i2.buimg.com/573358/00b1a0051826cee8.png',
			titleName: '果壳网',
			linkHref: 'http://guokr.com/'
		},{
			imgSrc: 'http://i2.buimg.com/573358/3fd34b732e538815.png',
			titleName: '36Kr',
			linkHref: 'http://36kr.com/'
		},{
			imgSrc: 'http://i2.buimg.com/573358/0bab6c0a7847bb05.png',
			titleName: 'IT之家',
			linkHref: 'http://www.ithome.com/'
		}]
	})
	// 游戏与娱乐控制器
	app.controller('gameCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i4.buimg.com/573358/7fdac64522ae6b35.png',
			titleName: 'steam',
			linkHref: 'http://store.steampowered.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/ed1a5acf2916661e.png',
			titleName: '暴走漫画',
			linkHref: 'http://baozoumanhua.com'
		}]
	})
	// 教育与招聘控制器
	app.controller('eduCtrl',function($scope){
		$scope.items = [{
			imgSrc: 'http://i4.buimg.com/573358/0a06006b3f0056b5.png',
			titleName: '慕课网',
			linkHref: 'http://www.imooc.com'
		},{
			imgSrc: 'http://i4.buimg.com/573358/0605f221468f46dd.png',
			titleName: '网易公开课',
			linkHref: 'http://open.163.com/'
		},{
			imgSrc: 'http://i4.buimg.com/573358/affbb115fd960f36.png',
			titleName: '智联招聘',
			linkHref: 'http://zhaopin.com/'
		}]
	})	
})