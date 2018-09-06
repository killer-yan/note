'use strict';

// 引入模块
var https = require('https');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');


// 爬虫的 URL 信息
var opt = {
    hostname: 'github.com',
    path: '/lodash/lodash/blob/4.17.5/lodash.js',
    port: 443
};

// 创建 http get 请求
https.get(opt, function(res) {
    var html = ''; // 保存抓取到的 HTML 源码

    // 设置编码
    res.setEncoding('utf-8');

    // 抓取页面内容
    res.on('data', function(chunk) {
        html += chunk;
    });

    res.on('end', function() {
        let reg = /<[^>]+>/g;
        // console.log(typeof html)
        // console.log(html.slice(0,30),'yan--------before')
                                                                  // let aaa = html.replace(reg,' ');
        // console.log(html.slice(0,30),'yan--------after')
        let aaa = html.replace('/ /g',"");
        saveData('data/data.js', aaa);
    });
}).on('error', function(err) {
    console.log(err);
});


/**
 * 保存数据到本地
 *
 * @param {string} path 保存数据的文件
 * @param {array} movies 电影信息数组
 */
function saveData(path, movies) {
    // 调用 fs.writeFile 方法保存数据到本地
    fs.writeFile(path, JSON.stringify(movies, null, 4), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Data saved');
    });
}




















/**
 * 下载图片
 *
 * @param {string} imgDir 存放图片的文件夹
 * @param {string} url 图片的 URL 地址
 */
function downloadImg(imgDir, url) {
    https.get(url, function(res) {
        var data = '';

        res.setEncoding('binary');

        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            // 调用 fs.writeFile 方法保存图片到本地
            fs.writeFile(imgDir + path.basename(url), data, 'binary', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log('Image downloaded:', path.basename(url));
            });
        });
    }).on('error', function(err) {
        console.log(err);
    });
}