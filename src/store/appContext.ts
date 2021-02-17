import { createContext, Dispatch, ReactText, useReducer } from 'react'
import { LineItemToAdd } from 'shopify-buy'

type State = {
  // checkoutId: ReactText
  shopifyDomain: string
  shopifyAccessToken: string
  updateCheckout: boolean
  lineItemTmp: LineItemToAdd[]
}
const initialState: State = {
  // checkoutId: undefined,
  shopifyDomain: undefined,
  shopifyAccessToken: undefined,
  updateCheckout: false,
  lineItemTmp: [],
}

type Action =
  | { type: 'SET_CHECKOUT_ID'; value: ReactText }
  | { type: 'SET_SHOPIFY_TOKEN'; domain: string; token: string }
  | { type: 'UPDATE_CHECKOUT'; value: boolean }
  | { type: 'ADD_LINE_ITEM'; value: LineItemToAdd }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    // case 'SET_CHECKOUT_ID':
    //   return {
    //     ...state,
    //     checkoutId: action.value,
    //   }
    case 'SET_SHOPIFY_TOKEN':
      return {
        ...state,
        shopifyDomain: action.domain,
        shopifyAccessToken: action.token,
      }
    case 'UPDATE_CHECKOUT':
      return {
        ...state,
        updateCheckout: action.value,
      }
    case 'ADD_LINE_ITEM':
      return {
        ...state,
        lineItemTmp: state.lineItemTmp.concat(action.value),
      }
    default:
      return state
  }
}

export const AppContext = createContext(
  {} as {
    appState: State
    appDispatch: Dispatch<Action>
  },
)

export const useAppReducer = (): [State, Dispatch<Action>] =>
  useReducer(reducer, initialState)
