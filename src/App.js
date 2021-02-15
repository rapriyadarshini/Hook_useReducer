import React, { useReducer, useRef } from 'react'


const initialState = {

  additionalPrice: 0,
  car: {
    price: 26395,
    name: "2019 Ford Mustang",
    features: []
  },
  store: [
    { id: 1, name: "V-6 engine", price: 1500 },
    { id: 2, name: "Racing detail package", price: 1500 },
    { id: 3, name: "Premium sound system", price: 500 },
    { id: 4, name: "Rear spoiler", price: 250 }
  ]

};

const reducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice - action.item.price,
        car: { ...state.car, features: state.car.features.filter((x) => x.id !== action.item.id)},
        store: [...state.store, action.item]
      };
    case "BUY_ITEM":
      return {
        ...state,
        additionalPrice: state.additionalPrice + action.item.price,
        car: { ...state.car, features: [...state.car.features, action.item] },
        store: state.store.filter((x) => x.id !== action.item.id)
      }
    default:
      return state;
  }
}

const App = () => {
  
  const focusPoint = useRef(null); 
  
  const onCLickHandler = (props) => { 
    focusPoint.current.value = 
    `Total Amount: $${props}`
      focusPoint.current.focus(); 
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  
  const removeFeature = (item) => {
    dispatch({ type: 'REMOVE_ITEM', item });
  }
  
  const buyItem = (item) => {
    dispatch({ type: 'BUY_ITEM', item })
  }
  
  return (
    <div className="boxes">
      <div className="box">
        <h2>{state.car.name}</h2>
        <p>Amount: ${state.car.price} </p>

        <div className="content">
          <h4>Added features: </h4>

          {state.car.features.length ? 
            (
              <ol>
                {state.car.features.map((item) => (
                  <li key={item.id}>
                    <button onClick={() => removeFeature(item)} > X </button>
                    {item.name}
                  </li>
                ))}
              </ol>
            ) : <p> You can purchase additional items from the store. </p>
          }
        </div>

      </div>

      <div className="box">
        <div className="content">
          <h4>Additional Features</h4>

          {state.store.length ? 
            (
            <ol>
              {state.store.map((item) => (
                <li key={item.id}>
                  <button onClick={() => buyItem(item)}> Add</button>
                  {item.name} (+{item.price})
                </li>
              ))}
            </ol>
            ) : <p>Nice looking car! </p>
          }
        </div>

        {/* <> */}
        <div> 
          <button onClick={ () => { onCLickHandler(state.car.price + state.additionalPrice) } }> 
          Display/Refresh Total Amount 
          </button> 
        </div> 
        <textarea ref={focusPoint} /> 
        {/* </> */}

      </div>
    </div>
  );
}

export default App;
