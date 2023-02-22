const Insights = require('../models/insights.model');
const openConnection = require('../db/');
const mongoose = require('mongoose');
const Company = require('./../models/company.model');
const User = require('./../models/user.model');
const bcrypt = require('bcrypt');

const password = '1234';
const hashedPass = bcrypt.hashSync(password, 10);
const users = [
  {
    name: 'Jean-Luc',
    email: 'jl@mail.com',
    password: hashedPass,
  },
  {
    name: 'Lucie',
    email: 'll@mail.com',
    password: hashedPass,
  },
];

async function seedDatabase() {
  try {
    const db = await openConnection();
    await Company.deleteMany();
    await Insights.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.create(users);

    console.log(`Succesfully connected to ${db.connection.name} database.`);
    const createdCompanies = await Company.create(companies);
    console.log(createdCompanies);
    for (const review of insights) {
      const oneCompany = await Company.findOne({ name: review.company });
      await Insights.create({
        creator: randomUser(createdUsers),
        company: oneCompany._id,
        title: review.title,
        location: review.location,
        compensation: review.compensation,
        date: review.date,
        level: review.level,
        company_xp: review.company_xp,
        total_xp: review.total_xp,
        company_note: review.company_note,
        company_review: review.company_review,
      });
    }
    // const createdInsights = await Insights.create(insights);
    // console.log(`Created ${createdInsights.length} insights 🥸`);
    await mongoose.disconnect();
    console.log(`Succesfully disconnected from ${db.connection.name}`);
  } catch (error) {
    console.error(
      `Something went wrong while creating the seed: ${error.message}`
    );
  }
}

seedDatabase();

function randomUser(array) {
  return array[Math.floor(Math.random() * array.length)]._id;
}
const insights = [
  {
    company: '360Learning',
    title: 'Software engineer',
    location: 'Remote',
    compensation: 48000,
    date: '2021-07-01',
    level: 'Junior',
    company_xp: 0,
    total_xp: 2,
    company_note: 6,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: '360Learning',
    title: 'Software engineer',
    location: 'Remote',
    compensation: 48000,
    date: '2021-07-01',
    level: 'Junior',
    company_xp: 0,
    total_xp: 2,
    company_note: 5,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: '360Learning',
    title: 'Software engineer',
    location: 'Remote',
    compensation: 43000,
    date: '2021-02-08',
    level: 'Junior',
    company_xp: 0,
    total_xp: 2,
    company_note: 6,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'Sopra Banking Software',
    title: 'Software engineer',
    location: 'Paris',
    compensation: 75000,
    date: '2022-07-05',
    level: 'Senior',
    company_xp: null,
    total_xp: 18,
    company_note: 3,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: '360Learning',
    title: 'Software engineer',
    location: 'Remote',
    compensation: 55000,
    date: '2022-01-01',
    level: 'Intermediate',
    company_xp: 1,
    total_xp: 3,
    company_note: 6,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'Descartes Underwriting',
    title: 'Software engineer Scientific Engine (Python)',
    location: 'Paris',
    compensation: 46000,
    date: '2022-08-25',
    level: 'Intermediate',
    company_xp: 0,
    total_xp: 0,
    company_note: 9,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'Microsoft',
    title: 'Software engineer',
    location: 'Remote',
    compensation: 101000,
    date: '2021-04-15',
    level: 'Senior',
    company_xp: 2,
    total_xp: 12,
    company_note: 6,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'AWS',
    title: 'Software developement engineer',
    location: 'Paris',
    compensation: 60000,
    date: '2023-02-11',
    level: 'Intermediate',
    company_xp: 0,
    total_xp: 2,
    company_note: 5,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'Algolia',
    title: 'Backend Software Engineer',
    location: 'Paris',
    compensation: 65000,
    date: '2022-09-14',
    level: 'Senior',
    company_xp: 0,
    total_xp: 5,
    company_note: 7,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'Sogilis',
    title: 'Software engineer',
    location: 'Grenoble',
    compensation: 40600,
    date: '2022-08-30',
    level: 'Senior',
    company_xp: 2,
    total_xp: 8,
    company_note: 4,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'DIMO Software',
    title: 'Dev Java',
    location: 'Bidart',
    compensation: 34800,
    date: '2022-09-19',
    level: 'Junior',
    company_xp: 2,
    total_xp: 2,
    company_note: 6,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'SQUAD',
    title: 'Ingénieur DevOps',
    location: 'Paris',
    compensation: 50000,
    date: '2023-02-18',
    level: 'Intermediate',
    company_xp: 1,
    total_xp: 2,
    company_note: 7,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: 'Association 42',
    title: 'Administrateur système',
    location: 'Paris',
    compensation: 35000,
    date: '2022-09-22',
    level: 'Junior',
    company_xp: null,
    total_xp: 0,
    company_note: 6,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
  {
    company: "Economie d'Energie",
    title: 'Chef de projet IT ',
    location: 'Paris',
    compensation: 40000,
    date: '2023-02-13',
    level: 'Junior',
    company_xp: 3,
    total_xp: 3,
    company_note: 6,
    company_review:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Alias, dolorum.',
  },
];
const companies = [...new Set(insights.map((x) => x.company))].map((name) => ({
  name,
}));
console.log(companies);
