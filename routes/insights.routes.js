const router = require("express").Router();
const Insights = require("../models/insights.model");
const Company = require("../models/company.model");

/* GET  salaries page */
router.get("/", async (req, res, next) => {
  const allSalaries = await Insights.find().populate("company");
  // console.log(allSalaries);

  const companyName = await Insights.find({ name: Company.name });
  // console.log(companyName);

  res.render("salaries", { allSalaries, companyName });
});

//Get company page
router.get("/company", async (req, res, next) => {
  try {
    // console.log(req.query);
    let oneCompany = null;
    let reviews = null;
    let globalNote = null;
    const allCompanies = await Company.find();

    if (req.query.company) {
      oneCompany = await Company.findById(req.query.company);
      reviews = await Insights.find({ company: req.query.company });
      globalNote =
        reviews.reduce((acc, val) => {
          return acc + val.company_note;
        }, 0) / reviews.length;
    }

    res.render("company", { allCompanies, oneCompany, reviews, globalNote });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const reviewToCreate = { ...req.body };
    // console.log(reviewToCreate);

    let company = await Company.findOne({ name: reviewToCreate.company });
    if (!company) {
      company = await Company.create({ name: reviewToCreate.company });
    }
    const insight = await Insights.create({
      ...reviewToCreate,
      company: company._id,
      creator: req.session.currentUser._id,
    });
    // console.log("Insight: ", insight);
    res.status(200).json(insight);
  } catch (error) {
    next(error);
  }
});

router.get("/userInfos", async (req, res, next) => {
  try {
    console.log(req.session.currentUser);
    let user = await Insights.find({
      creator: req.session.currentUser._id,
    }).populate("company");
    res.status(200).json(user);
    // console.log(user);
  } catch (error) {
    next(error);
  }
});

//  * ? This route should update a insight(user) and respond with
//  * ? the updated insight(user)
//  */
router.patch("/userInfos/:id", async (req, res, next) => {
  const id = req.params.id;
  const insightToUpdate = req.body;

  try {
    if (!insightToUpdate) {
      return res.json({ message: `review not found` });
    } else {
      await Insights.findByIdAndUpdate(id, insightToUpdate, {
        new: true,
      });
      res.json({ message: `You're updating your review` });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
