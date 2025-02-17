import { useState } from "preact/hooks";

export default function Home() {

    const [count, setCount] = useState(0);

    return (
        <main>
            <button onClick={() => setCount(count + 1)}>Click me {count}</button>
            <article>
                <h1>Welcome Homee!</h1>
                <section>
                    <p>This is the main content section</p>
                    <ul>
                        <li>Item 111</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </section>
            </article>
            <aside>
                <h2>Sidebar content</h2>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </aside>
        </main>
    );
}