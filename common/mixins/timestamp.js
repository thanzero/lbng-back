module.exports = function (Model, bootOptions) {
    Model.defineProperty('createdAt', {type: Date, default:'$now'})
    Model.defineProperty('updatedAt', {type: Date, default:'$now'})

    Model.observe('persist', function(ctx, next){
        if (ctx.currentInstance) {
            if (!ctx.isNewInstance) {
                ctx.currentInstance.updatedAt = new Date();
            }
        }
        next();
    })
}