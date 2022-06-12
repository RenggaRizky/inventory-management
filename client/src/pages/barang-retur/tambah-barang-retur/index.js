import React, { useState } from "react";
import InputDataList from "../../../components/form/datalist";
import InputNumber from "../../../components/form/number";
import InputSelect from "../../../components/form/select";
import Textarea from "../../../components/form/textarea";
import LinkSpan from "../../../components/typography/link";
import Subtitle from "../../../components/typography/subtitle";
import Title from "../../../components/typography/title";

const TambahBarangRetur = () => {
    const [dataBarangRetur, setDataBarangRetur] = useState({
        status: "",
        alasan: "",
        catatan: "",
        jumlah: "",
        id_produk: "",
        id_supplier: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // postBarangRetur();
    };

    const dataUnit = [
        { key: 1, value: "pcs" },
        { key: 2, value: "set" },
        { key: 3, value: "lusin" },
        { key: 4, value: "meter" },
        { key: 5, value: "roll" },
    ];

    const dataStatus = [
        { key: 1, nama: "Diterima" },
        { key: 2, nama: "Diproses" },
        { key: 3, nama: "Ditolak" },
    ];

    return (
        <form onSubmit={handleSubmit} id="formInputBarangRetur">
            <div className="mt-1 mb-5">
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="selectProdukRetur">
                            <Title margin="1rem 0 0.625rem 0.25rem">Produk</Title>
                        </label>
                        <InputSelect data={dataUnit} />
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika produk tidak ditemukan, maka pergi ke halaman 'Produk' atau klik{" "}
                            <LinkSpan fontsize="0.75rem" to="/produk/tambah-produk">
                                disini
                            </LinkSpan>
                        </Subtitle>
                    </div>
                    <div className="col-2">
                        <label htmlFor="inputJumlahRetur">
                            <Title margin="1rem 0 0.625rem 0.25rem">Jumlah barang</Title>
                        </label>
                        <InputNumber />
                    </div>
                    <div className="col">
                        <label htmlFor="inputUnitRetur">
                            <Title margin="1rem 0 0.625rem 0.25rem">Unit</Title>
                        </label>
                        <InputDataList data={dataUnit} idinput="inputUnitProduk" iddatalist="inputUnitProdukDataList" />
                        <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                            *Jika unit yang diinginkan tidak ada di daftar, maka bisa input secara manual
                        </Subtitle>
                    </div>
                </div>

                <label htmlFor="selectSupplierRetur">
                    <Title margin="1rem 0 0.625rem 0.25rem">Supplier</Title>
                </label>
                <InputSelect data={dataUnit} />
                <Subtitle fontsize="0.75rem" margin="0 0 0 0.25rem">
                    *Jika supplier tidak ditemukan, maka pergi ke halaman 'Supplier' atau klik{" "}
                    <LinkSpan fontsize="0.75rem" to="/supplier/tambah-supplier">
                        disini
                    </LinkSpan>
                </Subtitle>

                <label htmlFor="inputAlasanRetur">
                    <Title margin="1rem 0 0.625rem 0.25rem">Alasan melakukan retur</Title>
                </label>
                <Textarea rows={8} />

                <label htmlFor="inputCatatanRetur">
                    <Title margin="1rem 0 0.625rem 0.25rem">Catatan</Title>
                </label>
                <Textarea rows={8} />

                <label htmlFor="selectStatusRetur">
                    <Title margin="1rem 0 0.625rem 0.25rem">Status barang retur</Title>
                </label>
                <InputSelect data={dataStatus} />
            </div>
        </form>
    );
};

export default TambahBarangRetur;
