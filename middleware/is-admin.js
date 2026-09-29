const isAdmin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect('/auth/sign-in')
    }

    if (req.session.user.role !== 'Admin') {
        return res.redirect('/materials')
    }

    next()
}

module.exports = isAdmin