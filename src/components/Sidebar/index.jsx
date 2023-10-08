import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
} from "@material-tailwind/react";
import { InboxIcon } from "@heroicons/react/24/solid";
import { LogoMalahayati } from "../../config/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import { menuAdmin, menuJoki, menuSuperAdmin } from "../../utils/constant";

export default function Sidebar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };
  const menus = [
    {
      title: "Log Out",
      link: "#",
      icon: <InboxIcon className="w-5 h-5 text-red-500" />,
      onAction: handleLogout,
    },
  ];

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  const getMenusSidebar = () => {
    let menuMapping = [];

    if (user?.role?.name === "Admin") {
      menuMapping = menuAdmin;
    } else if (user?.role?.name === "Joki") {
      menuMapping = menuJoki;
    } else if (user?.role?.name === "Superadmin") {
      menuMapping = menuSuperAdmin;
    }

    return menuMapping?.map((item, idx) => (
      <ListItem key={idx} className="p-3" onClick={() => navigate(item.link)}>
        <Typography
          color="blue-gray"
          className="mr-auto font-normal text-white"
        >
          {item.name}
        </Typography>
      </ListItem>
    ));
  };

  return (
    <Card className="h-full w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-[#7D7D7D]">
      <div className="mb-2 flex items-center gap-4 p-4">
        <img src={LogoMalahayati} alt="brand" className="h-10 w-10" />
        <Typography variant="p" color="white" className="font-bold">
          {user?.role.name} Malahayati Consultant
        </Typography>
      </div>
      <List>
        {getMenusSidebar()}
        {/* <Accordion
                    open={open === 1}
                    icon={
                        <ChevronDownIcon
                            strokeWidth={2.5}
                            className={`mx-auto h-4 w-4 transition-transform ${
                                open === 1 ? 'rotate-180' : ''
                            }`}
                        />
                    }
                >
                    <ListItem className="p-3" selected={open === 1}>
                        <Typography
                            color="blue-gray"
                            className="mr-auto font-normal text-white"
                        >
                            Dashboard
                        </Typography>
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                Analytics
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                Reporting
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix>
                                    <ChevronRightIcon
                                        strokeWidth={3}
                                        className="h-3 w-5"
                                    />
                                </ListItemPrefix>
                                Projects
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion> */}
        <hr className="my-2 border-blue-gray-50" />
        {menus?.map((item, idx) => {
          return (
            <ListItem
              key={idx}
              className="text-red-500"
              onClick={() => item?.onAction()}
            >
              <ListItemPrefix>{item.icon}</ListItemPrefix>
              {item?.title}
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
}
