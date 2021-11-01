/*global chrome*/
console.log("in content script");
(function() {
    const getProductData = async () => {
        try {
            const productData = await fetch("https://www.walmart.com/orchestra/home/graphql", {
                "headers": {
                  "accept": "application/json",
                  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
                  "content-type": "application/json",
                  "device_profile_ref_id": "-YSUpbKl6_Gfobe0CeRQFSrHKMEs80QLFqOh",
                  "sec-ch-ua": "\"Chromium\";v=\"94\", \"Google Chrome\";v=\"94\", \";Not A Brand\";v=\"99\"",
                  "sec-ch-ua-mobile": "?0",
                  "sec-ch-ua-platform": "\"macOS\"",
                  "sec-fetch-dest": "empty",
                  "sec-fetch-mode": "cors",
                  "sec-fetch-site": "same-origin",
                  "wm_mp": "true",
                  "wm_page_url": "https://www.walmart.com/ip/Dixie-Disposable-Paper-Cup-Print-9-oz-50-count/935535882",
                  "wm_qos.correlation_id": "yawzu8iP3-XVbCRFWAy6Oyq8O1hWvuAhkXJ1",
                  "x-apollo-operation-name": "GetAllSellerOffers",
                  "x-enable-server-timing": "1",
                  "x-latency-trace": "1",
                  "x-o-ccm": "server",
                  "x-o-correlation-id": "yawzu8iP3-XVbCRFWAy6Oyq8O1hWvuAhkXJ1",
                  "x-o-gql-query": "query GetAllSellerOffers",
                  "x-o-platform": "rweb",
                  "x-o-platform-version": "main-95-d16692",
                  "x-o-segment": "oaoh",
                  "cookie": "DL=94066%2C%2C%2Cip%2C94066%2C%2C; vtc=RBMisuo8ShtOI7akCJK8V8; _gcl_au=1.1.344144359.1631259536; cart-item-count=0; _sp_id.ad94=45d144d3-be46-471d-8ce1-196e3ec0c667.1631351578.4.1631720767.1631701259.f4ba523b-e35e-4d80-be54-bc8611089bb1; dimensionData=649; QuantumMetricUserID=34f7e8849b9dc2329912644c5ff9cd43; _abck=c7gp9asak8j2523f97vk_1647; brwsr=79910de5-1b91-11ec-96da-d33dcffa0902; adblocked=false; pxcts=34a46be0-2a4a-11ec-88fe-0be90d157277; TBV=7; _uetvid=27b2ee70120a11ecb25ad3196f01e4b1; akavpau_p8=1634014479~id=0a2b62867c6dd227a45932a19a055989; rtoken=MDgyNTUyMDE4XViLTsN2JGkRVF8SJ7VfEWvR9Qv%2B0mz3QxU2JjTqeJerT33eM84YJEriIWXoSRR5SLn18lJtghfZP4AAJnwxw%2BqsDqW%2Bz5p5NAIF6cYJHpi%2BlvzWztU6eKbN55tUYfKpQuURxyRZk5m0wA91gL2Z0F5xQBNZlXVCvDT8RDukxBUl3B7vjKq6NenJpNB76gRaF4Xf11c%2Fhvr%2Fxdu9gVSNEiY%2BvXnIibVCjn2yOOYFpaaozzyZ%2F999m4Zi9vd7ZISr%2FMqgSAvOBF7VZqRYFBd0RPSYm7eYHSwC8lmDhS94MdmtQyRt6%2FS1aPAwtZpWKXtKO%2BVxTBI57rXN2x7Qicccrai3qj0VDEuV7eWG%2FtebYbPQTsOV%2FBUJNiNmphsOmJ7CzAMrgP15WI0waezoEFNy%2Fp%2BijgcpYBLHnXh9zK1ZVYE%3D; SPID=ad10d2f746086d8e63366963a4dc34a6d0ae15987290769293b98347ac13b186b2f9639e552818b102239627796849cfwmart; CID=6b454241-99d7-4b1f-884e-450f3b4c9d59; hasCID=1; customer=%7B%22firstName%22%3A%22Afaq%22%2C%22lastNameInitial%22%3A%22K%22%7D; type=REGISTERED; WMP=4; userContext=eyJhZGRyZXNzRGF0YSI6bnVsbCwiaGFzSXRlbVN1YnNjcmlwdGlvbiI6ZmFsc2UsImhhc01lbWJlcnNoaXBJbmZvIjpmYWxzZSwiaXNEZWZhdWx0IjpmYWxzZSwicGF5bWVudERhdGEiOnsiY2FwaXRhbE9uZUJhbm5lclNub296ZVRTIjowLCJoYXNDYXBPbmUiOmZhbHNlLCJoYXNDYXBPbmVMaW5rZWQiOmZhbHNlLCJoYXNDcmVkaXRDYXJkIjpmYWxzZSwiaGFzRGlyZWN0ZWRTcGVuZENhcmQiOmZhbHNlLCJoYXNFQlQiOmZhbHNlLCJoYXNHaWZ0Q2FyZCI6ZmFsc2UsInNob3dDYXBPbmVCYW5uZXIiOnRydWV9LCJwcm9maWxlRGF0YSI6eyJpc0Fzc29jaWF0ZSI6ZmFsc2UsImlzVGVzdEFjY291bnQiOmZhbHNlLCJtZW1iZXJzaGlwT3B0SW4iOnsiaXNPcHRlZEluIjpmYWxzZX19fQ%3D%3D; akavpau_p27=1634031254~id=d37953511cc033a3d8e197ddecf46036; locGuestData=eyJpbnRlbnQiOiJTSElQUElORyIsInN0b3JlSW50ZW50IjoiUElDS1VQIiwibWVyZ2VGbGFnIjpmYWxzZSwicGlja3VwIjp7Im5vZGVJZCI6IjMxNjQiLCJ0aW1lc3RhbXAiOjE2MzQwMzYxOTEwNDh9LCJwb3N0YWxDb2RlIjp7InRpbWVzdGFtcCI6MTYzNDAzNjE5MTA0OCwiYmFzZSI6IjcyNzEyIn0sInZhbGlkYXRlS2V5IjoicHJvZDp2Mjo2YjQ1NDI0MS05OWQ3LTRiMWYtODg0ZS00NTBmM2I0YzlkNTkifQ%3D%3D; AID=wmlspartner%253D0%253Areflectorid%253D0000000000000000000000%253Alastupd%253D1634113228259; _vc=kTCMW%2FfBIp8UmRqPNMJO%2F%2BC%2FgEC2GQjn%2F8mZlSq9nO8%3D; _m=9; akavpau_p1=1635136384~id=244ad6802b2f611dda4c859ff31238e6; WLM=1; tb_sw_supported=true; _pxhd=nS8EcIimHkd//E3b9zv3DdrG0TWDvmQzj5eVgQQ8v5U71wYqmVagT9D66WPaC6ISe77h-Cnwk64e/-dHWtHtdw==:8a0WkBWxMY/grdZyoXoBXnW0oPa80QRQHgFFFiBuX4jcIngCoCBJ1YZOlv-TQwAmrAktoMGwBGH7vwXmlNYfs9HjHsjpTVVxzdK3aNpcxC8=; _pxvid=0741dfeb-361f-11ec-87d5-4b4c54534746; TB_Latency_Tracker_100=1; TB_Navigation_Preload_01=1; TB_SFOU-100=1; QuantumMetricSessionID=a749c3737aed5d9a9800748946e665ec; auth=MTAyOTYyMDE4j9oISrad17t5PrIFs%2FLHg3FvjeGJYcJngAqSejkw8xCRCUoDd8UpxI0F9x3uVNaWQxdQPRr8DS%2FGivdGxBLVp2I6PCU1Mgg6ypwkV6HUQ03KM%2FMXB5lHtf6pM1H1%2BDLrcru%2FbRQZ4hu5JpN5uYzDEu5oLyMcYT38lmGJ6a1H8idbbyucBIFhgKSNo58LAAz62rRl1WqVgaiqNhkkdKNRfcMwge6mEeCbDv2kax1JgF1yP0ebJ6kqJ8n4jr5MUrlxyhnRtmv7KSNCAiedqKPpTl9BX60PJmoYrI0EEQClmS14xO5RLupogjHAnEFvCjkmpcq1zI5amCvhz437dkOqqKLc96%2B03NMf9E%2BaCWVo2iG1jdv%2FPYcQlfNHu5e43HAdi15K911MzuAoP0ihci0taA%3D%3D; locDataV3=eyJpbnRlbnQiOiJTSElQUElORyIsInBpY2t1cCI6W3siYnVJZCI6IjAiLCJub2RlSWQiOiIzMjkxIiwiZGlzcGxheU5hbWUiOiJGbGFuZGVycyBTdG9yZSIsIm5vZGVUeXBlIjoiU1RPUkUiLCJhZGRyZXNzIjp7InBvc3RhbENvZGUiOiIwNzgzNiIsImFkZHJlc3NMaW5lMSI6IjQwIEludGVybmF0aW9uYWwgRHIgUyIsImNpdHkiOiJGbGFuZGVycyIsInN0YXRlIjoiTkoiLCJjb3VudHJ5IjoiVVMiLCJwb3N0YWxDb2RlOSI6IjA3ODM2LTQxMDYifSwiZ2VvUG9pbnQiOnsibGF0aXR1ZGUiOjQwLjg4MTgwOSwibG9uZ2l0dWRlIjotNzQuNzA4MzY0fSwiaXNHbGFzc0VuYWJsZWQiOnRydWUsInNjaGVkdWxlZEVuYWJsZWQiOmZhbHNlLCJ1blNjaGVkdWxlZEVuYWJsZWQiOnRydWV9XSwic2hpcHBpbmdBZGRyZXNzIjp7ImxhdGl0dWRlIjo0MC43ODU4LCJsb25naXR1ZGUiOi03NC42ODYxLCJwb3N0YWxDb2RlIjoiMDc5MzAiLCJjaXR5IjoiQ2hlc3RlciIsInN0YXRlIjoiTkoiLCJjb3VudHJ5Q29kZSI6IlVTQSIsImdpZnRBZGRyZXNzIjpmYWxzZX0sImFzc29ydG1lbnQiOnsibm9kZUlkIjoiMzI5MSIsImRpc3BsYXlOYW1lIjoiRmxhbmRlcnMgU3RvcmUiLCJhY2Nlc3NQb2ludHMiOm51bGwsImludGVudCI6IlBJQ0tVUCIsInNjaGVkdWxlRW5hYmxlZCI6ZmFsc2V9LCJpbnN0b3JlIjpmYWxzZSwicmVmcmVzaEF0IjoxNjM1NDA3ODk2NDE5LCJ2YWxpZGF0ZUtleSI6InByb2Q6djI6NmI0NTQyNDEtOTlkNy00YjFmLTg4NGUtNDUwZjNiNGM5ZDU5In0%3D; assortmentStoreId=3291; hasLocData=1; TB_DC_Flap_Test=0; bstc=SldGeYDLFmnYGLYPuOeBL8; mobileweb=0; xpa=88Oyw|FlNtB|QJKbL|ZZnrn|r5MxF; exp-ck=88Oyw1FlNtB1QJKbL1ZZnrn1; xpm=1%2B1635404296%2BRBMisuo8ShtOI7akCJK8V8~6b454241-99d7-4b1f-884e-450f3b4c9d59%2B0; ak_bmsc=12ED9496017015417DDD10A32AC465E5~000000000000000000000000000000~YAAQH54QAl3k1Vt8AQAAHkOxxQ01c7V9/RIpM0SvvXQB+7ejp3L4JuZ7zP89Jlwvq7VRy91wLhnc6BA6QKKlpKy+5xers7P0lE7DpgecQYYIB35J0Yg7mTtTB/Xj7VDwYifEhokfqN45BxQbfetvRhRDPUuer9r5lHl+nfl4mG+nsrVihhycYYSZW3rDQgeteU+t+iah/bt/s7bqixjPDODD+9XOCsqQiwOW5udmTk1sZNnf3hfUXcgkpdGoL9XrzagsLF0zHXEc+GOwwcMOO7OarKh5IG9vyGwxcxFLCgi6kP4F2iWPO/A/qZVlINVydMVbg1jKY74HghfX2PuQ3heZebldqNz4CkAvKK7wbKu6tm7ODneGQ+dld0Ql4oj1C5a6gX6H8lMgtpb2z0fOrh0haWtYv4KQ0AGVBnLJ8R5TopBpLubB//E/2Ns2XdX+1l/is1QWQ/znr8nBSX8ZKTaQCXl1rSt3u+vW16bb37RZpgK869w3lR7w300=; _pxff_cfp=1; AZ_ST_CART=%7B%22mtoken%22%3A%22269%3A9%23103018574%232%3D136140828%235%3D138073185%22%7D; undefined=OMNI_PROMISE; tb-c30=scus-t1; com.wm.reflector=\"reflectorid:0000000000000000000000@lastupd:1635404889000@firstcreate:1634112989937\"; _px3=b09c8fa4b9e6509b1c0a86f453d6cc766f814591c2bbb213eeb73527b502b568:54Zrep3dprJ55DZvdEKV+jqBr5bA5YDm1ucnys3jjjEtOXgru6WbDtbX4Ts20P/lx8YQ7OyhANKovdkRLvrMjA==:1000:5xz2iXXHe7eVF5mx2xYgjt0tJdoEa6uxWUv+Fi8kX621cNwyG/4s83rLj3YCVJehyUrSwK1QSLgPphnrDvGB6KqOZhS5UQEEzIT8HaVIbuTfTk5ZBCq6ir9/urrOGM2occPDBNci9Jw4ve9ballVnvnl0e5gVO5ZpkI5TPaCAKBtD4BZQhS2+1eGra6sfVwb3DElIiJVQV1MtZkODf1xvA==; _pxde=065a564906f09801d8e74097dcb3becacb02deed0e310e23a3c0e94f31084a61:eyJ0aW1lc3RhbXAiOjE2MzU0MDQ4OTAxNDYsImZfa2IiOjAsImlwY19pZCI6W119; TS01b0be75=01538efd7ce8ea2a246c8b5e1bdd129245ce95d0f41a0b0c62325bbe3410d52dea89149fb763279a01fdd221b9822c4c36bb431af8; TS013ed49a=01538efd7c66f145888d372df9ab656c69769e7316588336899c4e0d86b3c29636b4e9dd9bcc3a0ca3010651bf784ff01ea10d5858; xptwg=3363220219:1E426F2D9A50810:4F7800C:3CD9A326:5AEC22D1:E33AD2E0:; akavpau_p2=1635405493~id=ce2ecdae4e46b1d1f9be326a31509ce6; bm_sv=20A1872D9062890012DF9D67CB2E3CAC~5sCzip0JkuNm51lVIdB4ROlDg2nEanONm+/42VqtXVrLqBIXFtj+dG/OfsfTwslMk3H76jNYonXFxs58WsK5560sLVA8KXWG7VGfU5o+mPHTxx4UWHtQBVC3X+++91RiOdntM+xlRgdPa9uorUxZ96KvqSrsuw6FqFa8HTTc3UI="
                },
                "referrer": "https://www.walmart.com/ip/Dixie-Disposable-Paper-Cup-Print-9-oz-50-count/935535882",
                "referrerPolicy": "strict-origin-when-cross-origin",
                "body": "{\"query\":\"query GetAllSellerOffers( $itemId:String! $postalAddress:PostalAddress $storeFrontIds:[StoreFrontId]){product( itemId:$itemId postalAddress:$postalAddress storeFrontIds:$storeFrontIds ){allOffers{offerId offerType availabilityStatus fulfillmentType fulfillmentBadge sellerId catalogSellerId sellerName sellerDisplayName sellerType wfsEnabled hasSellerBadge priceInfo{currentPrice{price priceString}unitPrice{price priceString}}returnPolicy{returnable freeReturns returnWindow{value unitType}}shippingOption{slaTier availabilityStatus accessTypes deliveryDate maxDeliveryDate shipPrice{price priceString}}}}}\",\"variables\":{\"itemId\":\"935535882\"}}",
                "method": "POST",
                "mode": "cors"
            });
            return productData.json();
        } catch (e) {
            console.log(e);
        }
    }
    const btnDiv = document.querySelector('div[class="center items-center flex flex-auto ph3 ph4-m overflow-hidden"]');
    const copyBtn = document.createElement("BUTTON")
    copyBtn.innerHTML = "copy to facebook";
    btnDiv.appendChild(copyBtn);

    copyBtn.addEventListener('click', async () => {

        //getting product data
        const price = document.querySelector('span[itemprop="price"]')?.innerHTML;
        const title = document.querySelector('h1[class="f3 b lh-copy dark-gray mt1 mb2"]')?.innerText

        const productData = {
            price,
            title
        }
        console.log(productData);

        // const productData = await getProductData();
        // console.log(productData);
        chrome.storage.local.set({'productData': productData});

        chrome.runtime.sendMessage({
            messageType: 'addToFb',
        });

    })
})();