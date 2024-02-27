import { FunctionComponent } from 'react'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'

import styles from '../styles.module.css'

import { ShootingStar } from 'components/icons/star/shooting'
import { Cog } from 'components/icons/cog'

import { http } from 'utils/http'

const inter = Inter({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
})

export const Navbar: FunctionComponent = () => {
    const router = useRouter()

    const logout = async () => {
        try {
            await http.post('v1/users/logout')

            router.push('/')
        } catch (error) {}
    }

    return (
        <form className={inter.className} style={{
            width: '100%',
            height: 'fit-content',
            paddingTop: '5px',
            paddingBottom: '5px',
            paddingLeft: '10px',
            paddingRight: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'rgb(76, 172, 255)',
        }}>
            <div className={styles.container}>
                <ShootingStar className={styles.logo} onClick={() => router.push('/')} />
                <button className={styles.button} onClick={() => router.push('/')}>Home</button>
            </div>
            <div className={styles.container}>
                <Cog className={styles.icon} onClick={() => router.push('/settings')} />
                <button className={`${styles.button} ${styles.emphasis}`} onClick={logout}>Logout</button>
            </div>
        </form>
    )
}
