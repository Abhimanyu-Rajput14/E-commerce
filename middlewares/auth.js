// Middleware to check if the user is logged in
module.exports.isLoggedIn = (req, res, next) => {
  try {
    // If the user is not authenticated
    if (!req.isAuthenticated?.()) {
      if (req.xhr) {
        // Send a 401 status with a JSON response for AJAX requests
        return res.status(401).json({
          success: false,
          message: 'Unauthorized user!'
        });
      }

      // For normal requests, flash an error message and redirect to login
      req.flash('error', 'Please Login!');
      return res.redirect('/login');
    }

    // If the user is authenticated, proceed to the next middleware
    next();
  } catch (err) {
    console.error('Error in isLoggedIn middleware:', err);
    res.status(500).send('Internal Server Error');
  }
}

// Middleware to check if the user has a seller role
module.exports.isSeller = (req, res, next) => {
  try {
    // If the user's role is not 'seller', redirect back with an error
    if (req.user?.role !== 'seller') {
      req.flash('error', 'Not Authorized!');
      return res.redirect('back');
    }

    // If the user is a seller, proceed to the next middleware
    next();
  } catch (err) {
    console.error('Error in isSeller middleware:', err);
    res.status(500).send('Internal Server Error');
  }
}
