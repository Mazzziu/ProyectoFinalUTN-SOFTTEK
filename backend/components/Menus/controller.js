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

const deleteMenu = (menuId) => {
    return new Promise((resolve, reject) => {
        Model.find({ _id: menuId })
            .select("categories.products")
            .then((data) => {
                data[0].categories.map((cat) => {
                    cat.products.map(async (prod) => {
                        console.log(prod._id.toString());
                        await ProductController.deleteProd(prod._id.toString());
                    });
                });
                Model.deleteOne({ _id: menuId }).then((deleted) =>
                    resolve(deleted)
                );
            });
    });
};

module.exports = {
    saveMenu,
    findClientMenu,
    getMenu,
    deleteMenu,
};
