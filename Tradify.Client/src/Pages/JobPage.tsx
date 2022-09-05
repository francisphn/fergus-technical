import Header from "../Components/Header";
import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {addNotePiece, deleteJob, deleteNotePiece, getJob} from "../Services/JobsServices";
import {DateTime} from "luxon";
import {Job} from "../Types/types";

const JobPage = () => {
    const params = useParams()
    const id = params.id
    const navigator = useNavigate();

    const [stateHasChanged, setStateHasChanged] = React.useState(false)

    const handleDelete = async (event: any, notes: string) => {

        await deleteNotePiece(window.localStorage.getItem("idToken")!, parseInt(id!), notes).then(response => {
            setStateHasChanged(!stateHasChanged)
        })
    }

    const handleAddNewNotes = async (event: any) => {
        event.preventDefault()
        console.log(event.target[0].value)
        await addNotePiece(window.localStorage.getItem("idToken")!, parseInt(id!), event.target[0].value!).then(response => {
            setStateHasChanged(!stateHasChanged)
        })
    }

    const handleDeleteJob = async () => {
        await deleteJob(window.localStorage.getItem("idToken")!, parseInt(id!)).then(response => {
            navigator("/jobs")
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
                    console.log(response)
                    setJob(response!)
                }
            })
        }

    }, [stateHasChanged])

    return (
        <div>
            <Header/>

            <div className={"space-y-6 mt-14 mx-12 2xl:mx-96"}>

                <div className="overflow-hidden bg-white ring-2 shadow-md sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{job!.title}</h3>
                    </div>
                    <div className="border-t border-gray-200">
                        <dl>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Job ID</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{job!.id}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Client</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{job!.client}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Status</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{job!.status}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Created</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{DateTime.fromISO(job!.created, {zone: 'utc'}).toFormat("h:mm a dd/M/yyyy")}</dd>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500">Notes</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                        {job!.notes.map(note => <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                            <div className="flex w-0 flex-1 items-center">

                                                <span className="ml-2 w-0 flex-1 truncate">{note}</span>
                                            </div>
                                            <div className="ml-4 flex-shrink-0">
                                                <button onClick={event => handleDelete(event, note)} className="font-medium text-red-600 hover:text-red-500">
                                                    Delete
                                                </button>
                                            </div>
                                        </li>)}

                                        <form onSubmit={handleAddNewNotes} className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">

                                        <div className="flex w-0 flex-1 items-center">

                                            <div className="w-full" >

                                                    <div className="w-full">
                                                        <textarea
                                                            id="text"
                                                            name="text"
                                                            required
                                                            placeholder={"Write something..."}
                                                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                        />
                                                    </div>
                                            </div>

                                        </div>
                                        <div className="ml-4 flex-shrink-0">
                                            <button type="submit" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                Add new notes
                                            </button>
                                        </div>
                                    </form>
                                    </ul>
                                </dd>
                            </div>

                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500"></dt>
                                <button className="mt-1 text-sm text-indigo-700 font-medium sm:col-span-2 sm:mt-0">

                                    <Link to={"/jobs/"+ id +"/edit"}> Edit this job </Link>

                                </button>
                            </div>
                            <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500"></dt>
                                <button onClick={handleDeleteJob} className="mt-1 text-sm text-red-700 font-medium sm:col-span-2 sm:mt-0">Permanently delete this job</button>
                            </div>

                        </dl>
                    </div>
                </div>

            </div>





        </div>
    )
}

export default JobPage;