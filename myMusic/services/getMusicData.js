function getIndexData(callback) {
        var data = {
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now()
        };
        wx.request({
            url: 'http://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data)
                } else {

                }

            }
        });
    };

function getHotMusicData(id, callback) {
        var data = {
            labelid: id,
            g_tk: 5381,
            uin: 0,
            format: 'json',
            inCharset: 'utf-8',
            outCharset: 'utf-8',
            notice: 0,
            platform: 'h5',
            needNewCode: 1,
            _: Date.now(),
        }
        wx.request({
            url: 'http://c.y.qq.com/v8/fcg-bin/fcg_v8_radiosonglist.fcg',
            data: data,
            header: {
                'Content-Type': 'application/json'
            },
            success: function (res) {
                if (res.statusCode == 200) {
                    callback(res.data);
                } else {

                }

            }
        });
    }


module.exports={
    getIndexData:getIndexData,
    getHotMusicData:getHotMusicData
}