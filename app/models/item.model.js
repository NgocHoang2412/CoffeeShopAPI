module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            name : String,
            imageURL : String,
            defaultPrice : Number,
            unit : String,
            size : Object,
            description : String
        },
        {
            timestamps : true
        }
    );

    schema.method("toJSON", function(){
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });

    const Item = mongoose.model("item",schema);
    return Item;
};