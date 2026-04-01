import { Link } from "react-router-dom";
// import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Button } from "antd";
import { ThemeContext } from "../context/ThemeContext";
import { useAuthStore } from "../stores/useAuthStore";

export default function Navbar() {
  // const context = useContext(UserContext);
  // if (!context) return null;
  // const { user, setUser } = context;

  const themeContext = useContext(ThemeContext);
  if(!themeContext) return null;
  const {theme, toggleTheme} = themeContext;

  // const {user, setUser} = useAuthStore();
  // console.log(user);
  // const handleLogin = ()=>{
  //   setUser({name: "truong09", avatar: "https://upload.wikimedia.org/wikipedia/vi/3/39/First_dragon_ball_shounen_jump.jpg"});
  // }

  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="#" className="text-xl font-semibold">
          <strong>WEB2091 App</strong>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="#" className="hover:text-gray-200">
            Trang chủ
          </Link>
          <Link to="/list" className="hover:text-gray-200">
            Danh sách
          </Link>
          <Link to="/add" className="hover:text-gray-200">
            Thêm mới
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-2">
        {user ? (
            <>
              <span>{user.name}</span>
              <span className="text-sm">(Đã đăng nhập)</span>
              <Button onClick={logout}>Đăng xuất</Button>
            </>
          ) : (
            <>
              <span>Guest (Chưa đăng nhập)</span>
              <Link to="/login">
                <Button>Đăng nhập</Button>
              </Link>
              <Link to="/register">
                <Button>Đăng ký</Button>
              </Link>
            </>
          )}
            <Button onClick={toggleTheme}>
              {theme === "light" ? "☼" : "☽"}
            </Button>


        </div>
      </div>
    </nav>
  );
}