import {combineReducers} from 'redux'
import { auths } from './auths'
import { clients } from './customers'
import { invoices } from './invoices'
import { items } from './items'

export const reducers =()=> combineReducers({auths,clients,invoices,items})
