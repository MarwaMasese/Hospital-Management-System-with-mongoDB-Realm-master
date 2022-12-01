let mongoose = require("mongoose");
const Patient = require("../../models/patients/patient");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/home", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("home");
  } else {
    res.redirect("/");
  }
});

router.get("/add", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("add");
  } else {
    res.redirect("/");
  }
});

router.get("/find", (req, res) => {
  res.render("search");
});

router.get("/update", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("search", {
      option: "Upadte",
      buttonName: "Search",
      url: "update",
    });
  } else {
    res.redirect("/");
  }
});

router.get("/search", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("search", {
      option: "search",
      buttonName: "Search",
      url: "search",
    });
  } else {
    res.redirect("/");
  }
});

router.get("/delete", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("search", {
      option: "Delete",
      buttonName: "Delete",
      url: "delete",
    });
  } else {
    res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// Dash Board func!

router.get("/dashboard", (req, res) => {
  if (req.isAuthenticated()) { 
    Patient.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('dashboard', { Patients: result });
    })
    .catch(err => {
      console.log(err);
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
