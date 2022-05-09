import { combineReducers } from "redux";

import merek from "./merek";
import jenisBarang from "./jenisBarang";
import produk from "./produk";
import supplier from "./supplier";

export default combineReducers({
    merek,
    jenisBarang,
    produk,
    supplier,
});
