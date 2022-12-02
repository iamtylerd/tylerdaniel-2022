import { List, Title } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link'


import Sidebar from '../components/sidebar';
import styles from '../styles/about.module.scss';


export default function About(props) {
  return (
    <div className="container">
      <Sidebar location="about" />
      <div className={styles["about-container"]}>
        <Title align="center" order={1}>About</Title>
        <div className={styles["photo-container"]}>
          <Image objectFit='contain' src={"/static/images/me.jpg"} layout="fill"/>
        </div>
        <span className={styles["photo-link"]}>photo by: <Link href="https://www.alexanderxgreat.com/">alexanderxgreat</Link></span>
      <div className={styles["likes-container"]}>
        <List>
          <List.Item>Jasmine & Drake</List.Item>
          <List.Item>Camping</List.Item>
          <List.Item>Hip Hop</List.Item>
          <List.Item>BBQ</List.Item>
          <List.Item>Tattoos</List.Item>
          <List.Item>Traveling</List.Item>
          <List.Item>Video Games</List.Item>
          <List.Item>Beer</List.Item>
          <List.Item>Sports</List.Item>
          <List.Item>Gym</List.Item>
          <List.Item>Sports Cards</List.Item>
          <List.Item>Coding</List.Item>
        </List>
      </div>
      </div>
    </div>
  )
}

