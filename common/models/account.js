'use strict';

module.exports = function (Account) {
    // send verification mail
    
    Account.afterRemote('create', function (context, account, next) {
        console.info('Account created successfully');
        var options = {
            type: 'email',
            to: account.email,
            from: 'noreply@rastemoh.ir',
            subject: 'Thanks for registering.',
            text: `Thanks for registration, Your name:${account.name} and email: ${account.email}. to verify your account please follow the link:`,
            redirect: '/verified', // it should be changed
            user: account,
            host: 'localhost'
        };
        
        console.info('Sending verification mail');
        account.verify(options, function (err, response) {
            if (err) {
                Account.deleteById(account.id);
                return next(err);
            }
            console.info('Email sent successfully');
        })
        next();
    })
};