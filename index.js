const BOOK_COST = 8;

const hasSameItems = cart => {
    const start = cart[0];

    for(let i = 0; i < cart.length; i++) {
        if (cart[i] !== start) {
            return false;
        }
    }
    return true;
}

const getSetDiscount = setCount => {
    const discounts = {
        1: 0,
        2: 0.05,
        3: 0.1,
        4: 0.2,
        5: 0.25
    }
    return discounts[setCount];
}

const groupCart = cart => {
    const groupedCart = {};

    for (item of cart){
        if (groupedCart[item]) groupedCart[item]++
        else groupedCart[item] = 1; 
    }

    return groupedCart;
}

const getSetWithBestDiscount = sets => {
    let discount = -1;
    let bestSet = [];

    sets.forEach(set => {
        const setDiscount = set.reduce((total, current) => total + getSetDiscount(current), 0);
        if (setDiscount > discount) {
            discount = setDiscount;
            bestSet = set;
        }
    });

    return bestSet;
}

const generateSets = groupedCart => {
    const sets = [];
    while (Object.keys(groupedCart).length) {
        let currentSet = 0;
        for(const item in groupedCart) {
            currentSet++;
            groupedCart[item]--;

            if (!groupedCart[item]) {
                delete groupedCart[item];
            }
        }
        sets.push(currentSet);
    }

    return [sets];
}

const getSetPrice = setCount => setCount * BOOK_COST;

const calculatePrice = cart => {
    if (!cart || !cart.length) return 0;
    // if (hasSameItems(cart))  return BOOK_COST * cart.length; 

    const groupedCart = groupCart(cart);

    const sets = getSetWithBestDiscount(generateSets(groupedCart));
    
    const price = sets.reduce((total, current) => {
        const setPrice = getSetPrice(current);
        return total + (setPrice - (setPrice * getSetDiscount(current)))
    }, 0);

    return price;
}

module.exports = calculatePrice;