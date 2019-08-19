const BOOK_COST = 8;

const cache = {};
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
    const groupedCart = {1:0,2:0,3:0,4:0,5:0};

    for (item of cart){
        if (groupedCart[item]) groupedCart[item]++
        else groupedCart[item] = 1; 
    }

    return groupedCart;
}

const getCost = (values, level = 1, costs = []) => {
    if (values.every(value => value === 1 || value === 0)) {
        // Calculate cost
        const books = values.filter(value => value === 1);
        const bookCost = books.length * BOOK_COST;
        const discount = bookCost * getSetDiscount(books.length);
        const cost = bookCost - discount;
        return cost;
    }

    const levelCosts = [];
    for(let i = 0; i < values.length; i++) {
        const stepValues = [...values];
        stepValues[i]--;
        if (stepValues[i] < 0) continue;

        const subset = Array(5).fill(0);
        subset[i] = 1;
        const subsetCost = getCost(subset);
        let mainsetCost;
        const cachekey = stepValues.join('|');
        if (cache[stepValues.join('|')]) {
            mainsetCost = cache[cachekey];
        } else {
            mainsetCost = getCost(stepValues, level + 1, costs);
            cache[cachekey] = mainsetCost;
        }
        levelCosts.push(mainsetCost + subsetCost);
    }

    return Math.min(...levelCosts);
}

const calculatePrice = cart => {
    if (!cart || !cart.length) return 0;
    if (hasSameItems(cart))  return BOOK_COST * cart.length; 

    const groupedCart = groupCart(cart);

    const groupValues = Object.values(groupedCart);
    const cost = getCost(groupValues);
    return cost;
}

module.exports = calculatePrice;