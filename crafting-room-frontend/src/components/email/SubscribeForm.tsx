'use client'
import { ChangeEvent, useState } from 'react';
import styles from './SubscribeForm.module.css';
import { MdErrorOutline, MdDone } from "react-icons/md";

export function SubscribeForm() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [valid, setValid] = useState(false);

    const submitEmail = (email: string) => {
        setSubmitted(true);
        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (regex.test(email)) {
            setValid(true);
        }
        else {
            setValid(false);
        }
    }
    const statusDiv = (valid) ?
        <div className={`${styles.status} ${styles.valid}`}>
            <MdDone size={20} />
            Thanks!
        </div> :
        <div className={`${styles.status} ${styles.invalid}`}>
            <MdErrorOutline size={20} />
            Please enter a valid email.
        </div>;

    const status = submitted ? statusDiv : undefined;
    return (
        <div className={styles.contactForm}>
            <input type="text" placeholder="email" onInput={e => setEmail(e.currentTarget.value)}></input>
            <button className="button-primary" onClick={() => submitEmail(email)}>submit</button>
            {status}
        </div>)
}