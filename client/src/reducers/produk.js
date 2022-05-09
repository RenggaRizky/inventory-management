// eslint-disable-next-line import/no-anonymous-default-export
export default (produk = [], action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return action.payload;
        case "CREATE_DATA":
            return [...produk, action.payload];
        default:
            return produk;
    }
};
