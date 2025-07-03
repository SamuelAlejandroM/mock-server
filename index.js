const express = require('express');

const app = express();
const PORT = 8081;

app.use(express.json());


function randomPrice(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(2);
}

function buildSeatBid(imps, seatName) {
    let seats = [];

    imps.forEach((imp, index) => {
        const bidId = `bid-${seatName}-00${index+1}`;
        const price = randomPrice(0.5, 1.5);

        seats.push({
            seat: seatName,
            bid: [
                {
                    id: bidId,
                    impid: imp.id,
                    price: price,
                    nurl: `https://track.${seatName}.com/win?bid=${bidId}&price=\${AUCTION_PRICE}`,
                    adm: `<a href='https://track.${seatName}.com/click?bid=${bidId}&redirect=https%3A%2F%2Fadvertiser.com%2Flanding' target='_blank'>
<img src='https://cdn.${seatName}.com/banner-demo.jpg' width='${imp.w}' height='${imp.h}' alt='Ad from ${seatName}' style='border:0;display:block;'>
</a>`,
                    crid: `${seatName}-crea-123`,
                    adomain: [`${seatName}-demo.com`],
                    w: imp.w,
                    h: imp.h
                }
            ]
        });
    });

    return seats;
}

app.post('/openrtb2/auction', (req, res) => {
    const imps = req.body.imp || [{ id: "1", w: 300, h: 250 }];

    const bidResponse = {
        id: req.body.id || "req-123456",
        seatbid: buildSeatBid(imps, "bidmatic"),
        cur: "USD"
    };

    res.json(bidResponse);
});

app.listen(PORT, () => {
    console.log(`🚀 Mock bidder listening on http://localhost:${PORT}/openrtb2/auction`);
});
