import React from 'react';
import {auth, sendSignInEmail, confirmEmail, signMeOut} from "../Services/firebase";
import SimpleAlert from "../Components/SimpleAlert";


const defaultErrorMessage = "We apologise for the inconvenience. Please try again later."
const animatePulseCssClassName = "animate-pulse"

const Login = () => {

    const [errorMessage, setErrorMessage] = React.useState("")
    const [animatePulse, setAnimatePulse] = React.useState("")
    const [emailSentSuccessfully, setEmailSentSuccessfully] = React.useState(false)

    const retry = () => {
        setAnimatePulse("")
        setEmailSentSuccessfully(false)
    }


    const handleFormSubmit = async (event : any) => {
        setAnimatePulse(animatePulseCssClassName)
        event.preventDefault()
        const email = event.target[0].value
        if (email !== null) {
            const emailSent = await sendSignInEmail(email)
            if (emailSent) {
                setErrorMessage("")
                setEmailSentSuccessfully(true)
            } else {
                setAnimatePulse("")
                setErrorMessage(defaultErrorMessage)
                setEmailSentSuccessfully(false)
            }
        } else {
            setAnimatePulse("")
            setErrorMessage(defaultErrorMessage)
            setEmailSentSuccessfully(false)
        }
    }

    return (

        <div className={"h-screen"}>

            <img className="absolute brightness-75 object-cover w-full h-full" src={"https://images.unsplash.com/photo-1521633246924-67d02995bb46?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"}/>

            <div className="relative flex flex-col justify-center py-12 sm:px-6 lg:px-8">

                <div className="mx-4 sm:mx-auto sm:w-full sm:max-w-md mt-24">

                    <div className="bg-white shadow rounded-lg">
                        <div className={"p-4 sm:py-6 sm:px-10 bg-gradient-to-r from-cyan-500 to-indigo-700 rounded-t-lg"}>
                            <p className={"text-xl font-medium text-white"}>TRADIFY</p>
                            <p className={"text-white text-sm"}>Get all your jobs done</p>
                        </div>



                        {!emailSentSuccessfully &&

                            <div className={"py-8 px-4 pb-12 sm:px-10 " + animatePulse}>

                                {errorMessage !== "" && <SimpleAlert className={"mb-4"} title={"An error happened"} description={defaultErrorMessage}/>}

                                <p className={"text-lg"}>Sign in or sign up</p>
                                <p className={"text-sm text-gray-800"}>Enter your email to get started</p>

                                <form className="space-y-6 mt-6" onSubmit={handleFormSubmit}>
                                    <div>
                                        <div className="mt-1">
                                            <input
                                                id="email"
                                                name="email"
                                                type="email"
                                                autoComplete="email"
                                                required
                                                placeholder={"Email address"}
                                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <button
                                            type="submit"
                                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Send me a magic link
                                        </button>
                                    </div>
                                </form>
                            </div>

                        }

                        {emailSentSuccessfully &&

                            <div className={"py-8 px-4 pb-12 sm:px-10"}>

                                {errorMessage !== "" && <SimpleAlert className={"mb-4"} title={"An error happened"} description={defaultErrorMessage}/>}

                                <p className={"text-md"}>A login link has been sent to you.</p>
                                <p className={"text-sm text-gray-800 mt-1"}>Remember to check your spam folder too.</p>

                                <button
                                    onClick={retry}
                                    type="button"
                                    className="mt-6 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Use a different email address or retry
                                </button>


                            </div>

                        }


                    </div>



                </div>
            </div>

        </div>

    )
}

export default Login;