import React from "react";
// import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Input,
  Button,
  Card,
  CardHeader,
  Typography,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  FolderIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/solid";
import { FaPaperPlane } from "react-icons/fa6";

export default function TabProfile() {
  // const navigate = useNavigate()

  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const [chatMessages, setChatMessages] = React.useState([
    { text: "", user: "user" },
  ]);

  const [pesan, setpesan] = React.useState("");
  const onChange = ({ target }) => setpesan(target.value);
  const data = [
    {
      label: "Garapan Saya",
      value: "cart",
      icon: FolderIcon,
    },
    {
      label: "Jadwalkan Konsultasi",
      value: "chat",
      icon: ChatBubbleLeftEllipsisIcon,
    },
  ];

  const cartItemCount = 1; // Jumlah item di keranjang
  // eslint-disable-next-line react/prop-types
  function Icon({ id, open }) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${
          id === open ? "rotate-180" : ""
        } h-5 w-5 transition-transform`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
        />
      </svg>
    );
  }

  return (
    <div className="bg-gray-300 py-8 mt-3">
      <div className="container mx-auto px-4">
        <Tabs value="cart">
          <TabsHeader className="mb-7">
            {data.map(({ label, value, icon }) => (
              <Tab key={value} value={value}>
                <div className="flex items-center gap-2">
                  {React.createElement(icon, { className: "w-5 h-5" })}
                  {label}
                </div>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody>
            {data.map(({ value, label }) => (
              <TabPanel key={value} value={value}>
                <div>
                  <p className="text-center font-semibold text-cyan-600 text-base">
                    {label} {value === "cart" ? `(${cartItemCount})` : ""}
                  </p>
                  {value === "cart" && (
                    <>
                      <Accordion
                        open={open === 1}
                        icon={<Icon id={1} open={open} />}
                      >
                        <AccordionHeader
                          onClick={() => handleOpen(1)}
                          className="font-Poppins"
                        >
                          History Penggarapan Pinjol
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="border-blue-gray-900 border-b-2 w-full mt-2">
                            <Card
                              color="transparent"
                              shadow={false}
                              className="px-2 w-full border-gray-100 border-b-2 rounded-none"
                            >
                              <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                              >
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="h5"
                                      color="blue-gray"
                                      className="font-mono"
                                    >
                                      Akulaku
                                    </Typography>
                                    <Typography>Rp.120.000</Typography>
                                  </div>
                                  <Typography color="blue-gray">
                                    Size:{" "}
                                    <span className="font-semibold">M</span>
                                  </Typography>
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                    >
                                      QTY:{" "}
                                      <span className="font-semibold">1</span>
                                    </Typography>
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                      >
                                        Status Penggarapan :
                                        <div className="flex items-center">
                                          <Chip
                                            variant="gradient"
                                            size="sm"
                                            color="green"
                                            value="Berhasil"
                                          />
                                        </div>
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                            <Card
                              color="transparent"
                              shadow={false}
                              className="px-2 w-full border-gray-100 border-b-2 rounded-none"
                            >
                              <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                              >
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="h5"
                                      color="blue-gray"
                                      className="font-mono"
                                    >
                                      Shopee Pinjam
                                    </Typography>
                                    <Typography>Rp.120.000</Typography>
                                  </div>
                                  <Typography color="blue-gray">
                                    Size:{" "}
                                    <span className="font-semibold">M</span>
                                  </Typography>
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                    >
                                      QTY:{" "}
                                      <span className="font-semibold">1</span>
                                    </Typography>
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                      >
                                        Status Penggarapan :
                                      </Typography>
                                      <div className="flex items-center">
                                        <Chip
                                          variant="gradient"
                                          size="sm"
                                          color="yellow"
                                          value="Dalam Penggarapan"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                            <Card
                              color="transparent"
                              shadow={false}
                              className="px-2 w-full border-gray-100 border-b-2 rounded-none"
                            >
                              <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                              >
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="h5"
                                      color="blue-gray"
                                      className="font-mono"
                                    >
                                      Kredivo
                                    </Typography>
                                    <Typography>Rp.120.000</Typography>
                                  </div>
                                  <Typography color="blue-gray">
                                    Size:{" "}
                                    <span className="font-semibold">M</span>
                                  </Typography>
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                    >
                                      QTY:{" "}
                                      <span className="font-semibold">1</span>
                                    </Typography>
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                      >
                                        Status Penggarapan :
                                      </Typography>
                                      <div className="flex items-center">
                                        <Chip
                                          variant="gradient"
                                          size="sm"
                                          color="red"
                                          value="Gagal"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          </div>
                        </AccordionBody>
                      </Accordion>
                      <Accordion
                        open={open === 2}
                        icon={<Icon id={2} open={open} />}
                      >
                        <AccordionHeader
                          onClick={() => handleOpen(2)}
                          className="font-Poppins"
                        >
                          History Pembackupan Data
                        </AccordionHeader>
                        <AccordionBody>
                          <div className="border-blue-gray-900 border-b-2 w-full mt-2">
                            <Card
                              color="transparent"
                              shadow={false}
                              className="px-2 w-full border-gray-100 border-b-2 rounded-none"
                            >
                              <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                              >
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="h5"
                                      color="blue-gray"
                                      className="font-mono"
                                    >
                                      Akulaku
                                    </Typography>
                                    <Typography>Rp.120.000</Typography>
                                  </div>
                                  <Typography color="blue-gray">
                                    Size:{" "}
                                    <span className="font-semibold">M</span>
                                  </Typography>
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                    >
                                      QTY:{" "}
                                      <span className="font-semibold">1</span>
                                    </Typography>
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                      >
                                        Status Penggarapan :
                                        <div className="flex items-center">
                                          <Chip
                                            variant="gradient"
                                            size="sm"
                                            color="green"
                                            value="Berhasil"
                                          />
                                        </div>
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                            <Card
                              color="transparent"
                              shadow={false}
                              className="px-2 w-full border-gray-100 border-b-2 rounded-none"
                            >
                              <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                              >
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="h5"
                                      color="blue-gray"
                                      className="font-mono"
                                    >
                                      Shopee Pinjam
                                    </Typography>
                                    <Typography>Rp.120.000</Typography>
                                  </div>
                                  <Typography color="blue-gray">
                                    Size:{" "}
                                    <span className="font-semibold">M</span>
                                  </Typography>
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                    >
                                      QTY:{" "}
                                      <span className="font-semibold">1</span>
                                    </Typography>
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                      >
                                        Status Penggarapan :
                                      </Typography>
                                      <div className="flex items-center">
                                        <Chip
                                          variant="gradient"
                                          size="sm"
                                          color="yellow"
                                          value="Dalam Penggarapan"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                            <Card
                              color="transparent"
                              shadow={false}
                              className="px-2 w-full border-gray-100 border-b-2 rounded-none"
                            >
                              <CardHeader
                                color="transparent"
                                floated={false}
                                shadow={false}
                                className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                              >
                                <div className="flex flex-col gap-2 w-full">
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="h5"
                                      color="blue-gray"
                                      className="font-mono"
                                    >
                                      Kredivo
                                    </Typography>
                                    <Typography>Rp.120.000</Typography>
                                  </div>
                                  <Typography color="blue-gray">
                                    Size:{" "}
                                    <span className="font-semibold">M</span>
                                  </Typography>
                                  <div className="flex items-center justify-between">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                    >
                                      QTY:{" "}
                                      <span className="font-semibold">1</span>
                                    </Typography>
                                    <div>
                                      <Typography
                                        variant="small"
                                        color="blue-gray"
                                      >
                                        Status Penggarapan :
                                      </Typography>
                                      <div className="flex items-center">
                                        <Chip
                                          variant="gradient"
                                          size="sm"
                                          color="red"
                                          value="Gagal"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </CardHeader>
                            </Card>
                          </div>
                        </AccordionBody>
                      </Accordion>
                    </>
                    // <div className='border-blue-gray-900 border-b-2 w-full mt-2'>
                    //     <Card color="transparent" shadow={false} className="px-2 w-full border-gray-100 border-b-2 rounded-none">
                    //         <CardHeader
                    //             color="transparent"
                    //             floated={false}
                    //             shadow={false}
                    //             className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                    //         >

                    //             <div className="flex flex-col gap-2 w-full">
                    //                 <div className="flex items-center justify-between">
                    //                     <Typography variant="h5" color="blue-gray" className="font-mono">
                    //                         Akulaku
                    //                     </Typography>
                    //                     <Typography>Rp.120.000</Typography>
                    //                 </div>
                    //                 <Typography variant="p" color="blue-gray" className="font-Poppins">
                    //                     Whirling Symphony
                    //                 </Typography>
                    //                 <Typography color="blue-gray">
                    //                     Size: <span className="font-semibold">M</span>
                    //                 </Typography>
                    //                 <div className="flex items-center justify-between">
                    //                     <Typography variant="small" color="blue-gray">
                    //                         QTY: <span className="font-semibold">1</span>
                    //                     </Typography>
                    //                     <div>
                    //                         <Typography variant="small" color="blue-gray">
                    //                             Status Penggarapan :
                    //                             <div className='flex items-center'>
                    //                                 <Chip variant="gradient" size="sm" color="green" value="Berhasil" />
                    //                             </div>
                    //                         </Typography>

                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </CardHeader>
                    //     </Card>
                    //     <Card color="transparent" shadow={false} className="px-2 w-full border-gray-100 border-b-2 rounded-none">
                    //         <CardHeader
                    //             color="transparent"
                    //             floated={false}
                    //             shadow={false}
                    //             className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                    //         >

                    //             <div className="flex flex-col gap-2 w-full">
                    //                 <div className="flex items-center justify-between">
                    //                     <Typography variant="h5" color="blue-gray" className="font-mono">
                    //                         Shopee Pinjam
                    //                     </Typography>
                    //                     <Typography>Rp.120.000</Typography>
                    //                 </div>
                    //                 <Typography variant="p" color="blue-gray" className="font-Poppins">
                    //                     Whirling Symphony
                    //                 </Typography>
                    //                 <Typography color="blue-gray">
                    //                     Size: <span className="font-semibold">M</span>
                    //                 </Typography>
                    //                 <div className="flex items-center justify-between">
                    //                     <Typography variant="small" color="blue-gray">
                    //                         QTY: <span className="font-semibold">1</span>
                    //                     </Typography>
                    //                     <div>
                    //                         <Typography variant="small" color="blue-gray">
                    //                             Status Penggarapan :
                    //                         </Typography>
                    //                         <div className='flex items-center'>
                    //                             <Chip variant="gradient" size="sm" color="yellow" value="Dalam Penggarapan" />
                    //                         </div>
                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </CardHeader>
                    //     </Card>
                    //     <Card color="transparent" shadow={false} className="px-2 w-full border-gray-100 border-b-2 rounded-none">
                    //         <CardHeader
                    //             color="transparent"
                    //             floated={false}
                    //             shadow={false}
                    //             className="mx-0 flex flex-col sm:flex-row items-center gap-4 pt-0 pb-4 sm:pb-8"
                    //         >

                    //             <div className="flex flex-col gap-2 w-full">
                    //                 <div className="flex items-center justify-between">
                    //                     <Typography variant="h5" color="blue-gray" className="font-mono">
                    //                         Kredivo
                    //                     </Typography>
                    //                     <Typography>Rp.120.000</Typography>
                    //                 </div>
                    //                 <Typography variant="p" color="blue-gray" className="font-Poppins">
                    //                     Whirling Symphony
                    //                 </Typography>
                    //                 <Typography color="blue-gray">
                    //                     Size: <span className="font-semibold">M</span>
                    //                 </Typography>
                    //                 <div className="flex items-center justify-between">
                    //                     <Typography variant="small" color="blue-gray">
                    //                         QTY: <span className="font-semibold">1</span>
                    //                     </Typography>
                    //                     <div>
                    //                         <Typography variant="small" color="blue-gray">
                    //                             Status Penggarapan :
                    //                         </Typography>
                    //                         <div className='flex items-center'>
                    //                             <Chip variant="gradient" size="sm" color="red" value="Gagal" />
                    //                         </div>

                    //                     </div>
                    //                 </div>
                    //             </div>
                    //         </CardHeader>
                    //     </Card>
                    // </div>
                  )}
                  {value === "chat" && (
                    <div className="flex justify-center mt-4">
                      <div className="relative flex w-full max-w-sm flex-col-reverse">
                        <div className="relative">
                          <Input
                            type="text"
                            label="Ketik Pesan"
                            value={pesan}
                            onChange={onChange}
                            className="pr-20"
                            containerProps={{
                              className: "min-w-0",
                            }}
                          />
                          <Button
                            size="sm"
                            color={pesan ? "blue" : "blue-gray"}
                            disabled={!pesan}
                            className="!absolute right-1 top-1 rounded-full"
                            onClick={() => {
                              if (pesan.trim() !== "") {
                                setChatMessages((prevMessages) => [
                                  ...prevMessages,
                                  {
                                    text: "Ada yang bisa dibantu?",
                                    user: "admin",
                                  },
                                  { text: pesan, user: "user" },
                                ]);
                                setpesan("");
                              }
                            }}
                          >
                            <FaPaperPlane />
                          </Button>
                        </div>
                        {chatMessages.map((message, index) => (
                          <div
                            key={index}
                            className={`${
                              message.user === "user"
                                ? "ml-auto bg-blue-200 text-black"
                                : "mr-auto bg-gray-200 text-black"
                            } p-2 rounded-md mb-2`}
                          >
                            {message.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </TabPanel>
            ))}
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}
