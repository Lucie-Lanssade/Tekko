//create
const userContainer = document.querySelector(".userContainer");
const idInput = document.querySelector(".idInput");
const companyInput = document.getElementById("company");
const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const compensationInput = document.getElementById("compensation");
const levelInput = document.getElementById("level");
const companyXpInput = document.getElementById("companyXp");
const noteInput = document.getElementById("note");
const totalXpInput = document.getElementById("totalXp");
const companyReviewInput = document.getElementById("companyReview");
//update
const idEdit = document.querySelector(".idEdit");
const companyEdit = document.querySelector(".companyEdit");
const titleEdit = document.querySelector(".titleEdit");
const locationEdit = document.querySelector(".locationEdit");
const compensationEdit = document.querySelector(".compensationEdit");
const levelEdit = document.querySelector(".levelEdit");
const companyXpEdit = document.querySelector(".companyXpEdit");
const noteEdit = document.querySelector(".noteEdit");
const totalXpEdit = document.querySelector(".totalXpEdit");
const companyReviewEdit = document.querySelector(".companyReviewEdit");

const myUrl = "http://127.0.0.1:5005/insights";

//permet de nous renvoyer les cookies de l'utilisateur
axios.defaults.withCredentials = true;

function displayUser(element) {
  const cloneUser = template.content.cloneNode(true);
  //recuperer le nom de la compagnie pose probleme car on recupere que l'id ... trouver le moyen d'attendre l'objet de company
  cloneUser.querySelector(".idInput span").textContent = element._id;
  cloneUser.querySelector(".userCompany span").textContent =
    element.company.name;
  cloneUser.querySelector(".userLocation span").textContent = element.location;
  cloneUser.querySelector(".userJob span").textContent = element.title;
  cloneUser.querySelector(".userCompensation span").textContent =
    element.compensation;
  cloneUser.querySelector(".userLevel span").textContent = element.level;
  cloneUser.querySelector(".userNote span").textContent = element.company_note;
  cloneUser.querySelector(".userXp span").textContent = element.total_xp;
  cloneUser.querySelector(".jobXp span").textContent = element.company_xp;
  cloneUser.querySelector(".userComment span").textContent =
    element.company_review;
  userContainer.append(cloneUser);
}

async function displayAll() {
  try {
    const { data } = await axios.get(myUrl + "/userInfos");
    userContainer.innerHTML = null;

    if (data) {
      for (const user of data) {
        //a voir si ca marche ou pas
        // console.log(user);
        displayUser(user);
      }
    } else {
      userContainer.textContent = "Oups... no result...";
    }
  } catch (error) {
    console.log(error);
  }
}

async function createUser(event) {
  event.preventDefault();
  const company = companyInput.value;
  const title = titleInput.value;
  const location = locationInput.value;
  const compensation = compensationInput.value;
  const level = levelInput.value;
  const company_xp = companyXpInput.value;
  const company_note = noteInput.value;
  const total_xp = totalXpInput.value;
  const company_review = companyReviewInput.value;

  const userCreate = {
    company,
    title,
    location,
    compensation,
    level,
    company_xp,
    company_note,
    total_xp,
    company_review,
  };
  try {
    const { data } = await axios.post(myUrl, userCreate);
    console.log(data);
    displayAll();
  } catch (error) {
    console.log(error);
  }
}

// UPDATE REVIEW

async function updateReview(e) {
  e.preventDefault();
  const id = idEdit.value;
  const company = companyEdit.value;
  const title = titleEdit.value;
  const location = locationEdit.value;
  const compensation = compensationEdit.value;
  const level = levelEdit.value;
  const company_xp = companyXpEdit.value;
  const company_note = noteEdit.value;
  const total_xp = totalXpEdit.value;
  const company_review = companyReviewEdit.value;
  const reviewEdit = {
    id,
    company,
    title,
    location,
    compensation,
    level,
    company_xp,
    company_note,
    total_xp,
    company_review,
  };

  try {
    const review = await axios.patch(
      myUrl + "/userInfos" + "/" + id,
      reviewEdit
    );
    console.log(review);
    // console.log(review);
    await displayAll();
  } catch (error) {
    console.log(error);
  }
}

displayAll();
document.querySelector("#createForm").addEventListener("submit", createUser);

document.getElementById("editBtn").addEventListener("submit", updateReview);
