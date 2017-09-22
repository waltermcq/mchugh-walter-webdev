
var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server.js');
var pageModel = mongoose.model('PageModel', pageSchema);  // UserModel must be unique across app; DB collection name

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.orderWidgetsForPage = orderWidgetsForPage;

module.exports = pageModel;

function createPage(websiteId, page){
    page._website = websiteId;
    return pageModel
        .create(page);
}

function findAllPagesForWebsite(websiteId){
    return pageModel
        .find({_website: websiteId})
        .populate("_website")                                          // this gets the user object instead of just holding a reference
        .exec();
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

function orderWidgetsForPage(pageId, index1, index2){
    //http://mongoosejs.com/docs/api.html#model_Model-save
    return pageModel
        .findById(pageId)
        .then( function(response){
            console.log(index1);
            console.log(index2);
            console.log(response.widgets);
            response.widgets.splice(index2, 0, response.widgets.splice(index1, 1)[0]);
            console.log(response.widgets);
            return response.save();                                                        // for some reason, pageModel.update won't work
        });
}
//orderWidgets