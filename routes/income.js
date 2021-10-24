const express = require('express');
const db = require('../db');
const router = express.Router();

// form page for income
router.get('/add', (req, res) => {
    let session = req.session;
    if (session.userID) {
        res.render('income/add', {
            title: 'This is the create income page, you should make the form here'
        });
    } else {
        res.send('please log in')
    }
});

//To learn- why need to JSON stringify and Parse over at ejs
router.get('/view', (req, res) => {
    let session = req.session;
    if (!session.userID) {
        res.send('please log in');
    } else {
        let sql = `SELECT * FROM incomes WHERE userID = ${session.userID} ORDER BY created_at ASC`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            res.render('income/view', {
                result: result,
                name: session.username
            })
        })
    }
})

//INSERT income query
router.post('/save', (req, res) => {
    let randomNum = Math.random().toString(36).substr(2, 8);
    let data = {
        incomeID: randomNum,
        userID: req.session.userID,
        name: req.body.name,
        amount: req.body.amount,
        category: req.body.category,
        recurring_start_date: req.body.recurring_start_date,
        recurring_end_date: req.body.recurring_end_date,
        recurring: req.body.recurring == 1 ? 1 : 0
    }

    let sql = "INSERT INTO incomes SET ?";
    db.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('/income/view');
    });
});

//DELETE income query
router.get('/delete/:incomeID', (req, res) => {
    const userID = req.session.userID;
    const incomeID = req.params.incomeID;
    let sql = `DELETE FROM incomes WHERE userID = ${userID} AND incomeID = '${incomeID}'`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.redirect('/income/view');
    });
});

// Edit PAGE
router.get('/edit/:incomeID', (req, res) => {
    let session = req.session;
    if (!session.userID) {
        res.send('please log in');
    } else {
        const userID = session.userID;
        const incomeID = req.params.incomeID;
        let sql = `SELECT * FROM incomes
               WHERE userID = ${userID} AND incomeID = '${incomeID}'`;
        db.query(sql, (err, result) => {
            if (err) throw err;
            console.log(result[0])
            res.render('income/edit', {
                result: result
            });
        });
    }
});

// UPDATE income Query
router.post('/update/:incomeID', (req, res) => {
    let recurring_val = req.body.recurring;
    let data = {
        name: req.body.name,
        category: req.body.category,
        recurring: recurring_val == null? false : true,
        recurring_date: req.body.recurring_date
    }
    let session = req.session;
    const userID = session.userID;
    const incomeID = req.params.incomeID;
    let sql = `UPDATE incomes SET ? WHERE userID = ${userID} AND incomeID = ${incomeID}`
    db.query(sql, data, (err, result) => {
        if (err) throw err;
        res.redirect('/income/view');
    })
})

module.exports = router;
