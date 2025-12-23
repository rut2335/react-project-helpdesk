import { useEffect, useState } from "react";
import { getPriorities } from "../services/priorityAndStatus";

const Priorities = () => {

    const [priorities, setPriorities] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);

    useEffect(() => {
        const fetchPrioritiesAndStatuses = async () => {
            try {
                const prioritiesResponse = await getPriorities();
                setPriorities(prioritiesResponse.data);
                const statusesResponse = await getPriorities();
                setStatuses(statusesResponse.data);
            }
            catch (error) {
                console.error("Error fetching priorities:", error);
            }
        };
        fetchPrioritiesAndStatuses();
    }, []);

    return (
        <>
            <h3>Priorities:</h3>
            <ul>
                {priorities.map((priority, index) => (
                    <li key={index}><span>{index}: {priority}</span> </li>
                ))}
            </ul>
            <h3>Statuses:</h3>
            <ul>
                {statuses.map((status, index) => (
                    <li key={index}><span>{index}: {status}</span> </li>
                ))}
            </ul>
        </>
    );
}
export default Priorities;