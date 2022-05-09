import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Produk from "./pages/produk";
import Merek from "./pages/merek";
import JenisBarang from "./pages/jenis-barang";
import TambahMerek from "./pages/tambah-merek";
import Laporan from "./pages/laporan";
import Supplier from "./pages/supplier";

import Container from "./layouts/container";
import MainContent from "./layouts/main";
import Wrapper from "./layouts/wrapper";

function App() {
    const [hamburgerMenu, sethamburgerMenu] = useState(false);
    return (
        <div className="App">
            <>
                <Wrapper onclick={() => sethamburgerMenu(!hamburgerMenu)}>
                    <Container hamburgermenu={hamburgerMenu}>
                        <MainContent hamburgermenu={hamburgerMenu}>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/produk" element={<Produk />} />
                                <Route path="/merek" element={<Merek />} />
                                <Route path="/jenis-barang" element={<JenisBarang />} />
                                <Route path="/tambah-merek" element={<TambahMerek />} />
                                <Route path="/supplier" element={<Supplier />} />
                                <Route path="/laporan" element={<Laporan />} />
                            </Routes>
                        </MainContent>
                    </Container>
                </Wrapper>
            </>
        </div>
    );
}

export default App;
