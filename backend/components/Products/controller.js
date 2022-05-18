const Model = require("./model");

const saveProduct = (prod) => {
    const product = new Model({
        _id: prod._id,
        name: prod.name,
        description: prod.description,
        price: Number(prod.price),
        img: prod.img,
    });

    return product.save();
};
const getProduct = (id) => {
    return Model.find({ _id: id });
};

module.exports = {
    saveProduct,
    getProduct,
};
