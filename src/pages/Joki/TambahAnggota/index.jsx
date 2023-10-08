import { Button, Input, input } from "@material-tailwind/react";
import { useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addAdminMember } from "../../../redux/reducers/tambahAnggotaAdminReducer";

const TambahAnggotaAdmin = () => {
  const [viewPassword, setViewPassword] = useState("password");
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    photo: null,
  });

  const handleChange = (event) => {
    const {value, name} = event.target;
    // console.log(name)
    setForm(prev => ({
      ...prev,
      [name]: name !== 'photo' ? value : event.target.files[0]
    }))
  };
  console.log(form)

  const handleSubmit = () => {
    const fileExtension = form.photo?.type.split('/')[1];
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("passwordConfirmation", form.passwordConfirmation);
    formData.append("photo", form.photo, `image.${fileExtension}`);
    console.log(formData)
    dispatch(addAdminMember(formData));
  }

  return (
    <div className="px-3 pb-10 w-full">
      <div className="bg-goldPrimary rounded-lg px-3 py-5 text-white font-semibold w-[90%] mx-auto">
        Tambah Anggota
      </div>

      <div className="mt-10 ">
        <Input
          variant="static"
          label="Nama"
          color="white"
          className="text-white font-semibold"
          placeholder="Nama"
          name="name"
          onChange={handleChange}
        />
        <div className="mt-10 flex items-center">
          <Input
            variant="static"
            label="Email"
            color="white"
            className="text-white font-semibold"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="mt-10 flex items-center">
          <Input
            type={viewPassword}
            variant="static"
            label="Password"
            color="white"
            className="text-white font-semibold"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <AiOutlineEye
            className="text-white text-lg cursor-pointer"
            onClick={() =>
              setViewPassword((prev) => (prev === "text" ? "password" : "text"))
            }
          />
        </div>
        <div className="mt-10 flex items-center">
          <Input
            type={viewPassword}
            variant="static"
            label="Konfirmasi Password"
            color="white"
            className="text-white font-semibold"
            placeholder="Konfirmasi Password"
            name="passwordConfirmation"
            onChange={handleChange}
          />
          <AiOutlineEye
            className="text-white text-lg cursor-pointer"
            onClick={() =>
              setViewPassword((prev) => (prev === "text" ? "password" : "text"))
            }
          />
        </div>
        <div className="mt-10 flex items-center">
          <Input
            type="file"
            accept="image/png, image/jpeg"
            variant="static"
            label="Foto"
            color="white"
            className="text-white font-semibold"
            placeholder="Foto"
            name="photo"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-end mt-7">
          <Button className="bg-goldPrimary" type="button" onClick={handleSubmit}>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default TambahAnggotaAdmin;
