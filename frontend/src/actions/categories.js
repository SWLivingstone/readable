import { GET_ALL_CATEGORIES } from './types'
import * as BackendAPI from '../utils/BackendAPI'

export const fetchCategories = () => dispatch => (
  BackendAPI
    .getCategories()
    .then(categories => dispatch(receiveCategories(categories)))
)

export function receiveCategories (categories) {
  return {
    type: GET_ALL_CATEGORIES,
    categories: categories
  }
}
