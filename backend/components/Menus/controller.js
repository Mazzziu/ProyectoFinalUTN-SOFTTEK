const Model = require("./model");
const Mongoose = require("mongoose");
const ProductController = require("../Products/controller");

const saveMenu = (data) => {
    const { clientId, title, description, cover, categories } = data;

    let categoriesModify = categories.map((cat) => {
        let productsIds = cat.products.map((prod) => {
            let prodId = new Mongoose.Types.ObjectId();
            prod._id = prodId.toString();
            ProductController.saveProduct(prod);
            return prodId.toString();
        });
        return {
            title: cat.title,
            products: productsIds,
        };
    });

    const menu = new Model({
        clientId,
        title,
        description,
        cover,
        categories: categoriesModify,
    });

    return menu.save();
};

const findClientMenu = (clientId) => {
    return new Promise((resolve, reject) => {
        Model.find({ clientId: clientId })
            .populate("categories.products")
            .exec((err, populated) => {
                if (err) {
                    console.log("[Error message store]");
                    console.log(err);
                    reject(err);
                }
                resolve(populated);
            });
    });
};

const getMenu = (menuId) => {
    return new Promise((resolve, reject) => {
        Model.find({ _id: menuId })
            .populate("categories.products")
            .exec((err, populated) => {
                if (err) {
                    console.log("[Error message store]");
                    console.log(err);
                    reject(err);
                }
                resolve(populated);
            });
    });
};

module.exports = {
    saveMenu,
    findClientMenu,
    getMenu,
};
