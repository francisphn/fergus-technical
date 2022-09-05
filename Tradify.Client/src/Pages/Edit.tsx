import {Link, useNavigate, useParams} from "react-router-dom";
import React from "react";
import {addNotePiece, deleteJob, deleteNotePiece, editJob, getJob} from "../Services/JobsServices";
import {Job} from "../Types/types";
import Header from "../Components/Header";
import {DateTime} from "luxon";

const Edit = () => {
    const params = useParams()
    const id = params.id
    const navigator = useNavigate();

    const handleSubmit = async (event: any) => {
        event.preventDefault()

        await editJob(window.localStorage.getItem("idToken")!, parseInt(id!), event.target[0].value!, event.target[1].value!, event.target[2].value!).then(response => {
            navigator("/jobs/" + id)
        })
    }

    const [job, setJob] = React.useState<Job>({
        id: 0,
        userId: 0,
        title: "",
        client: "",
        status: "",
        created: "",
        notes: []
    })

    React.useEffect(() => {
        const idToken = window.localStorage.getItem("idToken")
        if (idToken === null) {
            navigator("/")
        } else {
            getJob(idToken, parseInt(id!)).then(response => {
                if (response == 401) {
                    window.localStorage.removeItem("idToken")
                    navigator("/")
                } else {
                    setJob(response!)
                }
            })
        }

    }, [])

    return (
        <div>
            <Header/>

            <div className={"space-y-6 mt-14 mx-12 2xl:mx-96"}>

                <div className="overflow-hidden bg-white ring-2 shadow-md sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">Editing {job.title} (Job ID: {job.id})</h3>
                    </div>
                    <form onSubmit={handleSubmit}>

                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

                                        <input
                                            id="title"
                                            name="text"
                                            type="text"
                                            required
                                            defaultValue={job.title}
                                            className="appearance-none block lg:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />

                                    </dd>
                                </div>
                                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Client</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

                                        <textarea
                                            id="email"
                                            name="email"
                                            placeholder={"Put notes or contact details here..."}
                                            defaultValue={job.client}
                                            className="appearance-none block lg:w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />

                                    </dd>
                                </div>
                                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">Status</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">

                                        <select
                                            id="location"
                                            name="location"
                                            className="shadow-sm mt-1 block pl-1 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            defaultValue={job.status}
                                        >
                                            <option>Scheduled</option>
                                            <option>Active</option>
                                            <option>Invoicing</option>
                                            <option>To priced</option>
                                            <option>Completed</option>
                                        </select>

                                    </dd>
                                </div>

                                <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500"></dt>

                                    <button
                                        type="submit"
                                        className="p-2 w-1/2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save changes
                                    </button>

                                </div>

                            </dl>
                        </div>

                    </form>
                </div>

            </div>





        </div>
    )
}

export default Edit;