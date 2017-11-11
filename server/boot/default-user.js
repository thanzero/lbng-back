module.exports = function (app) {
    let Role = app.models.Role;
    let Account = app.models.Account;
    let RoleMapping = app.models.RoleMapping;

    Account.find({ where: { "email": "admin@example.com" } }, function (err, accounts) {
        if (err) {
            console.error(err);
        }
        // console.log('found account(s)', accounts);
        if (accounts && accounts.length) {
            console.info('admin account already exist')
        } else {
            console.info('creating admin account');
            Account.create({
                name: 'Admin',
                email: 'admin@example.com',
                username: 'admin',
                password: '123',
                emailVerified: true
            }, function (err, admin) {
                if (err) throw err;

                console.info('Admin created:', admin);

                Role.create({
                    name: 'Admin'
                }, function (err, role) {
                    if (err) throw err;
                    console.log('Created role:', role);

                    role.principals.create({
                        principalType: RoleMapping.USER,
                        principalId: admin.id
                    }, function (err, principal) {
                        if (err) throw err;

                        console.log('Created principal:', principal);
                    })
                })

            })
        }
    });

    Role.find({ where: { name: 'Manager' } }, function (err, roles) {
        if (err) {
            console.err(err);
        }
        if (!roles || !roles.length) { // is it already created?
            // create the role
            Role.create({
                name: 'Manager'
            }, function (err) {
                if (err) {
                    console.error(err);
                }
            })
        }
    })

}