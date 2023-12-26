import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { AppDispatch } from '../redux/store'

type MessagesProp = {
  error: string | null
  success: string | null
  clearMessage:
    | ActionCreatorWithoutPayload<'user/clearUserMessage'>
    | ActionCreatorWithoutPayload<'category/clearCategoryMessage'>
    | ActionCreatorWithoutPayload<'product/clearProductMessage'>
}

export const Messages = ({ error, success, clearMessage }: MessagesProp) => {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (success) {
      notifySuccess(success)
    }
  }, [success])

  useEffect(() => {
    console.log('in effecet errot', error)
    if (error) {
      notifyError(error)
    }
  }, [error])

  const notifySuccess = (message: string) => {
    const toastId = toast.success(message, {
      onClose: () => {
        dispatch(clearMessage())
      }
    })
    setTimeout(() => {
      toast.dismiss(toastId)
    }, 2000)
  }

  const notifyError = (message: string) => {
    const toastId = toast.error(message, {
      onClose: () => {
        dispatch(clearMessage())
      }
    })
    setTimeout(() => {
      toast.dismiss(toastId)
    }, 2000)
  }

  return <ToastContainer />
}
