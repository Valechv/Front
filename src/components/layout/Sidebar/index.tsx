import useToggle from "../../../hooks/useToggle";
import { classNames } from "../../../utils/classNames";
import SidebarLink from "./SidebarLink";
import styles from "./sidebar.module.css";

interface Props {
  onClose: () => void;
  onToggle: () => void;
  mobile: boolean;
}

const Sidebar = ({ onClose, mobile = false }: Props) => {
  const { isOpen, onToggle } = useToggle(true);

  return (
    <div
      className={classNames([
        "relative h-full ease-out transition-all duration-300 overflow-hidden hover:w-[300px] z-50 shadow  hover:opacity-100",
        !mobile ? styles.sidebar : "",
        mobile
          ? "w-[300px]"
          : isOpen
          ? `w-[300px] ${styles.anchor} `
          : "w-[72px]",
      ])}
    >
      <div className="h-screen pb-20 overflow-scroll bg-gray-100 dark:bg-gray-700 scroll-smooth no-scrollbar ">
        <div className="flex items-center justify-center pt-4">
          <div className="pl-2 pr-5 flex w-full justify-between items-center">
            {/* <img className={`${styles.logo}`} src={Logo} /> */}

            {mobile ? (
              <button className="" onClick={onClose}>
                {/* <IconClose className="w-4 h-4" /> */}x
              </button>
            ) : (
              <div>
                <button className=" text-white" onClick={onToggle}>
                  {isOpen ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z" />
                    </svg>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        <p
          className={`px-5 mb-5 text-lg font-semibold leading-7 text-primary-600 ${styles.text}`}
        >
          Administrador
        </p>

        <div className="flex flex-col gap-2 px-4 pb-5">
          <SidebarLink
            onClick={onClose}
            name="Home"
            // icon="add"
            to="/"
            subMenu={{ value: false, paths: [] }}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
