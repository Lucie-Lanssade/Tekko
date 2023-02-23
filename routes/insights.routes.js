const router = require("express").Router();
const Insights = require("../models/insights.model");
const Company = require("../models/company.model");
const { ObjectId } = require("mongoose");
const { isSameUser, isLoggedIn } = require("../middlewares/route-guard");

/* GET  salaries page */
router.get("/", isLoggedIn, async (req, res, next) => {
  const allSalaries = await Insights.find().populate("company");
  // console.log(allSalaries);

  const companyName = await Insights.find({ name: Company.name });
  // console.log(companyName);

  res.render("salaries", {
    allSalaries,
    companyName,
    stylesheets: { stylesheets: ["salaries"] },
  });
});

//Get company page
router.get("/company", isLoggedIn, async (req, res, next) => {
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

    res.render("company", {
      allCompanies,
      oneCompany,
      reviews,
      globalNote,
      stylesheets: { stylesheets: ["company"] },
    });
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

router.get("/userInfos", isLoggedIn, async (req, res, next) => {
  try {
    // console.log(req.session.currentUser);
    let user = await Insights.find({
      creator: req.session.currentUser._id,
    }).populate("company");
    res.status(200).json(user);
    // console.log(user);
  } catch (error) {
    next(error);
  }
});

router.delete("/userInfos/:id", isLoggedIn, async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await Insights.findOne(id);
    if (!user) {
      return res.status(400).send("Invalid review id");
    }

    const deletedReview = await Insights.findByIdAndDelete(id);

    res.json({
      message: "Character deleted successfully",
      deletedReview,
    });
  } catch (error) {
    next(error);
  }
});

//update get
router.get("/:id/edit", isSameUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    let insightUpdate = await Insights.findById(id).populate("company");
    console.log(insightUpdate);
    res.render("updateReview", { insightUpdate });
  } catch (error) {
    next(error);
  }
});

//  * ? This route should update a insight(user) and respond with
//  * ? the updated insight(user)
//  */
router.post("/:id/edit", isLoggedIn, async (req, res, next) => {
  const id = req.params.id;
  const insightToUpdate = req.body;
  console.log(insightToUpdate);
  try {
    if (!insightToUpdate) {
      return res.json({ message: `review not found` });
    } else {
      const updateInsight = await Insights.findByIdAndUpdate(
        id,
        insightToUpdate,
        {
          new: true,
        }
        //ne marche pas pour le titre
      );
      console.log(updateInsight);
      res.redirect("/profile");
    }
  } catch (error) {
    next(error);
  }
});

//delete get
router.get("/:id/delete", isSameUser, async (req, res, next) => {
  const id = req.params.id;
  try {
    const deleteReview = await Insights.findByIdAndDelete(id);
    console.log(deleteReview);
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
