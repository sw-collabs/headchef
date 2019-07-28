import uuidv4 from 'uuid/v4';
import recipe from './Recipe/recipe';
import './css/mainDisplay.css';


function render() {
  const node = document.createElement('div');
  node.id = uuidv4();
  node.classList.add('main-display-wrapper')


  // TODO: getAllRecipes() - make call to backend to get all recipe data
  // TODO: DELETE - For now will use a mock data structure
  const desc = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et ' +
    'dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
    'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur' +
    ' sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
  const recipes = {
    recipes: [
      {
        title: 'Sute-ki',
        description: desc,
        url: 'google.ca',
        imgSrc: 'https://i.cbc.ca/1.4491288.1516208229!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_780/cowboysteak.jpg',
        difficulty: 1,
        hasAllIngredients: true
      },
      {
        title: 'Spaghett',
        description: desc,
        url: 'tumblr.com',
        imgSrc: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/homemade-spaghetti-sauce-horizontal-1530890913.jpg?crop=1xw:1xh;center,top&resize=480:*',
        difficulty: 2,
        hasAllIngredients: true
      },
      {
        title: 'Fettuccine',
        description: desc,
        url: 'facebook.com',
        imgSrc: 'https://www.modernhoney.com/wp-content/uploads/2018/08/Fettuccine-Alfredo-Recipe-1.jpg',
        difficulty: 3,
        hasAllIngredients: false
      },
      {
        title: 'Chicken Parmesan',
        description: desc,
        url: 'netflix.com',
        imgSrc: 'https://www.skinnytaste.com/wp-content/uploads/2012/09/skinny-chicken-parmigiana-550x733.jpg',
        difficulty: 2,
        hasAllIngredients: false
      },
      {
        title: 'Pork Chop',
        description: desc,
        url: 'youtube.com',
        imgSrc: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.southernliving.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fimage%2F2017%2F01%2Fmain%2Fdinners-2504601_month_17187.jpg%3Fitok%3Dsbct6EBG&w=450&c=sc&poi=face&q=85',
        difficulty: 1,
        hasAllIngredients: false
      }
    ]
  };

  recipes['recipes'].forEach(data => {
    const gridElem = recipe.render(data);
    node.appendChild(gridElem);
  });

  return node;
}

export default {
  render
}
