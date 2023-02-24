//create
const userContainer = document.querySelector('.userContainer');
const companyInput = document.getElementById('company');
const titleInput = document.getElementById('title');
const locationInput = document.getElementById('location');
const compensationInput = document.getElementById('compensation');
const levelInput = document.getElementById('level');
const companyXpInput = document.getElementById('companyXp');
const noteInput = document.getElementById('note');
const totalXpInput = document.getElementById('totalXp');
const companyReviewInput = document.getElementById('companyReview');
//update
const idEdit = document.getElementById('idEdit');
const companyEdit = document.getElementById('companyEdit');
const titleEdit = document.getElementById('titleEdit');
const locationEdit = document.getElementById('locationEdit');
const compensationEdit = document.getElementById('compensationEdit');
const levelEdit = document.getElementById('levelEdit');
const companyXpEdit = document.getElementById('companyXpEdit');
const noteEdit = document.getElementById('noteEdit');
const totalXpEdit = document.getElementById('totalXpEdit');
const companyReviewEdit = document.getElementById('companyReviewEdit');
const formCreateMsg = document.querySelector('.form-create');
const btnDelete = document.getElementById('btnDelete');

// const myUrl = 'http://127.0.0.1:5005/insights';
const myUrl = 'https://tekko.onrender.com/insights';

//permet de nous renvoyer les cookies de l'utilisateur
axios.defaults.withCredentials = true;

function displayUser(element) {
  const cloneUser = template.content.cloneNode(true);
  //recuperer le nom de la compagnie pose probleme car on recupere que l'id ... trouver le moyen d'attendre l'objet de company

  cloneUser.querySelector('.userCompany span').textContent =
    element.company.name;
  cloneUser.querySelector('.userLocation span').textContent = element.location;
  cloneUser.querySelector('.userJob span').textContent = element.title;
  cloneUser.querySelector('.userCompensation span').textContent =
    element.compensation;
  cloneUser.querySelector('.userLevel span').textContent = element.level;
  cloneUser.querySelector('.userNote span').textContent = element.company_note;
  cloneUser.querySelector('.userXp span').textContent = element.total_xp;
  cloneUser.querySelector('.jobXp span').textContent = element.company_xp;
  cloneUser.querySelector('.userComment span').textContent =
    element.company_review;
  cloneUser.querySelector('.UpdateBtn').href = `/insights/${element._id}/edit`;
  cloneUser.querySelector(
    '.btnDelete'
  ).href = `/insights/${element._id}/delete`;
  userContainer.append(cloneUser);
}

async function displayAll() {
  try {
    const { data } = await axios.get(myUrl + '/userInfos');
    userContainer.innerHTML = null;

    if (data) {
      for (const user of data) {
        //a voir si ca marche ou pas
        // console.log(user);
        displayUser(user);
      }
    } else {
      userContainer.textContent = 'Oups... no result...';
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
    const msg = document.createElement('p');
    msg.style.color = 'green';
    msg.innerHTML = 'Congrats ! Your review is now created ! ';
    formCreateMsg.appendChild(msg);
  } catch (error) {
    console.log(error);
  }
}

// UPDATE REVIEW

async function updateReview(event) {
  event.preventDefault();
  const id = idEdit.value;
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
    const review = await axios.patch(myUrl + '/userInfos/' + id, reviewEdit);
    console.log(review);
    await displayAll();
  } catch (error) {
    console.log(error);
  }
}

//DELETE
// document
//   .getElementById("delete-one")
//   .addEventListener("click", async function () {
//     let idInput = idDelete.value;
//     try {
//       const deleteCharacter = await axios.delete(
//         myUrl + "/userInfos/" + `${idInput}`
//       );
//       console.log(deleteCharacter, "has been deleted");
//       displayAll();
//     } catch (error) {
//       console.log(error);
//     }
//   });

displayAll();
document.querySelector('#createForm').addEventListener('submit', createUser);
