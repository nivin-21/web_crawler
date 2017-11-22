var http = require('http');
var fs = require('fs');
var Crawler = require("js-crawler");
var csv = require("fast-csv");

var crawlData = function(req, res) {
	var uniq_urls = []
	var crawler = new Crawler().configure({
	  maxRequestsPerSecond: 10,
	  maxConcurrentRequests: 5
	});
	
	crawler.crawl({
	  url: "http://medium.com/",
	  success: function(page) {
	    console.log(page.url);
	    uniq_urls.push([page.url]);
	  },
	  failure: function(page) {
	    // console.log(page.status);
	  },
	  finished: function(crawledUrls) {
	  	console.log("Crawled Successfully. CSV generated.")
		var ws = fs.createWriteStream('crawled_urls.csv');
		csv.write(uniq_urls,{headers:true}).pipe(ws);
	  }
	});

}

var server = http.createServer(function(req, res) {
	console.log('nivin');
	console.log(req.url);
	if(req.url.includes('/crawl')) {
		// console.log('into nivinaebfisbfibsfib');
		crawlData(req,res);
		res.writeHead(200,{'Content-Type':'text/html'});
		res.write("Crawling In Progress.....Check Logs");
	}
	else {
		fs.readFile('home.html',function (err, data){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.write(data);
		});
	}
});

server.listen(8080);