const foodController = require('../server/controllers/foodControllers');

const req = {
  query: {
    q: 'beef',
  },
};

function asdf() {
  foodController.searchFoods(req);
}

asdf();
