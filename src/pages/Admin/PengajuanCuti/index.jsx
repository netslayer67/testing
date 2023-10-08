import { Button, Input } from '@material-tailwind/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const PengajuanCuti = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    employee: "",
    dateFrom: "",
    dateTo: "",
  });

  const handleChange = (event) => {
    const {value, name} = event.target;
    // console.log(name)
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  };
    return (
        <div className="p-3 w-full">
          <div className="bg-goldPrimary rounded-lg px-3 py-5 text-white font-semibold w-[90%] mx-auto">
            Pengajuan Cuti
          </div>
    
          <div className="mt-10 ">
            <div className="flex items-center gap-x-5">
              <Input
                type='date'
                variant="static"
                label="Tanggal Mulai"
                color="white"
                className="text-white font-semibold"
                placeholder="Tanggal Mulai"
                name="startDate"
              />
              <Input
                type='date'
                variant="static"
                label="Tanggal Akhir"
                color="white"
                className="text-white font-semibold"
                placeholder="Tanggal Akhir"
                name="endDate"
              />
            </div>
            <div className="mt-10 flex items-center">
              <Input
                type='text'
                variant="static"
                label="Deskripsi"
                color="white"
                className="text-white font-semibold"
                placeholder="Deskripsi"
                name="description"
              />
            </div>
            <div className="flex justify-end mt-7">
                <Button className="bg-goldPrimary">Submit</Button>
            </div>
          </div>
        </div>
      );
}

export default PengajuanCuti