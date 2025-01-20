module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 403;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });

};