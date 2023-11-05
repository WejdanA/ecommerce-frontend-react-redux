import { Accordion } from 'react-bootstrap'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, SubmitHandler } from 'react-hook-form'

import { AppDispatch, RootState } from '../../../redux/store'
import { addCategory, editCategory, removeCategory } from '../../../redux/slices/categorySlice'

import { Admin } from '../Admin'

type Inputs = {
  category: string
}
export function CategoriesManager() {
  const dispatch = useDispatch<AppDispatch>()
  const categories = useSelector((state: RootState) => state.categories)

  const [categoryName, setCategoryName] = useState('')
  const [categoryId, setCategoryId] = useState(0)
  const [btnText, setBtnText] = useState('Create')

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const changeCategoryHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const addCategoryHandle: SubmitHandler<Inputs> = (data) => {
    if (btnText == 'create') {
      const category = { id: +new Date(), name: data.category }
      dispatch(addCategory(category))
    } else {
      const category = { id: categoryId, name: categoryName }
      dispatch(editCategory(category))
      setBtnText('Create')
      setCategoryName('')
    }
  }

  const editCategoryHandle = (categoryId: number, categoryName: string) => {
    setCategoryId(categoryId)
    setCategoryName(categoryName)
    setBtnText('Update')
  }

  return (
    <div className="main-content">
      <Admin />
      <div id="products" className="products-container">
        {categories.isLoading && <h3> Loading categories...</h3>}
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
                {categories.categories.map((category) => (
                  <tr key={category.id}>
                    <td>category.id</td>
                    <td>{category.name}</td>

                    <td>
                      <button
                        className=" edit-btn"
                        onClick={() => editCategoryHandle(category.id, category.name)}>
                        Edit
                      </button>
                    </td>

                    <td>
                      <button
                        className=" remove-btn"
                        onClick={() => {
                          dispatch(removeCategory(category.id))
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
      </div>
    </div>
  )
}
