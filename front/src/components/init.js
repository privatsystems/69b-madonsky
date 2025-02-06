import { useContext, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { SiteContext } from "../context/siteContext"

export default function Init() {

    const { setIsMob, setIsTab, isMob, isTab, setLocale } = useContext(SiteContext)

    const router = useRouter()

    useEffect(() => {

        setVhUnic()
        testMob()
        setLocale(router.locale)

        window.addEventListener('resize', testMob)

        return () => {
            window.removeEventListener('resize', testMob)
        }

    }, [])

    useEffect(() => {

        setLocale(router.locale)

    }, [router])

    useEffect(() => {

        setVhUnic()

    }, [isMob, isTab])


    const setVhUnic = () => {

        const vh = window.innerHeight * 0.01
        document.querySelector('body').style.cssText += `--vhu: ${vh}px`

    }

    const setVh = () => {

        const vh = window.innerHeight * 0.01
        document.querySelector('body').style.cssText += `--vh: ${vh}px`

    }

    const testMob = () => {

        if (window.innerWidth < 800) {
            setIsMob(true)
        } else {
            setIsMob(false)
        }

        if (window.innerWidth < 1000) {
            setIsTab(true)
        } else {
            setIsTab(false)
        }

        setVh()
        setVhUnic()

    }



    return <></>

}