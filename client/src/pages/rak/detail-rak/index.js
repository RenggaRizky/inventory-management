import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "../style.module.css";

import { H2, H3, H4, H5 } from "../../../components/typography/heading";
import { BsHddRack } from "react-icons/bs";
import { Title } from "../../../components/typography/title";
import Subtitle from "../../../components/typography/subtitle";
import { colors } from "../../../colors";
import { url } from "../../../api";
import Spinner from "../../../components/spinner";
import BtnLinkSuccess from "../../../components/button/link/success";
import { HiOutlinePencilAlt } from "react-icons/hi";
import ModalDeleteSecondary from "../../../components/button/modal/delete-table-section";
import ModalDelete from "../../../components/button/modal/delete-detail-section";

const DetailRak = () => {
    const getId = useLocation().pathname.split("/")[2];
    const [dataRak, setDataRak] = useState({
        id: null,
        nama: null,
        lokasi: null,
        panjang: null,
        lebar: null,
        tinggi: null,
        susun1Kapasitas: null,
        susun1Terpakai: null,
        susun1Status: null,
        susun2Kapasitas: null,
        susun2Terpakai: null,
        susun2Status: null,
        susun3Kapasitas: null,
        susun3Terpakai: null,
        susun3Status: null,
        susun4Kapasitas: null,
        susun4Terpakai: null,
        susun4Status: null,
    });

    const getInfoRak = (id) => {
        url.get(`${id}`)
            .then((response) => {
                setDataRak({
                    id: response.data._id,
                    nama: response.data.nama,
                    lokasi: response.data.lokasi,
                    panjang: response.data.dimensiSusun.panjang.$numberDecimal,
                    lebar: response.data.dimensiSusun.lebar.$numberDecimal,
                    tinggi: response.data.dimensiSusun.tinggi.$numberDecimal,
                    susun1Kapasitas: response.data.susun1.kapasitas.$numberDecimal,
                    susun1Terpakai: response.data.susun1.terpakai.$numberDecimal,
                    susun1Status: response.data.susun1.status,
                    susun2Kapasitas: response.data.susun2.kapasitas.$numberDecimal,
                    susun2Terpakai: response.data.susun2.terpakai.$numberDecimal,
                    susun2Status: response.data.susun2.status,
                    susun3Kapasitas: response.data.susun3.kapasitas.$numberDecimal,
                    susun3Terpakai: response.data.susun3.terpakai.$numberDecimal,
                    susun3Status: response.data.susun3.status,
                    susun4Kapasitas: response.data.susun4.kapasitas.$numberDecimal,
                    susun4Terpakai: response.data.susun4.terpakai.$numberDecimal,
                    susun4Status: response.data.susun4.status,
                });
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    useEffect(() => {
        getInfoRak(getId);
    }, [getId]);

    return (
        <>
            {dataRak.id === null ? (
                <Spinner />
            ) : (
                <div>
                    <div className={`${styles.rack_info_wrapper} d-flex align-items-center`}>
                        <div className={`${styles.rack_main_icon_wrapper} d-flex justify-content-center align-items-center rounded-circle`}>
                            <BsHddRack />
                        </div>
                        <div>
                            <H2 color={colors.white} texttransform="uppercase" margin="0 0 6px 0">
                                {dataRak.nama} - {dataRak.lokasi}
                            </H2>
                            <H5 color={colors.white}>4 Susun</H5>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <H3>Detail</H3>

                            <div className="d-flex">
                                <Link to={"/edit-rak"} state={{ id: getId }} className="text-decoration-none d-flex align-items-center">
                                    <BtnLinkSuccess bs="text-uppercase d-flex border-0 align-items-center">
                                        <HiOutlinePencilAlt className={styles.icon_edit} />
                                        Edit
                                    </BtnLinkSuccess>
                                </Link>
                                <ModalDelete value="Hapus" page="Rak" target="hapusRak" selectedid={getId} selectedmenu="/rak" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="d-flex">
                                        <div className={`${styles.rack_detail_icon_wrapper} d-flex justify-content-center align-items-center`}>
                                            <BsHddRack />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <Title texttransform="uppercase">susun 1</Title>
                                            <Subtitle fontsize="0.75rem" lineheight="15px">
                                                Dimensi {dataRak.panjang} x {dataRak.lebar} x {dataRak.tinggi}
                                            </Subtitle>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex-grow-1 text-nowrap">
                                            <H4>{dataRak.susun1Status} %</H4>
                                        </div>
                                    </div>
                                </div>
                                <div className="progress mb-4">
                                    <div className={`${styles.progress_bar} progress-bar`} role="progressbar" style={{ width: `${dataRak.susun1Terpakai}%` }} aria-valuenow={dataRak.susun1Status} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <div className="d-flex">
                                        <div className={`${styles.rack_detail_icon_wrapper} d-flex justify-content-center align-items-center`}>
                                            <BsHddRack />
                                        </div>
                                        <div className="d-flex flex-column">
                                            <Title texttransform="uppercase">susun 2</Title>
                                            <Subtitle fontsize="0.75rem" lineheight="15px">
                                                Dimensi {dataRak.panjang} x {dataRak.lebar} x {dataRak.tinggi}
                                            </Subtitle>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex-grow-1 text-nowrap">
                                            <H4>{dataRak.susun2Status} %</H4>
                                        </div>
                                    </div>
                                </div>
                                <div className="progress mb-4">
                                    <div className={`${styles.progress_bar} progress-bar`} role="progressbar" style={{ width: `${dataRak.susun2Terpakai}%` }} aria-valuenow={dataRak.susun2Status} aria-valuemin="0" aria-valuemax="100"></div>
                                </div>
                            </div>
                            <div className="col">
                                <div className="col">
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex">
                                            <div className={`${styles.rack_detail_icon_wrapper} d-flex justify-content-center align-items-center`}>
                                                <BsHddRack />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <Title texttransform="uppercase">susun 3</Title>
                                                <Subtitle fontsize="0.75rem" lineheight="15px">
                                                    Dimensi {dataRak.panjang} x {dataRak.lebar} x {dataRak.tinggi}
                                                </Subtitle>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex-grow-1 text-nowrap">
                                                <H4>{dataRak.susun3Status} %</H4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress mb-4">
                                        <div
                                            className={`${styles.progress_bar} progress-bar`}
                                            role="progressbar"
                                            style={{ width: `${dataRak.susun3Terpakai}%` }}
                                            aria-valuenow={dataRak.susun3Status}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <div className="d-flex">
                                            <div className={`${styles.rack_detail_icon_wrapper} d-flex justify-content-center align-items-center`}>
                                                <BsHddRack />
                                            </div>
                                            <div className="d-flex flex-column">
                                                <Title texttransform="uppercase">susun 4</Title>
                                                <Subtitle fontsize="0.75rem" lineheight="15px">
                                                    Dimensi {dataRak.panjang} x {dataRak.lebar} x {dataRak.tinggi}
                                                </Subtitle>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex-grow-1 text-nowrap">
                                                <H4>{dataRak.susun4Status} %</H4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="progress mb-4">
                                        <div
                                            className={`${styles.progress_bar} progress-bar`}
                                            role="progressbar"
                                            style={{ width: `${dataRak.susun4Terpakai}%` }}
                                            aria-valuenow={dataRak.susun4Status}
                                            aria-valuemin="0"
                                            aria-valuemax="100"
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DetailRak;
