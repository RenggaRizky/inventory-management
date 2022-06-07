import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Produk from "./pages/produk";
import Merek from "./pages/merek";
import JenisBarang from "./pages/jenis-barang";
import Laporan from "./pages/laporan";
import Supplier from "./pages/supplier";
import TambahSupplier from "./pages/supplier/tambah-supplier";
import TableDataSupplier from "./pages/supplier/table-supplier";
import Container from "./layouts/container";
import MainContent from "./layouts/main";
import Wrapper from "./layouts/wrapper";
import EditSupplier from "./pages/supplier/edit-supplier";
import TableDataMerek from "./pages/merek/table-merek";
import TambahMerek from "./pages/merek/tambah-merek";
import EditMerek from "./pages/merek/edit-merek";
import TableDataJenisBarang from "./pages/jenis-barang/table-jenis-barang";
import TambahJenisBarang from "./pages/jenis-barang/tambah-jenis-barang";
import EditJenisBarang from "./pages/jenis-barang/edit-jenis-barang";
import TableDataProduk from "./pages/produk/table-produk";
import TambahProduk from "./pages/produk/tambah-produk";
import EditProduk from "./pages/produk/edit-produk";
import TempatPenyimpanan from "./pages/penyimpanan";

function App() {
    const [hamburgerMenu, sethamburgerMenu] = useState(false);
    return (
        <div className="App">
            <>
                <Wrapper onclick={() => sethamburgerMenu(!hamburgerMenu)}>
                    <Container hamburgermenu={hamburgerMenu}>
                        <MainContent hamburgermenu={hamburgerMenu}>
                            <Routes>
                                <Route path="/" element={<Dashboard />}></Route>
                                <Route path="dashboard" element={<Dashboard />}></Route>
                                <Route path="home" element={<Dashboard />}></Route>
                                <Route path="produk" element={<Produk />}>
                                    <Route index element={<TableDataProduk />} />
                                    <Route path="tambah-produk" element={<TambahProduk />} />
                                    <Route path="edit-produk" element={<EditProduk />} />
                                </Route>
                                <Route path="merek" element={<Merek />}>
                                    <Route index element={<TableDataMerek />} />
                                    <Route path="tambah-merek" element={<TambahMerek />} />
                                    <Route path="edit-merek" element={<EditMerek />} />
                                </Route>
                                <Route path="jenis-barang" element={<JenisBarang />}>
                                    <Route index element={<TableDataJenisBarang />} />
                                    <Route path="tambah-jenis-barang" element={<TambahJenisBarang />} />
                                    <Route path="edit-jenis-barang" element={<EditJenisBarang />} />
                                </Route>
                                <Route path="tempat-penyimpanan" element={<TempatPenyimpanan />} />
                                <Route path="supplier" element={<Supplier />}>
                                    <Route index element={<TableDataSupplier />} />
                                    <Route path="tambah-supplier" element={<TambahSupplier />} />
                                    <Route path="edit-supplier" element={<EditSupplier />} />
                                </Route>
                                <Route path="laporan" element={<Laporan />} />
                            </Routes>
                        </MainContent>
                    </Container>
                </Wrapper>
            </>
        </div>
    );
}

export default App;
