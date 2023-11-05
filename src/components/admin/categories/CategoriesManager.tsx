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
          <div className="contact">
            <div className="local-bootstrap">
              <Accordion className="admin-form">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Advanced Search </Accordion.Header>
                  <Accordion.Body>
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
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
          <ul>
            {categories.categories.map((category) => (
              <li key={category.id} className="flex items-center gap-4 text-2xl mb-2">
                <div className="name">{category.name}</div>

                <button
                  className=" text-red-400 text-xs"
                  onClick={() => editCategoryHandle(category.id, category.name)}>
                  Edit
                </button>

                <button
                  className=" text-red-400 text-xs"
                  onClick={() => {
                    dispatch(removeCategory(category.id))
                  }}>
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
