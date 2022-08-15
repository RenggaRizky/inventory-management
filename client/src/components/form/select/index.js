import React from "react";
import Spinner from "../../spinner";
import { Title } from "../../typography/title";
import styles from "./style.module.css";

const InputSelect = ({ data, ...props }) => {
    return (
        <select className={`${styles.input_select} form-select`} aria-label="Default select example" {...props}>
            <option hidden value="">
                {props.itemselected}
            </option>
            {data === null ? (
                <Spinner />
            ) : (
                data.map((x) => {
                    return (
                        <option key={x._id} value={x._id}>
                            {x.nama}
                        </option>
                    );
                })
            )}
        </select>
    );
};

const DisabledInputSelect = ({ data, ...props }) => {
    return (
        <select className={`${styles.disabled_input_select} form-select`} aria-label="Default select example" disabled {...props}>
            <option hidden value="">
                {props.itemselected}
            </option>
            {data === null ? (
                <Spinner />
            ) : (
                data.map((x) => {
                    return (
                        <option key={x._id} value={x._id}>
                            {x.nama}
                        </option>
                    );
                })
            )}
        </select>
    );
};

const ReturInputSelect = ({ data, ...props }) => {
    return (
        <select className={`${styles.input_select} form-select`} aria-label="Default select example" {...props}>
            <option hidden value="">
                {props.itemselected}
            </option>
            {data === null ? (
                <Spinner />
            ) : (
                data.map((x) => {
                    return (
                        <option key={x._id} value={x._id} disabled={x.stok.total === 0 ? true : false}>
                            {x.nama}
                        </option>
                    );
                })
            )}
        </select>
    );
};

const SupplierInputSelect = ({ data, ...props }) => {
    return (
        <select className={`${styles.input_select} ${props.bs} form-select`} aria-label="Default select example" {...props}>
            <option hidden value="">
                {props.itemselected}
            </option>
            {data === null ? (
                <Spinner />
            ) : (
                data.map((x) => {
                    return (
                        <option key={x._id} value={x._id}>
                            {x.nama} - {x.namaPerusahaan}
                        </option>
                    );
                })
            )}
        </select>
    );
};

const RakInputSelect = ({ data, ...props }) => {
    return (
        <select className={`${styles.input_select} ${props.bs} form-select`} aria-label="Default select example" {...props}>
            <option hidden value="">
                {props.itemselected}
            </option>
            {data === null ? (
                <Spinner />
            ) : (
                data.map((data) => {
                    return (
                        <>
                            {data.susun.map((datasusun) => {
                                return (
                                    <option key={datasusun._id} value={datasusun._id} disabled={datasusun.terpakai.$numberDecimal > 0 ? true : false}>
                                        {data.nama} {data.lokasi} - {datasusun.nama} ({datasusun.status.toFixed(1)}%)
                                    </option>
                                );
                            })}
                        </>
                    );
                })
            )}
        </select>
    );
};

export { InputSelect, DisabledInputSelect, ReturInputSelect, SupplierInputSelect, RakInputSelect };
