
import recipe from './Recipe/recipe';
import Element from 'Element';
import './css/mainDisplay.css';
import instruction from "./Instruction/instruction";

// TODO: getAllRecipes() - make call to backend to get all recipe data
// TODO: DELETE - For now will use a mock data structure
const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
  'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
  'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
  ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
const _instructions = `<ol>
                        <li>Warm water</li>
                        <li>Boil it</li>
                        <li>Cut up some tomatoes</li>
                        <li>Cut up some olives</li>
                        <li>Cut garlic</li>
                        <li>Put all in pan on high heat</li>
                        <li>Add olive oil</li>
                        <li>Mash up the potatoes</li>
                        <li>You done!!</li>
                       </ol>`;
const _ingredients = ['1 cup tomato sauce', '1000 spaghetti noodles', '1/2 cup olive oil'];
const recipes = {
  recipes: [
    {
      title: 'Sute-ki',
      url: 'https://google.ca',
      imgSrc: 'https://i.cbc.ca/1.4491288.1516208229!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/cowboysteak.jpg',
      hasAllIngredients: true,
      info: {
        description: desc,
        prepTime: '10 minutes',
        totalTime: '30 minutes',
        difficulty: 'Amateur',
        cuisine: 'Italian'
      },
      instructions: _instructions
    },
    {
      title: 'Spaghett',
      url: 'https://tumblr.com',
      imgSrc: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg?crop=1xw:1xh;center,top&resize=480:*',
      difficulty: 2,
      hasAllIngredients: true,
      info: {
        description: desc,
        prepTime: '10 minutes',
        totalTime: '30 minutes',
        difficulty: 'Amateur',
        cuisine: 'Italian'
      },
      instructions: _instructions
    },
    {
      title: 'Fettuccine',
      url: 'https://facebook.com',
      imgSrc: 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg',
      hasAllIngredients: false,
      info: {
        description: desc,
        prepTime: '10 minutes',
        totalTime: '30 minutes',
        difficulty: 'Amateur',
        cuisine: 'Italian'
      },
      instructions: _instructions
    },
    {
      title: 'Chicken Parmesan',
      url: 'https://netflix.com',
      imgSrc: 'https://www.skinnytaste.com/wp-content/uploads/2012/09/skinny-chicken-parmigiana-550x733.jpg',
      hasAllIngredients: false,
      info: {
        description: desc,
        prepTime: '10 minutes',
        totalTime: '30 minutes',
        difficulty: 'Amateur',
        cuisine: 'Italian'
      },
      instructions: _instructions
    },
    {
      title: 'Pork Chop',
      url: 'youtube.com',
      imgSrc: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2017%2F01%2Fmain%2Fdinners-2504601_month_17187.jpg%3Fitok%3Dsbct6EBG&w=450&c=sc&poi=face&q=85',
      difficulty: 1,
      hasAllIngredients: false,
      info: {
        description: desc,
        prepTime: '10 minutes',
        totalTime: '30 minutes',
        difficulty: 'Amateur',
        cuisine: 'Italian'
      },
      instructions: _instructions

    }
  ]
};

function renderRecipes() {
  let result = [];
  for (let i = 0; i < recipes['recipes'].length; i++) {
    const data = recipes['recipes'][i];
    result.push(Element()
      .withClass('grid-item')
      .withChildren(recipe(data)));

    if (i % 3 === 2 || i === (recipes['recipes'].length - 1)) {
      result.push(instruction(data))
    }
  }


  return result;
}

export default function mainDisplay() {
  return Element()
    .withClass('main-display-wrapper')
    .withChildren(...renderRecipes());
}
