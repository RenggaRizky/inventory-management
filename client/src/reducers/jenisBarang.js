// eslint-disable-next-line import/no-anonymous-default-export
export default (jenisBarang = [], action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return action.payload;
        case "CREATE_DATA":
            return [...jenisBarang, action.payload];
        default:
            return jenisBarang;
    }
};
