const store = (store = [], action) => {
    switch (action.type) {
        case "FETCH_ALL" :
            return action.payload;
        default : 
            return store;        
    }  
}

export default store;