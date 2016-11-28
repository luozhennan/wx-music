var getMusicData=require('../../services/getMusicData');
var app=getApp();
Page({
	data:{
		radioList:[],
		slider:[],
		songList:[],
		item:['a','b','c']
	},
	onLoad:function () {
		console.log('index-load')
		getMusicData.getIndexData(this.getIndexData);
	},
	getIndexData:function (data) {
		this.setData({
			radioList:data.data.radioList,
			slider:data.data.slider,
			songList:data.data.songList
		})
	},
	hotMusic:function (e) {
		var id=e.currentTarget.dataset.id
		console.log(id)
		getMusicData.getHotMusicData(id,this.getHotMusicData)
	},
	getHotMusicData:function (data) {
		wx.navigateTo({
			url:'../play/play'
		});
		app.data.musicData=data.data
	}
})