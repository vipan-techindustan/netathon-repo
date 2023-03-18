import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import VerifyOTP from '../../components/VerifyOTP'
import { setData } from '../../utils/helper'
import { userLogin, userVerify } from '../../api/auth/user'
import { toast } from 'react-toastify'

export default function VerifyEmail() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [isVerifying, setIsVerifying] = useState(false)
    const [isResend, setIsResend] = useState(false)
    const [otps, setOtps] = useState(
        {
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
        }
    )
   const email =  searchParams?.get('email') || ""

    const resendHandler = async()=>{
        setIsResend(true)
        try {
            const {code , message} = await userLogin({ email })
            if(code===200){
                toast.success(message)
                navigate(`/verify-email?email=${email}`)
            }
        } catch (error) {
            console.log("errors==>", error)
        }
        setIsResend(false)
    }
    const verifyEmailHandler = async () => {
        let otp = Object.keys(otps).filter((otp => otp.includes('otp'))).map((val => otps[val])).join('')
       
        setIsVerifying(true)
        try {
            const { code, message,info,token } = await userVerify({ email, otp })
            if (code === 200) {
                toast.success(message)
                setData('auth_token',token)
                setData('user',info)
                navigate(`/`)
            }
        } catch (error) {
            toast.error(error.message)
        }
        setIsVerifying(false)
    }

    return (
        <div>
            <VerifyOTP
                otps={otps}
                setOtps={setOtps}
                email={email}
                verifyEmailHandler={verifyEmailHandler}
                isVerifying={isVerifying}
                resendHandler={resendHandler}
                isResend={isResend}
            />
        </div>
    )
}
