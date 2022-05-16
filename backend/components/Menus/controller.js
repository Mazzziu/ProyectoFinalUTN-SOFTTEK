const Model = require("./model");

const saveMenu = (data) => {
    const { clientId, title, description, cover, categories } = data;

    const menu = new Model({
        clientId: clientId,
        title,
        description,
        cover,
        categories: categories,
    });

    return menu.save();
};

const findMenus = (clientId) => {
    return Model.find({ clientId: clientId });
};

module.exports = {
    saveMenu,
    findMenus,
};
