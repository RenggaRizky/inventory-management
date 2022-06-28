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
import Rak from "./pages/rak";
import BarangRetur from "./pages/barang-retur";
import TambahBarangRetur1 from "./pages/barang-retur/tambah-barang-retur/1";
import TableDataBarangRetur from "./pages/barang-retur/table-barang-retur";
import DetailBarangRetur from "./pages/barang-retur/detail-barang-retur";
import DetailSupplier from "./pages/supplier/detail-supplier";
import DetailProduk from "./pages/produk/detail-produk";
import StokBarang from "./pages/stok-barang";
import TabelDataStok from "./pages/stok-barang/table-stok";
import DetailStok from "./pages/stok-barang/detail-stok";
import SatuanBarang from "./pages/satuan-barang";
import TableDataSatuanBarang from "./pages/satuan-barang/table-satuan-barang";
import TambahSatuanBarang from "./pages/satuan-barang/tambah-satuan-barang";
import EditSatuanBarang from "./pages/satuan-barang/edit-satuan-barang";
import EditStok from "./pages/stok-barang/edit-stok";
import TambahBarangRetur2 from "./pages/barang-retur/tambah-barang-retur/2";
import EditBarangRetur1 from "./pages/barang-retur/edit-barang-retur/1";
import EditBarangRetur2 from "./pages/barang-retur/edit-barang-retur/2";
import Pembelian from "./pages/pembelian";
import TableDataPembelian from "./pages/pembelian/table-pembelian";
import TambahPembelian from "./pages/pembelian/tambah-pembelian";
import TambahRak from "./pages/rak/tambah-rak";
import DetailRak from "./pages/rak/detail-rak";
import EditRak from "./pages/rak/edit-rak";

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
                                    <Route path=":id" element={<DetailProduk />} />
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
                                <Route path="satuan-barang" element={<SatuanBarang />}>
                                    <Route index element={<TableDataSatuanBarang />} />
                                    <Route path="tambah-satuan-barang" element={<TambahSatuanBarang />} />
                                    <Route path="edit-satuan-barang" element={<EditSatuanBarang />} />
                                </Route>
                                <Route path="rak" element={<Rak />}>
                                    <Route path=":id" element={<DetailRak />}></Route>
                                </Route>
                                <Route path="tambah-rak" element={<TambahRak />} />
                                <Route path="edit-rak" element={<EditRak />} />
                                <Route path="supplier" element={<Supplier />}>
                                    <Route index element={<TableDataSupplier />} />
                                    <Route path="tambah-supplier" element={<TambahSupplier />} />
                                    <Route path="edit-supplier" element={<EditSupplier />} />
                                    <Route path=":id" element={<DetailSupplier />} />
                                </Route>
                                <Route path="stok-barang" element={<StokBarang />}>
                                    <Route index element={<TabelDataStok />} />
                                    <Route path="edit-stok-barang" element={<EditStok />} />
                                    <Route path=":id" element={<DetailStok />} />
                                </Route>
                                <Route path="barang-retur" element={<BarangRetur />}>
                                    <Route index element={<TableDataBarangRetur />} />
                                    <Route path="tambah-barang-retur-1" element={<TambahBarangRetur1 />} />
                                    <Route path="tambah-barang-retur-2" element={<TambahBarangRetur2 />} />
                                    <Route path="edit-barang-retur-1" element={<EditBarangRetur1 />} />
                                    <Route path="edit-barang-retur-2" element={<EditBarangRetur2 />} />
                                    <Route path=":id" element={<DetailBarangRetur />} />
                                </Route>
                                <Route path="pembelian" element={<Pembelian />}>
                                    <Route index element={<TableDataPembelian />} />
                                    <Route path="tambah-pembelian" element={<TambahPembelian />} />
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
