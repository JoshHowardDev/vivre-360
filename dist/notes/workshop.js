var foodController = require('../server/controllers/foodControllers');
var req = {
    query: {
        q: 'beef',
    },
};
function asdf() {
    foodController.searchFoods(req);
}
asdf();
