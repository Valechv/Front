import { useState, useRef, useLayoutEffect } from "react";

import SidebarDrawer from "../Sidebar/SidebarDrawer";

// import { Link } from "react-router-dom";

import Button from "../../shared/Button";
import useToggle from "../../../hooks/useToggle";
import { useAuth } from "../../../store/auth";

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useToggle();
  const [showMenuProfile, setShowMenuProfile] = useState(false);
  const { logoutAction } = useAuth();

  // const user = JSON.parse(localStorage.getItem("user")!);
  const refBtn = useRef<HTMLButtonElement>(null);
  const refImg = useRef(null);

  const showHide = () => {
    setShowMenuProfile(!showMenuProfile);
  };

  useLayoutEffect(() => {
    document.addEventListener("click", (e) => {
      const clic = e.target;
      if (
        clic !== refBtn.current &&
        showMenuProfile &&
        clic !== refImg.current
      ) {
        setShowMenuProfile(false);
      }
    });
  }, [refBtn.current, refImg.current, showMenuProfile]);

  return (
    <header className="sticky top-0 z-40 shadow">
      <SidebarDrawer isOpen={isOpen} onClose={onClose} />

      <nav className="flex justify-between gap-3 px-8 py-4 text-center bg-gray-100 dark:bg-gray-700">
        <div>
          <img src="/logo-bikerito.png" alt="" className="w-[60px]" />
        </div>
        <div className="flex gap-6 items-center ml-auto">
          {/* <ToggleTheme className="text-gray-500 dark:text-white" /> */}

          {/* <button className="text-gray-500 ">
            <Icon name="notification" className="w-4 h-6 dark:text-white" />
          </button> */}

          <div className="relative">
            <button
              type="button"
              className={`${
                showMenuProfile && "shadow-xl"
              }  h-8 w-8 rounded-full bg-primary text-white text-base flex items-center justify-center`}
              onClick={showHide}
              ref={refBtn}
            >
              {/* {user?.nombres.substring(0, 1).toUpperCase()} */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                className="fill-white"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>
            </button>

            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className={`${
                showMenuProfile ? "block" : "hidden"
              } absolute overflow-x-hidden w-80 h-max overflow-y-hidden font-semibold text-left -right-16 md:-right-4 top-14 rounded-md shadow-xl border bg-white font-sans`}
            >
              <ul className="p-4 text-base text-[#9ca3af]">
                {/* <li className="flex gap-2  items-center hover:text-primary hover:bg-white transition-all duration-300 mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={user?.foto || Avatar}
                      alt={user?.nombres}
                      className="block rounded-full h-24 w-24 object-cover"
                    />

                    <div>
                      <p className="text-[18px] text-black">{user?.nombres}</p>
                      <p className="text-[14px] text-[#777E89]">
                        {user?.tipoUsuario === 1 ? "Administrador" : "Vendedor"}
                      </p>

                      <div className="flex items-center gap-1">
                        <Icon name="email" />
                        <p className="text-[12px] text-[#777E89]">
                          {" "}
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </li> */}

                {/* <hr /> */}

                {/* <Link to="/editar-perfil">
                  <li
                    className="flex gap-2 py-5 items-center hover:text-primary hover:bg-white transition-all duration-300"
                    onClick={() => setShowMenuProfile(false)}
                  >
                    <div className="w-4 h-5 flex justify-center items-center">
                      <Icon name="user" />

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                    </div>
                    <p>Editar perfil</p>
                  </li>
                </Link> */}

                {/* <hr /> */}

                {/* <Link to="/update-password">
                  <li
                    className="flex gap-2 py-5  items-center hover:text-primary hover:bg-white transition-all duration-300 mb-3"
                    onClick={() => setShowMenuProfile(false)}
                  >
                    <div className="w-5 h-6 fill-current flex justify-center items-center">
                      <Icon name="lock" />
                    </div>
                    <p>Cambiar contraseña</p>
                  </li>
                </Link> */}

                <li>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={() => {
                      window.localStorage.removeItem("accessToken");
                      logoutAction();
                    }}
                  >
                    {/* <Icon name="right-from-bracket" className="icon-5" /> */}
                    Cerrar sesión
                  </Button>
                </li>
              </ul>
            </div>
          </div>

          <button
            className="justify-center bg-primary hover:bg-primary-800 transition-all duration-500  h-10 w-10 flex items-center   lg:hidden rounded-[6px] "
            onClick={onOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>

            {/* <Icon name="bars" className="w-4 h-4 text-white" /> */}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
