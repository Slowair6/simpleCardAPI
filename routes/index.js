var express = require('express');
var router = express.Router();
var cards = require('./schemaCards');

/* GET home page. */
router.get('/update', function (req, res, next) {
    cards.findOne({card_number: req.query.card_number, card_type :req.query.card_type}, function (err, foundACC) {
        if (err) {
            
        } else {
            if (!foundACC) {
                console.log("ไม่พบบัตรดังกล่าว");
                var data = {success: false, detail: "ข้อมูลบัตรไม่ถูกต้อง"};
                res.json(data);
            } else {
                console.log("Data : ");
                console.log(foundACC);
                console.log("Attemp : ");
                console.log(req.query);
                if (foundACC.balance < req.query.amount) {
                    console.log("จำนวนเงินไม่เพียงพอ");
                    var data = {success: false, detail: "จำนวนเงินไม่เพียงพอ"};
                    res.json(data);
                } else if (foundACC.csc !== req.query.csc || foundACC.card_expire !== req.query.card_expire) {
                    console.log(foundACC.csc + " vs " + req.query.csc);
                    console.log(foundACC.card_expire + " vs " + req.query.card_expire);
                    console.log("ข้อมูลบัตรไม่ถูกต้อง");
                    var data = {success: false, detail: "ข้อมูลบัตรไม่ถูกต้อง"};
                    res.json(data);
                } else {
                    foundACC.balance = foundACC.balance - req.query.amount;
                    foundACC.save(function (err, updateObject) {
                        if (err) {
                            console.log(err);
                            res.status(500).send();
                        } else {
                            console.log('Updated coin amount');
                            var data = {success: true, detail: "ชำระเงินแล้ว"};
                            res.json(data);
                        }
                    });
                }
            }
        }
    });
});

module.exports = router;
