import React from "react";
import {useNavigate} from "react-router-dom";
import {Job} from "../Types/types";
import {getAllJobs, getJob} from "../Services/JobsServices";
import { DateTime } from "luxon";
import Header from "../Components/Header";


const Jobs = () => {

    const [jobList, setJobList] = React.useState<Array<Job>>([]);

    const [filter, setFilter] = React.useState("No filters applied")
    const [sort, setSort] = React.useState("Sort by: Job ID")

    const [errorMessage, setErrorMessage] = React.useState("");

    const navigator = useNavigate()

    React.useEffect(() => {

        const compareId = (a: Job, b: Job) => {
            if ( a.id < b.id){
                return -1;
            }
            if ( a.id > b.id ){
                return 1;
            }
            return 0;
        }

        const compareAZ = (a: Job, b: Job) => {
            if ( a.title < b.title){
                return -1;
            }
            if ( a.title > b.title ){
                return 1;
            }
            return 0;
        }

        const compareLatest = (a: Job, b: Job) => {
            if ( a.created > b.created){
                return -1;
            }
            if ( a.created < b.created ){
                return 1;
            }
            return 0;
        }

        const idToken = window.localStorage.getItem("idToken")
        if (idToken === null) {
            navigator("/")
        } else {
            getAllJobs(idToken).then(response => {
                if (response == 401) {
                    window.localStorage.removeItem("idToken")
                    navigator("/")
                } else {
                    let jobs : Array<Job> = response!

                    if (filter !== "No filters applied") {
                        let filteredJobList: Array<Job> = [];

                        jobs.forEach((job) => {
                            if (job.status === filter) {
                                filteredJobList.push(job)
                            }
                        })

                        jobs = filteredJobList
                    }

                    if (sort === "Sort by: A-Z") {
                        jobs.sort(compareAZ)
                        setJobList(jobs)

                    } else if (sort === "Sort by: Job ID") {
                        jobs.sort(compareId)
                        setJobList(jobs)
                    } else {
                        jobs.sort(compareLatest)
                        setJobList(jobs)
                    }

                        setErrorMessage("");
                }

            })
        }
    }, [filter, sort])

    const onChangeFilter = (event: any) => {
        setFilter(event.target.value)
    }

    const onChangeSort = (event: any) => {
        setSort(event.target.value)
    }

    // @ts-ignore
    return (
        <div>


            <Header/>

            {errorMessage}
            <div className={"space-y-6 mt-14 mx-12 2xl:mx-96"}>


                <div className={"flex space-x-12 p-4 bg-gray-100 rounded-md"}>
                    <div>
                        <select
                            id="location"
                            name="location"
                            className="bg-gray-100 mt-1 block pl-1 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue="No filter applied"
                            onChange={onChangeFilter}
                        >
                            <option>No filters applied</option>
                            <option>Scheduled</option>
                            <option>Active</option>
                            <option>Invoicing</option>
                            <option>To priced</option>
                            <option>Completed</option>
                        </select>
                    </div>

                    <div>
                        <select
                            id="location"
                            name="location"
                            className="bg-gray-100 mt-1 block pl-1 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            defaultValue="Sort by: Job ID"
                            onChange={onChangeSort}
                        >
                            <option>Sort by: A-Z</option>
                            <option>Sort by: Job ID</option>
                            <option>Sort by: Latest</option>
                        </select>
                    </div>

                </div>



                {jobList.map(job =>

                    <div>

                        <a href={"/jobs/" + job.id.toString()} className="block hover:bg-gray-50 hover:shadow-md rounded-md ring-2">
                            <div className="px-4 py-4 flex items-center sm:px-6">
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                    <div className="truncate">
                                        <div className="flex text-sm">
                                            <p className="font-medium text-md text-indigo-600 truncate">{job.title}</p>

                                            <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
        <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-indigo-400" fill="currentColor" viewBox="0 0 8 8">
          <circle cx={4} cy={4} r={3} />
        </svg>
                                                {job.status}
      </span>

                                            <p className="ml-1 flex-shrink-0 font-normal text-gray-500"></p>
                                        </div>
                                        <div className="mt-2 flex">
                                            <div className="flex items-center text-sm text-gray-500">
                                                <p>
                                                    Job ID: {job.id} | Created: {DateTime.fromISO(job.created, {zone: 'utc'}).toFormat("h:mm a dd/M/yyyy")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="ml-5 flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                                    </svg>

                                </div>
                            </div>
                        </a>

                    </div>

                )}

            </div>


        </div>
    )
}

export default Jobs;