
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('pageModel', pageSchema);  // UserModel must be unique across app; DB collection name

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page){
    page._website = websiteId;
    return pageModel
        .create(page);
}

function findAllPagesForWebsite(websiteId){
    return pageModel
        .find({_website: websiteId});
}

function findPageById(pageId){
    return pageModel
        .findById(pageId);
}

function updatePage(pageId, page){
    return pageModel.update({_id: pageId}, {
        $set : {
            name:         page.name,
            title:        page.title,
            description:  page.description
        }
    });
}

function deletePage(pageId){
    return pageModel.remove({_id: pageId});
}

