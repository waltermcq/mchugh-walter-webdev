
var mongoose         = require('mongoose');
var RestaurantSchema = require('./restaurant.schema.server.js');
var RestaurantModel  = mongoose.model('RestaurantModel', RestaurantSchema);  // must be unique across app; DB collection name

RestaurantModel.createRest     = createRest;
RestaurantModel.findRestById   = findRestById;
RestaurantModel.findAllRest    = findAllRest;
RestaurantModel.findRestForUser = findRestForUser;
RestaurantModel.deleteRest     = deleteRest;
RestaurantModel.updateRest     = updateRest;

module.exports = RestaurantModel;

function createRest(userId, restaurant) {
    restaurant.user = userId;
    return RestaurantModel.create(restaurant);
}

function findRestById(restaurantId) {
    return RestaurantModel.findById(restaurantId);
}

function findAllRest() {
    return RestaurantModel.find();
}

function findRestForUser(userId) {
    return RestaurantModel.find({user: userId})
        .populate('user')
        .exec();
}

function deleteRest(restaurantId){
    return RestaurantModel.remove({_id: restaurantId});
}

function updateRest(restaurantId, restaurant){
    return RestaurantModel.update({_id: restaurantId}, {
        $set : {
            offer: restaurant.offer
        }
    });
}