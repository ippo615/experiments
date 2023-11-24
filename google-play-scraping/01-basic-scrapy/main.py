
import scrapy

# scrapy runspider main.py -O out.json

class StoreSpider(scrapy.Spider):
    name = 'PlayStoreSpider'
    def __init__(self, name=None, **kwargs):
        super().__init__(name, **kwargs)
        self.base_url = 'https://play.google.com/store/search'
        self.query = '?q=gmail&c=apps'
    
    def start_requests(self):
        yield scrapy.Request(url=self.base_url+self.query, callback=self.parse_search_page)

    def parse_search_page(self, response, **kwargs):
        for link in response.css('.b8cIId.ReQCgd.Q9MA7b>a'):
            detail_page = response.urljoin(link.css('::attr(href)').get())
            if detail_page:
                yield scrapy.Request(detail_page, self.parse_detail_page)


    def parse_detail_page(self, response, **kwargs):
        has_ads = response.css('.bSIuKf::text').get() == 'Contains Ads'
        data = {
            'title': response.css('h1.AHFaub>span::text').get(),
            'permissions': response.css('.U2Wohd.TfOa3::text').get(),
            'has_ads': has_ads,
            'price': 0,
        }
        # print(data)
        yield data
        # response.url
        # response.body
        # response.css('a.title') # use any css selector
        # for link in response.css('.b8cIId.ReQCgd.Q9MA7b>a'):
        #     print(link.css('::text').get())
        #     # print('  %s' % link.css('::attr(href)').get())
        #     print(response.urljoin(link.css('::attr(href)').get()))
        #     # print(link.css('::text')+' ->'+link.css('::attr(href)'))

# There is no easy way to go from the data on the page to the request
# that tells you which permissions are needed for the app.

# <div jsaction="click:UMmHgd(Hly47e)"><a jsname="Hly47e" class="hrTbp ">View details</a></div>
# await fetch("https://play.google.com/_/PlayStoreUi/data/batchexecute?rpcids=xdSrCf&source-path=%2Fstore%2Fapps%2Fdetails&f.sid=7548145574384803107&bl=boq_playuiserver_20220216.07_p0&hl=en-US&authuser&soc-app=121&soc-platform=1&soc-device=1&_reqid=2242428&rt=c", {
#     "credentials": "include",
#     "headers": {
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0",
#         "Accept": "*/*",
#         "Accept-Language": "en-US,en;q=0.5",
#         "X-Same-Domain": "1",
#         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
#         "Sec-Fetch-Dest": "empty",
#         "Sec-Fetch-Mode": "cors",
#         "Sec-Fetch-Site": "same-origin",
#         "Pragma": "no-cache",
#         "Cache-Control": "no-cache"
#     },
#     "referrer": "https://play.google.com/",
#     "body": "f.req=%5B%5B%5B%22xdSrCf%22%2C%22%5B%5Bnull%2C%5B%5C%22com.google.android.gm%5C%22%2C7%5D%5D%5D%22%2Cnull%2C%221%22%5D%5D%5D&",
#     "method": "POST",
#     "mode": "cors"
# });

# URL PARAMETERS
# rpcids=xdSrCf
# source-path=%2Fstore%2Fapps%2Fdetails
# f.sid=7548145574384803107
# bl=boq_playuiserver_20220216.07_p0
# hl=en-US
# authuser
# soc-app=121
# soc-platform=1
# soc-device=1
# _reqid=2242428
# rt=c

