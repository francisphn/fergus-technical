import React from "react"
import {auth, sendSignInEmail, confirmEmail, signMeOut} from "../Services/firebase"
import {Link, useNavigate} from "react-router-dom";
import SimpleAlert from "../Components/SimpleAlert";
import SpinningAnimation from "../Components/SpinningAnimation";

const Authenticate = () => {

    const navigator = useNavigate()

    const [emailConfirmed, setEmailConfirmed] = React.useState(false)
    const [authenticationError, setAuthenticationError] = React.useState(false)

    React.useEffect( () => {
        const redirectLinkConfirmEmail = async () => {
            return await confirmEmail()
        }

        redirectLinkConfirmEmail().then(response => {
            if (response) {
                console.log(window.localStorage.getItem("idToken"))
                navigator("/jobs")
            } else {
                if (window.localStorage.getItem("idToken") === null) {
                    setAuthenticationError(true)
                } else {
                    navigator("/jobs")
                }

            }
        })

    }, [])

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

                        <div className={"py-8 px-4 pb-12 sm:px-10"}>


                            {authenticationError ?
                                <div>

                                    <p className={"text-sm"}>Your authentication has expired or is invalid.</p>
                                    <Link to={"/"} className={"text-sm text-gray-800 mt-1 text-indigo-500 underline underline-offset-4 hover:no-underline"}>Request a new magic link</Link>

                                </div>

                                :

                                <div className={"flex justify-center mt-4"}>

                                    <SpinningAnimation/>

                                </div>
                            }







                        </div>


                    </div>



                </div>
            </div>

        </div>
    )
}

export default Authenticate;