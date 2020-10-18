/* Redux example with Insurance company setting based on Stephen Grider's Redux Explanation.
This is built using vanilla JS*/
import Redux from 'redux';
const {createStore, combineReducers } = Redux;

// action creators (represents some kind of form)
const createClaim = (name, amountOfMoneyToClaim) => {
  return {
    type: 'CREATE_CLAIM',
    payload: {
      name,
      amountOfMoneyToClaim
    }
  }
}

const createPolicy = (name) => {
  return {
    type: 'CREATE_POLICY',
    payload: {
      name,
      amount: 1000
    }
  };
};

const deletePolicy = (name) => {
  return {
    type: 'DELETE_POLICY',
    payload: {
      name
    }
  };
};

// reducers (represents each department)
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === 'CREATE_CLAIM') {
    return [...oldListOfClaims, action.payload];
  }
  return oldListOfClaims;
};

const accounting = (moneyReserve = 1000000, action) => {
  if (action.type === 'CREATE_CLAIM') {
    return moneyReserve - action.payload.amountOfMoneyToClaim;
  } else if (action.type === 'CREATE_POLICY') {
    return moneyReserve + action.payload.amount
  }
  return moneyReserve;
}

const policies = (listOfPolicies = [], action) => {
  if (action.type === 'CREATE_POLICY') {
    return [...listOfPolicies, action.payload.name];
  } else if (action.type === 'DELETE_POLICY') {
    return listOfPolicies.filter(policy => policy !== action.payload.name);
  }
  return listOfPolicies;
};

// combine reducers (combine all departments portrays the setup of the company)
const ourDepartments = combineReducers({
  accounting,
  claimsHistory,
  policies
});

// create store (represents company as whole)
const store = createStore(ourDepartments);

// dispatch (form receivers)
store.dispatch(createPolicy('Jane Doe'));
console.log(store.getState());
store.dispatch(createClaim('Jane Doe', 20000))
console.log(store.getState());
store.dispatch(deletePolicy('Jane Doe'));
console.log(store.getState());
