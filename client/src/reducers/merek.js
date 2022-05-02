// eslint-disable-next-line import/no-anonymous-default-export
export default (merek = [], action) => {
    switch (action.type) {
        case "FETCH_DATA":
            return action.payload;
        case "CREATE_DATA":
            return [...merek, action.payload];
        default:
            return merek;
    }
};
