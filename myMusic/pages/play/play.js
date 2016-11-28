
var app=getApp();
Page({
	data:{
		musicData:[],
		currName:'',
		currSinger:'',
		currUrl:'',
		currImg:'',
		currId:0,
		currTime:'0:00',
		positionTime:'0:00',
		random:0,
		isPlay:false,
		isList:false,
		inv:null,
		duration:0,
		currentPosition:0
	},
	onLoad(){
		console.log('play-load');
		var arr=app.data.musicData;
		this.setData({
			musicData:arr
		})
		// 第一次进来默认播放第一首
		this.play(0);
		
	},
	onReady:function(){
		wx.setNavigationBarTitle({
			title:'play'
		})
	},
	play:function (id) {
		clearInterval(this.data.inv)
		if(!this.data.isPlay){
			var id=id||this.data.currId;//当前的id
			var currArr=this.data.musicData[id];//当前歌曲对象
			var currUrl='http://ws.stream.qqmusic.qq.com/C100'+currArr.mid+'.m4a?fromtag=38';//当前歌曲url
			var	currImg='http://y.gtimg.cn/music/photo_new/T002R150x150M000' +currArr.album.mid + '.jpg?max_age=2592000';//当前歌曲封面
			var currName=currArr.name;//当前歌曲标题
			var currSinger=currArr.singer[0].name;//当前歌曲作者
			//播放控件
			wx.playBackgroundAudio({
				dataUrl:currUrl,
				title:currName,
				coverImgUrl:currImg,
				success:function () {
					console.log('播放成功')
				},
				fail:function () {
					console.log('播放失败')
				}
			});
			this.setData({
				currUrl:currUrl,
				currImg:currImg,
				currName:currName,
				currSinger:currSinger
			})
		}else{
			//暂停
			wx.pauseBackgroundAudio();
		}
		this.playState();
	},
	playState:function () {
		var _this=this;
		var inv=setInterval(function(){
			wx.getBackgroundAudioPlayerState({
				success:function (res) {
					//当暂停时候清除定时器
					if(_this.data.isPlay) clearInterval(inv)		
					var duration=res.duration;
					var currentPosition=res.currentPosition;
					var positionTime=(duration / 60).toFixed(0) + ':' + ((duration % 60).toFixed(0).length < 2 ? '0' + (duration % 60).toFixed(0) : (duration % 60).toFixed(0));
					var currTime=(currentPosition / 60).toFixed(0) + ':' + ((currentPosition % 60).toFixed(0).length < 2 ? '0' + (currentPosition % 60).toFixed(0) : (currentPosition % 60).toFixed(0));
					_this.setData({
						inv:inv,
						duration:duration,
						currentPosition:currentPosition,
						positionTime:positionTime,
						currTime:currTime
					});
					if(duration&&duration<=currentPosition){
						//随机播放
						if(_this.data.random===1){
							var num=Math.floor(Math.random()*_this.data.musicData.length);
							console.log(num)
							_this.play(num);
						}else if(_this.data.random===2){//单曲循环
							_this.play(_this.data.currId)
						}else{
							_this.nextPlay();//依次播放
						}
					}
					console.log(duration)
				},
				fail:function (e) {
					console.log('获取音乐信息失败')
				}
			})
		},1000);
		
	},
	playLoop:function (e) {
		// 设置随机播放||单曲||依次
		var random=this.data.random;
		random=random+1 >2?0:random+1;
		this.setData({random:random});
	},
	prevPlay:function () {//上一首
		var currId=(this.data.currId)-1;
		currId=currId>=0?currId:this.data.musicData.length-1;
		this.setData({currId:currId});
		this.play()
	},
	nextPlay:function () {//下一首
		var currId=(this.data.currId)+1;
		currId=currId>this.data.musicData.length-1?0:currId;
		this.setData({currId:currId});
		this.play()
	},
	pauseStop:function () {//暂停和播放
		this.setData({
			isPlay:!this.data.isPlay
		})
		this.play();
	},
	listShow:function () {//显示隐藏列表
		console.log(1111)
		this.setData({
			isList:!this.data.isList
		})
	},
	itemTap:function (e) {//列表单个事件
		var currId=e.currentTarget.id
		this.setData({currId:currId});
		this.play();
	},
	dragChange:function (e) {//拖动
		var value=e.detail.value
		wx.seekBackgroundAudio({
		    position:value
		})
	}
})