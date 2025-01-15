export default function Navbar() {
    return (
        <nav className="navbar bg-base-300 min-w-[400px]">
            <a className={"btn btn-ghost text-xl"} href="/">Accueil</a>
            <a className={"btn btn-ghost text-xl"} href="/search">Rechercher un film</a>
        </nav>
    )
}