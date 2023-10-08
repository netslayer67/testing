import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import "./App.css";
import Layout from "./layout/Layout";
import MainSuperAdmin from "./pages/SuperAdmin/MainSuperAdmin";
import MainAdmin from "./pages/Admin/MainAdmin";
import NasabahAdmin from "./pages/Admin/NasabahAdmin";
import AnggotaJoki from "./pages/Admin/AnggotaJoki";
import TambahAnggotaAdmin from "./pages/Admin/TambahAnggota";
import PengajuanCuti from "./pages/Admin/PengajuanCuti";
import DetailFap from "./pages/Admin/DetailFap";
import DataTugas from "./pages/Joki/DataTugas";
import MainJoki from "./pages/Joki/MainJoki";
import DetailFapJoki from "./pages/Joki/DetailFapJoki";
import Nothing from "./pages/Nothing";
import DataAdmin from "./pages/SuperAdmin/DataAdmin";
import DetailFapSuperAdmin from "./pages/SuperAdmin/DetailAdmin";

function App() {
  const ROLE_CONSTANT = {
    USER: "USER",
    SUPER_ADMIN: "SUPER_ADMIN",
    ADMIN: "ADMIN",
    JOKI: "JOKI",
  };
  return (
      <Routes>
        <Route path="/profile" element={<Profile />} />
        {/* USER */}
        <Route
          path="/"
          element={
            <Layout role={ROLE_CONSTANT.USER}>
              <Landing />
            </Layout>
          }
        />
        {/* END USER */}

          {/* SUPER ADMIN */}
          <Route
            path="dashboard"
            element={
              <Layout role={ROLE_CONSTANT.SUPER_ADMIN}>
                <MainSuperAdmin />
              </Layout>
            }
          />
          {/* END SUPER ADMIN */}

          {/* ADMIN */}
          <Route
            path="dashboard/admin/profile"
            element={
              <Layout role={ROLE_CONSTANT.ADMIN}>
                <MainAdmin />
              </Layout>
            }
          />
          <Route
            path="dashboard/admin/nasabah"
            element={
              <Layout role={ROLE_CONSTANT.ADMIN}>
                <NasabahAdmin />
              </Layout>
            }
          />
          <Route
            path="dashboard/admin/anggota-joki"
            element={
              <Layout role={ROLE_CONSTANT.ADMIN}>
                <AnggotaJoki />
              </Layout>
            }
          />
          <Route
            path="dashboard/admin/tambah-anggota"
            element={
              <Layout role={ROLE_CONSTANT.ADMIN}>
                <TambahAnggotaAdmin />
              </Layout>
            }
          />
          <Route
            path="dashboard/admin/pengajuan-cuti"
            element={
              <Layout role={ROLE_CONSTANT.ADMIN}>
                <PengajuanCuti />
              </Layout>
            }
          />
          <Route
            path="dashboard/admin/detail-fap/:id"
            element={
              <Layout role={ROLE_CONSTANT.ADMIN}>
                <DetailFap />
              </Layout>
            }
          />
          {/* END ADMIN */}

          {/* JOKI */}
          <Route
            path="dashboard/joki/profile"
            element={
              <Layout role={ROLE_CONSTANT.JOKI}>
                <MainJoki />
              </Layout>
            }
          />
          <Route
            path="dashboard/joki/detail/:id"
            element={
              <Layout role={ROLE_CONSTANT.JOKI}>
                <DetailFapJoki />
              </Layout>
            }
          />
          <Route
            path="dashboard/joki/data-tugas"
            element={
              <Layout role={ROLE_CONSTANT.JOKI}>
                <DataTugas />
              </Layout>
            }
          />
          {/* END JOKI */}

          {/* SUPER ADMIN */}
          <Route
            path="dashboard/super-admin/profile"
            element={
              <Layout role={ROLE_CONSTANT.SUPER_ADMIN}>
                <MainSuperAdmin />
              </Layout>
            }
          />
          <Route
            path="dashboard/super-admin/data-admin"
            element={
              <Layout role={ROLE_CONSTANT.SUPER_ADMIN}>
                <DataAdmin />
              </Layout>
            }
          />
          <Route
            path="dashboard/super-admin/detail/:id"
            element={
              <Layout role={ROLE_CONSTANT.SUPER_ADMIN}>
                <DetailFapSuperAdmin />
              </Layout>
            }
          />
          {/* END SUPER ADMIN */}

          <Route path="*" element={<Nothing />} />
      </Routes>
  );
}

export default App;
