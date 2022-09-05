import axios, {AxiosResponse} from "axios";
import {Job} from "../Types/types";
const basicUrl = "https://localhost:7262/api/jobs"

const getAllJobs = async (idToken: string) => {
    let r;
    const config = {
        headers: {
            Authorization: idToken
        }
    }

    await axios.get(basicUrl, config).then((response: AxiosResponse<Array<Job>>) => {
        r = response.data
    }, error => {
        r = error.response.status;
    })

    return r;
}

const getJob = async (idToken: string, id: number) => {
    let r;
    const config = {
        headers: {
            Authorization: idToken
        }
    }

    await axios.get(basicUrl + "/" + id.toString(), config).then((response) => {
        r = response.data
    }).catch(error => {
        r = error.response.status
    })

    return r;
}

const createJob = async (idToken: string, title: string, client: string, status: string) => {
    let r;

    const config = {
        headers: {
            Authorization: idToken
        }
    }

    await axios.post(basicUrl, {
        "title": title,
        "client": client,
        "status": status
    }, config).then((response) => {
        r = response.data
        console.log(response)
    }).catch(error => {
        r = error.response.status
    })
    return r;
}

const editJob = async (idToken: string, id: number, title: string, client: string, status: string) => {
    let r;
    const config = {
        headers: {
            Authorization: idToken
        }
    }

    await axios.put(basicUrl + "/" + id.toString(), {
        "title": title,
        "client": client,
        "status": status
    }, config).then((response) => {
        r = response.data
    }).catch(error => {
        r = error.response.status
    })
    return r
}

const deleteJob = async(idToken: string, id: number) => {
    let r;
    const config = {
        headers: {
            Authorization: idToken
        }
    }

    await axios.delete(basicUrl + "/" + id.toString(), config).then((response) => {
        r = response.data
    }).catch(error => {
        r = error.response.status
    })
    return r;
}

const addNotePiece = async(idToken: string, jobId: number, content: string) => {
    let r;
    const config = {
        headers: {
            Authorization: idToken
        }
    }

    await axios.post(basicUrl + "/" + jobId.toString() + "/notes", {
        "NotePiece": content
    }, config).then((response) => {
        r = response.data
    }).catch(error => {
        r = error.response.status;
    })

    return r;
}

const deleteNotePiece = async(idToken: string, jobId: number, notePiece: string) => {
    let r;
    const config = {
        headers: {
            Authorization: idToken
        }
    }

    await axios.post(basicUrl + "/" + jobId.toString() + "/notes/delete", {
        "NotePiece": notePiece
    }, config).then((response) => {
        r = response.data
    }).catch(error => {
        r = error.response.status
    })

    return r
}

export {
    getAllJobs,
    getJob,
    createJob,
    deleteJob,
    editJob,
    addNotePiece,
    deleteNotePiece
};