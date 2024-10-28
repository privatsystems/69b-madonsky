import { SiteContext } from "@/context/siteContext"
import Link from "next/link"
import { useContext } from "react"

export default function Header() {

    const { page } = useContext(SiteContext)

    return (
        <header
            className='header'
        >
            <nav className='nav'>
                <ul>
                    <li
                        className='nav_item'
                        style={{
                            color: page == '/about' ? '#000' : '#B4B4B4'
                        }}
                    >
                        <Link href='/about'>About</Link>
                    </li>
                    <li
                        className='nav_item'
                        style={{
                            color: page == '/' ? '#000' : '#B4B4B4'
                        }}
                    >
                        <Link href='/'>Archive</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )

}