import { useState } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import styles from "./sidebar.module.css";
import SubmenuLink from "./SubmenuLink";
import { SidebarLinkType } from "../../../interface";
import { classNames } from "../../../utils/classNames";

type Props = SidebarLinkType & { onClick?: () => void; mobile?: boolean };

const SidebarLink = ({ name, to, onClick, subMenu }: Props) => {
  const match = useMatch(to!);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div>
      <Link
        to={subMenu?.value ? location.pathname : to}
        className={`py-[12px] px-[12px] rounded-lg cursor-pointer text-center flex justify-between transition-all duration-300 ease-linear hover:bg-white hover:text-primary-500 ${
          !subMenu.value && match
            ? "bg-white text-primary"
            : "bg-transparent text-gray-400"
        } ${match ? "dark:bg-gray-700" : "dark:bg-transparent"}`}
        onClick={() => {
          if (subMenu.value === false && typeof onClick === "function") {
            onClick();
          }
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex items-center gap-3 ">
          {/* <Icon name={icon} className="icon-5" /> */}

          <p className={` text-base font-semibold ${styles.oculto}`}>{name}</p>
        </div>

        {subMenu.value && (
          <div
            className={`transition-all duration-500 ease-in-out flex justify-center items-center ${
              styles.oculto2
            }   ${isOpen ? "" : "rotate-180"}`}
          >
            {/* <Icon name="arrow-up" /> */}
          </div>
        )}
      </Link>

      {subMenu.value && isOpen ? (
        <div
          className={classNames([
            "flex md:hidden flex-col gap-2 py-2 w-full",
            styles.cerrar,
          ])}
        >
          {subMenu.paths
            .filter((path) => path.render)
            .map(({ name, to, path }) => (
              <SubmenuLink
                key={path}
                onClick={onClick}
                {...{ name, path, subMenu, to }}
              />
            ))}
        </div>
      ) : null}
    </div>
  );
};

export default SidebarLink;
