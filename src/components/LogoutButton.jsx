import useAuthStore from "../store/useAuthStore"; 

const LogoutButton = () => {
    const { logoutUser, isLoggedIn, user } = useAuthStore(); 

    if (!isLoggedIn) return null;

    return (
        <button onClick={logoutUser} className="text-sm text-red-600 underline">
            Logout ({user.username})
        </button>
    );
};

export default LogoutButton;
