import { ComponentChildren } from "preact";

export default function Layout({ children }: { children: ComponentChildren }) {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </nav>
            </header>
            {children}
            <footer>
                <p>&copy; 2025 My SSR Site</p>
            </footer>
        </div>
    );
}