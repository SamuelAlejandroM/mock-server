const express = require('express');

const app = express();

const PORT = 8081;


app.use(express.json());

function buildSeatBid(imps, seatBids){
    let seats = [];
    imps.forEach(imp => {
        seatBids.forEach((bidder, index) =>{
            seats.push({
                seat: bidder.seat,
                bid: JSON.parse(JSON.stringify(bidder.bid)),
            });
            seats[index].bid.forEach(bi =>{
                bi.impid = imp.id;
            });
        });
    });
    return seats;
}

app.post('/openrtb2/auction', (req, res) => {
    const impId = req.body.imp?.[0]?.id || "1";

    const bidResponse = {

        id: req.body.id || "mock-response-id",

        seatbid: buildSeatBid(req.body.imp, [

            {

                seat: "mockbidder",

                bid: [

                    {

                        id: "bid1",

                        impid: impId,

                        price: 1.23,

                        adm: "<div style='background:#f0f0f0;padding:10px;'>Mock Ad from Local Bidder</div>",

                        crid: "mock-creative-1",

                        adomain: ["mockbidder.com"]
                    },
                    {

                        id: "bid2",

                        impid: impId,

                        price: 1.32,

                        adm: "<div style='background:#f0f0f0;padding:10px;'>Mock Ad from Local Bidder</div>",

                        crid: "mock-creative-1",

                        adomain: ["mockbidder.com"]

                    },
                    {

                        id: "bid3",

                        impid: impId,

                        price: 9,

                        adm: "<div style='background:#f0f0f0;padding:10px;'>Mock Ad from Local Bidder</div>",

                        crid: "mock-creative-1",

                        adomain: ["mockbidder.com"]

                    },
                    {

                        id: "bid4",

                        impid: impId,

                        price: 1,

                        adm: "<div style='background:#f0f0f0;padding:10px;'>Mock Ad from Local Bidder</div>",

                        crid: "mock-creative-1",

                        adomain: ["mockbidder.com"]

                    }

                ]

            }

        ]),

        cur: "USD"

    };


    res.json(bidResponse);

});

app.post('/openrtb2/auction2', (req, res) => {
    console.log("lalalal2");
    const impId = req.body.imp?.[0]?.id || "1";

    const bidResponse = {

        id: req.body.id || "mock-response-id2",

        seatbid: buildSeatBid(req.body.imp, [

            {

                seat: "mybidder",

                bid: [

                    {

                        id: "bid1",

                        impid: impId,

                        price: 3,

                        adm: "<div style='background:#f0f0f0;padding:10px;'>Mock Ad from Local Bidder</div>",

                        crid: "mock-creative-1",

                        adomain: ["mybidder.com"]

                    },
                    {

                        id: "bid2",

                        impid: impId,

                        price: 5,

                        adm: "<div style='background:#f0f0f0;padding:10px;'>Mock Ad from Local Bidder</div>",

                        crid: "mock-creative-1",

                        adomain: ["mybidder.com"]

                    }
                ]

            }

        ]),

        cur: "USD"

    };


    res.json(bidResponse);

});

app.listen(PORT, () => {

    console.log(`🚀 Mock bidder listening on http://localhost:${PORT}/openrtb2/auction`);

});