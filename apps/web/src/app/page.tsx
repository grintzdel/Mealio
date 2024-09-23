import {trpc} from "../lib/trpc";

export default async function Home() {
    const response = await trpc.hello.query({name: 'world'});
    return (
        <div>
            <h1>{response}</h1>
        </div>
    );
}
