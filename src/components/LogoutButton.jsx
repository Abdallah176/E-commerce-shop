import useAuthStore from "../store/useAuthStore"; // استخدام useAuthStore بدلاً من useShopStore

const LogoutButton = () => {
    const { logoutUser, isLoggedIn, user } = useAuthStore(); // استخدام store لعملية الخروج

    if (!isLoggedIn) return null; // إذا لم يكن المستخدم قد سجل الدخول، لا نعرض الزر

    return (
        <button onClick={logoutUser} className="text-sm text-red-600 underline">
            Logout ({user.username})
        </button>
    );
};

export default LogoutButton;
