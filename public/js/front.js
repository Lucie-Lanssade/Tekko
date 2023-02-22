const userContainer = document.querySelector(".userContainer");
const companyInput = document.getElementById("company");
const titleInput = document.getElementById("title");
const locationInput = document.getElementById("location");
const compensationInput = document.getElementById("compensation");
const levelInput = document.getElementById("level");
const companyXpInput = document.getElementById("companyXp");
const noteInput = document.getElementById("note");
const totalXpInput = document.getElementById("totalXp");
const companyReviewInput = document.getElementById("companyReview");

const myUrl = "http://127.0.0.1:5005/insights";

//permet de nous renvoyer les cookies de l'utilisateur
axios.defaults.withCredentials = true;

function displayUser(element) {
  const cloneUser = template.content.cloneNode(true);
  //recuperer le nom de la compagnie pose probleme car on recupere que l'id ... trouver le moyen d'attendre l'objet de company
  cloneUser.querySelector(".userCompany span").textContent = element.company;
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
    console.log(data);
    userContainer.innerHTML = null;

    if (data) {
      for (const user of data) {
        //a voir si ca marche ou pas
        console.log(user);
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

document.querySelector("#createForm").addEventListener("submit", createUser);
