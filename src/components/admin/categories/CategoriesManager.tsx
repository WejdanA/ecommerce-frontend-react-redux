import { Accordion } from 'react-bootstrap'
import { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'

import { AppDispatch, RootState } from '../../../redux/store'
import {
  clearCategoryMessage,
  createCategory,
  deleteCategory,
  fetchCategories,
  updateCategory
} from '../../../redux/slices/categorySlice'
import { Admin } from '../Admin'
import { Messages } from '../../../utils/Messages'

type Inputs = {
  category: string
}
export function CategoriesManager() {
  const { categories, isLoading, success, error } = useSelector(
    (state: RootState) => state.categories
  )
  const dispatch = useDispatch<AppDispatch>()

  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [btnText, setBtnText] = useState('Create')

  useEffect(() => {
    dispatch(fetchCategories())
  }, [dispatch])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const changeCategoryHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const addCategoryHandle: SubmitHandler<Inputs> = (data) => {
    if (btnText == 'Create') {
      dispatch(createCategory(data.category))
    } else {
      const category = { _id: categoryId, name: categoryName }
      dispatch(updateCategory(category))
      setBtnText('Create')
      setCategoryName('')
    }
  }

  const editCategoryHandle = (categoryId: string, categoryName: string) => {
    setCategoryId(categoryId)
    setCategoryName(categoryName)
    setBtnText('Update')
  }

  return (
    <div className="main-content">
      <Admin />
      <div id="products" className="products-container">
        {isLoading ? (
          <h3> Loading categories...</h3>
        ) : (
          <div className="card grid gap-4">
            <div className="local-bootstrap">
              <Accordion className="admin-form">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>addCategory</Accordion.Header>
                  <Accordion.Body>
                    <div className="contact">
                      <form
                        action="submit"
                        onSubmit={handleSubmit(addCategoryHandle)}
                        className="contact-form category">
                        <div className="input-group">
                          <input
                            id="category"
                            {...register('category', { required: true })}
                            name="category"
                            value={categoryName}
                            onChange={(e) => changeCategoryHandle(e)}
                            placeholder="category name"
                          />
                          {errors.category && <span className="error"></span>}
                        </div>

                        <input type="submit" value={btnText + ' category'} className="form-btn" />
                      </form>
                    </div>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
            <div className="local-bootstrap">
              <table className=" table table-stripe">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">name</th>
                    <th scope="col">edit</th>
                    <th scope="col">delete</th>
                  </tr>
                </thead>
                <tbody>
                  {' '}
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category._id}</td>
                      <td>{category.name}</td>

                      <td>
                        <button
                          className=" edit-btn"
                          onClick={() => editCategoryHandle(category._id, category.name)}>
                          Edit
                        </button>
                      </td>

                      <td>
                        <button
                          className=" remove-btn"
                          onClick={() => {
                            dispatch(deleteCategory(category._id))
                          }}>
                          X
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <Messages error={error} success={success} clearMessage={clearCategoryMessage} />
    </div>
  )
}
