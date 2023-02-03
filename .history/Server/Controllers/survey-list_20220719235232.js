"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessDeletePage = exports.ProcessEditPage = exports.ProcessAddPage = exports.DisplayEditPage = exports.DisplayAddPage = exports.DisplaySurveyList = void 0;
const survey_1 = __importDefault(require("../Models/survey"));
const Util_1 = require("../Util");
function DisplaySurveyList(req, res, next) {
    survey_1.default.find(function (err, surveyCollection) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.render('index', { title: 'Survey List', page: 'survey-list', surveys: surveyCollection, displayName: (0, Util_1.UserDisplayName)(req) });
    });
}
exports.DisplaySurveyList = DisplaySurveyList;
function DisplayAddPage(req, res, next) {
    res.render('index', { title: 'Add survey', page: 'details', surveys:'',displayName: (0, Util_1.UserDisplayName)(req) });
}
exports.DisplayAddPage = DisplayAddPage;
function DisplayEditPage(req, res, next) {
    let id = req.params.id;
    survey_1.default.findById(id, {}, {}, function (err, surveyToEdit) {
        if (err) {
            console.log(err);
            res.end(err);
        }
        else {
            res.render('index', { title: 'Edit Survey', page: 'details', surveys: surveyToEdit, displayName: (0, Util_1.UserDisplayName)(req) });
        }
    });
}
exports.DisplayEditPage = DisplayEditPage;
function ProcessAddPage(req, res, next) {
    let newSurvey = new survey_1.default({
        "Title": req.body.surveyTitle,
        "Owner": req.body.surveyOwner,
        "isActive": req.body.surveyIsActive,
        "StartDate": req.body.surveyStartDate,
        "EndDate": req.body.surveyEndDate,
        "Array_Questions": req.body.surveyArrayQuestions
    });
    survey_1.default.create(newSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/api/survey-list');
    });
}
exports.ProcessAddPage = ProcessAddPage;
function ProcessEditPage(req, res, next) {
    let id = req.params.id;
    let updatedSurvey = new survey_1.default({
        "_id": id,
        "Title": req.body.surveyTitle,
        "Owner": req.body.surveyOwner,
        "isActive": req.body.surveyIsActive,
        "StartDate": req.body.surveyStartDate,
        "EndDate": req.body.surveyEndDate,
        "Array_Questions": req.body.surveyArrayQuestions
    });
    survey_1.default.updateOne({ _id: id }, updatedSurvey, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/api/survey-list')
    });
}
exports.ProcessEditPage = ProcessEditPage;
function ProcessDeletePage(req, res, next) {
    let id = req.params.id;
    survey_1.default.remove({ _id: id }, function (err) {
        if (err) {
            console.error(err);
            res.end(err);
        }
        res.redirect('/api/survey-list');
    });
}
exports.ProcessDeletePage = ProcessDeletePage;
//# sourceMappingURL=survey-list.js.map