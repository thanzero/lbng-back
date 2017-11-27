module.exports = function (Model, bootOptions) {
    bootOptions = typeof bootOptions !== 'undefined' ? bootOptions : {};

    const options = Object.assign({
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        required: false,
        validateUpsert: false, // default to turning validation off
        silenceWarnings: false,
      }, bootOptions);
    // Model is the model class
    // options is an object containing the config properties from model definition
    Model.defineProperty(options.createdAt, { type: Date, default: '$now', required: options.required});
    Model.defineProperty(options.updatedAt, { type: Date, required: options.required});

    // Model.observe('before save', (ctx, next) => {
    //     if (ctx.options && ctx.options.skipUpdatedAt) { return next(); }
    //     if (ctx.instance) {
    //         ctx.instance[options.updatedAt] = new Date();
    //     } else {
    //         ctx.data[options.updatedAt] = new Date();
    //     }
    //     return next();
    // });
}