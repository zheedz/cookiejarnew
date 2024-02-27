import { FunctionComponent } from 'react'
import { Inter } from 'next/font/google'

import styles from './styles.module.css'

import { http } from 'utils/http'

const inter = Inter({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
})

const Index: FunctionComponent = () => (<></>)

export default Index
