const logOutController = async (req, res) => {
    req.session.destroy()

    res.render("plantillaDeslogeo.ejs")
}

export { logOutController }