import { type Case } from "@prisma/client";

export default function Home({ cases }: { cases: Case[] }) {
    return (
        <main>
            {cases.map(item => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <p>{item.content}</p>
                </div>
            ))}
        </main>
    );
}