
var mongoose = require('mongoose');
var websiteSchema = require('./website.schema.server.js');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);  // UserModel must be unique across app; DB collection name

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website){
// Creates a new website instance for user whose _id is userId
    website._user = userId;
    return websiteModel
        .create(website);

}

function findAllWebsitesForUser(userId){
// Retrieves all website instances for user whose  _id is userId
    return websiteModel
        .find({_user: userId})                                        // "the closest thing Mongo has to a join"
        .populate("_user")                                          // this gets the user object instead of just holding a reference
        .exec();

}

function findWebsiteById(websiteId){
// Retrieves single website instance whose _id is websiteId
    return websiteModel
        .findById(websiteId);
}

function updateWebsite(websiteId, website){
// Updates website instance whose _id is websiteId
    return websiteModel.update({_id: websiteId}, {
        $set : {
            name:         website.name,
            description:  website.description
        }
    });
}

function deleteWebsite(websiteId){
// Removes website instance whose _id is websiteId
    return websiteModel.remove({_id: websiteId});
}

