import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { userLogin } from '../../api/auth/user'
import Modal from '../../components/UI/Dailog'
import LoadingButton from '../../components/UI/LoadingButton'
import { setData } from '../../utils/helper'
import { emailValidation } from '../../validations/login'

export default function Login() {
    const [email, setEmail] = useState("")
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [showModal,setShowModal] = useState(false)
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()
        let errors = emailValidation({ email })
        setErrors(errors)
        if (Object.keys(errors).length > 0) {
            setErrors(errors)
            return;
        }
        setLoading(true)
        try {
            const { code, message } = await userLogin({ email:encodeURI(email) , type:showModal  ? 'register' : "" })
            console.log(code)
            if (code === 200) {
                setShowModal(false)
                toast.success(message)
                navigate(`/verify-email?email=${email}`)
            }
           
        } catch (error) {
            console.log("errors==>", error)
            if (error.code === 404) {
                setShowModal(true)
            }
        }
        setLoading(false)
    }
    return (
        <div>
            <section class="bg-gray-50 dark:bg-gray-900">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        {/* <img class="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
                        Ecommerce Website Finder
                    </a>
                    <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" onSubmit={onSubmit}>
                                <div>
                                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input type="text"
                                        name="email"
                                        id="email"
                                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {
                                        errors?.email && (
                                            <div className='mt-2'>
                                                <p className='text-red-500'>{errors.email}</p>
                                            </div>
                                        )
                                    }
                                </div>

                                {/* <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-primary-800">Sign in</button> */}
                                <div>
                                    <LoadingButton isLoading={loading} type='submit' title='Signing...'  >
                                        Sign in
                                    </LoadingButton>
                                </div>
                                {/* <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                </p> */}
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Modal showModal={showModal} setShowModal={setShowModal}>
                <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                    <div className="mt-3 sm:flex">
                        <div className="flex items-center justify-center flex-none w-12 h-12 mx-auto bg-red-100 rounded-full">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-red-600"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <div className="mt-2 text-center sm:ml-4 sm:text-left">
                            <h4 className="text-lg font-medium text-gray-800">
                                User not Exist
                            </h4>
                            <p className="mt-2 text-[15px] leading-relaxed text-gray-500">
                                This user is not exist . do you want to create a account for this url ?
                            </p>
                            <div className="items-center gap-2 mt-3 sm:flex">
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-white bg-red-600 rounded-md outline-none ring-offset-2 ring-red-600 focus:ring-2"
                                    onClick={() =>
                                        setShowModal(false)
                                    }
                                >
                                    NO
                                </button>
                                <button
                                    className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                                    onClick={onSubmit}
                                >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>
        </div>
    )
}
