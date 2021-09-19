const { application } = require('express');
const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
    scholarshipName: String,
    cgCriteria: String,
    mobileNo: String,
    AllowedStates: String,
    anualIncome: String,
    specialCriteria: String,
    attachedDcuments: String,
    scholarshipOfficialWebsite: String,
    applicationDate: { type: Date, default: Date.now }
});

module.exports = scholarshipSchema = mongoose.model('schSch', scholarshipSchema);