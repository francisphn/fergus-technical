interface SimpleAlertProps {
    title: string;
    description: string;
    className?: string;
}

const SimpleAlert = (props: SimpleAlertProps) => {
    return (
        <div className={"rounded-md bg-yellow-50 p-3 " + props.className}>
            <div className="flex">
                <div className="flex-shrink-0">

                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5 text-yellow-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                    </svg>

                </div>
                <div className="ml-2">
                    <h3 className="text-sm font-medium text-yellow-800">{props.title}</h3>
                    <div className="mt-2 text-sm text-yellow-700">
                        <p>
                            {props.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SimpleAlert;