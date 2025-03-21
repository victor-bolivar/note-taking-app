import { useSearchParams } from "react-router";

const ActiveNotes = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div>
            <h1>Active notes</h1>
            <p>{JSON.stringify(searchParams.get("id"))}</p>
        </div>
    )
}

export default ActiveNotes
