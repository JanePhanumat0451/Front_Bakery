  // src/components/HomePage.js
  import { useEffect } from 'react'; // Only import necessary hooks
  import { Link, useNavigate } from 'react-router-dom'; // UseNavigate instead of useRouter
  import bakeryImage from '../assets/bakeryho2.jpg'; // Adjust the image path
  
  export default function HomePage() {
    const navigate = useNavigate(); // UseNavigate for routing
  
    // Function to check if logged in
    useEffect(() => {
      const isLoggedIn = localStorage.getItem("token");
      if (!isLoggedIn) {
        navigate("/login"); // Redirect to login page if not logged in
      }
    }, [navigate]); // Add navigate to dependency array
  
    return (
      <div className="min-h-screen bg-[#F5E6CC] p-8 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-[#8B4513]">
          Welcome to the Bakery!
        </h1>
        <img
          src={bakeryImage}
          alt="Bakery Banner"
          className="w-full h-auto object-contain mb-6 rounded-lg shadow-lg"
        />
  
        {/* Button to navigate to products page */}
        <Link to="/products">
          <button className="bg-[#D2691E] text-white py-3 px-6 rounded-lg hover:bg-[#A0522D] transition duration-300">
            Go to Cart
          </button>
        </Link>
      </div>
    );
  }
  