import { Routes, Route, Link } from "react-router-dom";

import Dashboard from "./pages/dashboard";
import Produk from "./pages/produk";
import TambahProduk from "./pages/tambah-produk";
import Merek from "./pages/merek";
import TambahMerek from "./pages/tambah-merek";
import Laporan from "./pages/laporan";

import Container from "./layouts/container";
import MainContent from "./layouts/main";
import Wrapper from "./layouts/wrapper";

function App() {
    return (
        <div className="App">
            <>
                <Wrapper>
                    <Container>
                        <MainContent>
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/produk" element={<Produk />} />
                                <Route path="/tambah-produk" element={<TambahProduk />} />
                                <Route path="/merek" element={<Merek />} />
                                <Route path="/tambah-merek" element={<TambahMerek />} />
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
