const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Parent = mongoose.model('Parent');

router.get('/', (req, res) => {
    res.render("parents/addOrEdit", {
        viewTitle: "Add  Parents Details"
    });
    });
router.get('/contact', (req, res) => {
    res.render("parents/contact", {
        viewTitle: "Here you contact parents"
    });
    });

router.post('/', (req, res) => {
    if (req.body._id == '')
    insertRecord(req, res);
    else
    updateRecord(req, res)
    });
    
    function insertRecord(req, res) {
        var parent = new Parent();
        parent.fullName = req.body.fullName;
        parent.email = req.body.email;
        parent.mobile = req.body.mobile;
        parent.city = req.body.city;
        parent.save((err, doc) => {
            if (!err)
                res.redirect('parents/list');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("parents/addOrEdit", {
                        viewTitle: "Add Parents Details",
                        parent: req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
    }
    function updateRecord(req, res) {
        Parent.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
            if (!err) { res.redirect('parents/list'); }
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("parents/addOrEdit", {
                        viewTitle: 'Update Parent Details',
                        parent: req.body
                    });
                }
                else
                    console.log('Error during record update : ' + err);
            }
        });
    }
    router.get('/list', (req, res) => {
        Parent.find((err, docs) => {
            if (!err) {
                res.render("parents/list", {
                    list: docs
                });
            }
            else {
                console.log('Error in retrieving parents list :' + err);
            }
        });
    });

    function handleValidationError(err, body) {
        for (field in err.errors) {
            switch (err.errors[field].path) {
                case 'fullName':
                    body['fullNameError'] = err.errors[field].message;
                    break;
                case 'email':
                    body['emailError'] = err.errors[field].message;
                    break;
                default:
                    break;
            }
        }
    }
    router.get('/:id', (req, res) => {
        Parent.findById(req.params.id, (err, doc) => {
            if (!err) {
                res.render("parents/addOrEdit", {
                    viewTitle: "Update Parent Details",
                    parent: doc
                });
            }
        });
    });
    router.get('/delete/:id', (req, res) => {
        Parent.findByIdAndRemove(req.params.id, (err, doc) => {
            if (!err) {
                res.redirect('/parents/list');
            }
            else { console.log('Error in deleting Parent record :' + err); }
        });
    });
    
    
module.exports = router;