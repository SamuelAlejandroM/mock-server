const express = require('express');

const app = express();
const PORT = 8081;

app.use(express.json());


function randomPrice(min, max) {
    return +(Math.random() * (max - min) + min).toFixed(2);
}
function randomRequestId() {
    return 'req-' + Math.floor(100000 + Math.random() * 900000);
}
function buildSeatBid(imps, seatName) {
    let seats = [];

    const bids = imps.map((imp, index) => {
        const bidId = `bid-${seatName}-${Math.floor(1000 + Math.random() * 9000)}`;

        const price = randomPrice(0.5, 1.5);

        const width = imp.banner?.format?.[0]?.w || 300;
        const height = imp.banner?.format?.[0]?.h || 250;

        return {
            id: bidId,
            impid: imp.id,
            price: price,
            nurl: `https://track.${seatName}.com/win?bid=${bidId}&price=\${AUCTION_PRICE}`,
            adm: `<a href='https://track.${seatName}.com/click?bid=${bidId}&redirect=https%3A%2F%2Fadvertiser.com%2Flanding' target='_blank'>
<img src='https://cdn.${seatName}.com/banner-demo.jpg' width='${width}' height='${height}' alt='Ad from ${seatName}' style='border:0;display:block;'>
</a>`,
            crid: `${seatName}-crea-123`,
            adomain: [`${seatName}-demo.com`],
            w: width,
            h: height
        };
    });

    seats.push({
        seat: seatName,
        bid: bids
    });

    return seats;
}

app.post('/openrtb2/auction', (req, res) => {
    const imps = req.body.imp || [];

    const bidResponse = {
        id: randomRequestId(),
        seatbid: buildSeatBid(imps, "bidmatic"),
        cur: "USD"
    };

    res.json(bidResponse);
});

app.listen(PORT, () => {
    console.log(`🚀 Mock bidder listening on http://localhost:${PORT}/openrtb2/auction`);
});
