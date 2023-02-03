import express from 'express';
import { CallbackError } from 'mongoose';

import Survey from '../Models/survey';

import { UserDisplayName } from '../Util';

export function DisplaySurveyList(req: express.Request, res: express.Response, next: express.NextFunction)
{
    Survey.find(function(err, surveyCollection)
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        //show the edit view
        res.render('index', {title: 'Survey List', page: 'survey-list', surveys: surveyCollection, displayName: UserDisplayName(req)});
        //res.json({success: true, msg: 'Movie-List Displayed Successfully', movies: moviesCollection, user: req.user});
    });
}

export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  //renders the add survey page
<<<<<<< HEAD
  res.render('index', { title: 'Add survey', page: 'details', surveys:'', displayName: UserDisplayName(req) });
=======
  res.render('index', { title: 'Add survey', page: 'details', displayName: UserDisplayName(req) });
>>>>>>> 96a67d42b1c06c1d12cc59ec4e9eac87b7542db5
  //res.json({success: true, msg: 'Add Page Displayed Successfully!'});
}

export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the db and read the movie into the edit page
  Survey.findById(id,{}, {}, function(err, surveyToEdit){
    if(err)
    {
        console.log(err);
        res.end(err);
    }
    else{
        res.render('index', { title: 'Edit Survey', page: 'details', surveys: surveyToEdit, displayName: UserDisplayName(req) });
    // show the edit view with the data
<<<<<<< HEAD
=======
    //res.json({success: true, msg: 'Edit Page Displayed Successfully!', survey: surveyToEdit});
>>>>>>> 96a67d42b1c06c1d12cc59ec4e9eac87b7542db5
    }
  });
}

export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  // instantiate a new Movie to Add
  let newSurvey = new Survey
  ({
    "Title": req.body.surveyTitle,
    "Owner": req.body.surveyOwner,
    "isActive": req.body.surveyIsActive,
    "StartDate": req.body.surveyStartDate,
    "EndDate": req.body.surveyEndDate,
    "Array_Questions": req.body.surveyArrayQuestions
  });

  // Insert the new Movie object into the database (movies collection)
  Survey.create(newSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // new movie has been added -> refresh the movie-list
    res.redirect('/api/survey-list');
    })
}

export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // instantiate a new Movie to Edit
  let updatedSurvey = new Survey
  ({
    "_id": id,
    "Title": req.body.surveyTitle,
    "Owner": req.body.surveyOwner,
    "isActive": req.body.surveyIsActive,
    "StartDate": req.body.surveyStartDate,
    "EndDate": req.body.surveyEndDate,
    "Array_Questions": req.body.surveyArrayQuestions
  });

  // update the movie in the database
  Survey.updateOne({_id: id}, updatedSurvey, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // edit was successful -> go to the movie-list page
    res.redirect('/api/survey-list');
    });
}

export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
{
  let id = req.params.id;

  // pass the id to the database and delete the movie
  Survey.remove({_id: id}, function(err: CallbackError)
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    // delete was successful
    res.redirect('/api/survey-list');
    });
}