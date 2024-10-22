// Listen for any click event on the document
document.addEventListener('click', (e) => {
    const button = e.target;
    
    // If the clicked element is a 'like' button, proceed
    if (button.classList.contains('like-btn')) {
        const productId = e.target.getAttribute('productId'); // Get the associated product ID
        addOrRemoveFromWishlist(productId, button); // Call function to toggle wishlist status
    }
});

// Function to handle adding/removing products from the wishlist
async function addOrRemoveFromWishlist(productId, button) {
    try {
        // Send a request to the server to toggle wishlist status
        const res = await axios.post(`https://e-commerce-967m.onrender.com/wishList/${productId}`, {}, {
            headers: { 'X-Requested-With': 'XMLHttpRequest' } // Necessary for handling AJAX requests
        });

        // If the request is successful, toggle the icon between 'solid' and 'regular'
        if (res.data.success) {
            if (button.classList.contains('fa-solid')) {
                button.classList.remove('fa-solid');
                button.classList.add('fa-regular');
            } else {
                button.classList.remove('fa-regular');
                button.classList.add('fa-solid');
            }
        }
    } catch (error) {
        // Check if the error is due to the user being unauthenticated (401 status code)
        if (error.response && error.response.status === 401) {
            alert('You need to be logged in first to manage your wishlist.');
            // Optionally redirect to the login page
            window.location.replace('/login');
        } else {
            console.log(error); // Log any other errors
        }
    }
}
