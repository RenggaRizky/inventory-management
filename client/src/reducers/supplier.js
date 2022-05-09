// eslint-disable-next-line import/no-anonymous-default-export
export default (supplier = [], action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return action.payload;
        case "CREATE_DATA":
            return [...supplier, action.payload];
        default:
            return supplier;
    }
};
