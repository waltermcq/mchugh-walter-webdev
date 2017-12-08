
var mongoose         = require('mongoose');
var restaurantSchema = require('./restaurant.schema.server.js');
var restaurantModel  = mongoose.model('RestaurantModel', restaurantSchema);  // must be unique across app; DB collection name

restaurantModel.createRest      = createRest;
restaurantModel.findRestById    = findRestById;
restaurantModel.findAllRest     = findAllRest;
restaurantModel.findRestForUser = findRestForUser;
restaurantModel.deleteRest      = deleteRest;
restaurantModel.updateRest      = updateRest;

module.exports = restaurantModel;

function createRest(restaurantId, restaurant) {
    restaurant.restaurantId = restaurantId;
    return restaurantModel.create(restaurant);
}

function findRestById(restaurantId) {
    return restaurantModel.findById(restaurantId);
}

function findAllRest() {
    return restaurantModel.find();
}

function findRestForUser(userId) {
    return restaurantModel.findOne({user: userId});
        // .populate('user')
        // .exec();
}

function deleteRest(restaurantId){
    return restaurantModel.remove({_id: restaurantId});
}

function updateRest(restaurantId, restaurant){
    return restaurantModel.update({_id: restaurantId}, {
        $set : {
            offer: restaurant.offer
        }
    });
}