import {combineReducers} from 'redux'
import { auths } from './auths'
import { customers } from './customers'
import { invoices } from './invoices'
import { items } from './items'

export const reducers =()=> combineReducers({auths,customers,invoices,items})
