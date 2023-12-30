'use client';

import { FC, useRef, useState } from 'react';
import { MdErrorOutline, MdDone } from 'react-icons/md';
import styles from './SubscribeForm.module.css';
import { makeClass } from '@/lib/shared/utils';

// see this page: https://stackoverflow.com/a/201378
// eslint-disable-next-line no-control-regex
const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

type SubscriptionDetails = {
    email: string;
};

/**
 * Email subscription form.
 */
export const SubscribeForm: FC = () => {
    const form = useRef<HTMLFormElement | null>(null);
    const [valid, setValidity] = useState(true);
    const [details, setDetails] = useState<SubscriptionDetails | null>(null);

    //on form submit...
    const submit = () => {
        if (!form.current)
            return;

        const data = new FormData(form.current);
        const formDetails = { email: data.get('email') as string };
        const formValid = EMAIL_PATTERN.test(formDetails.email);
        setValidity(formValid);

        if (!formValid)
            return;

        //submit
        setDetails({ email: formDetails.email });
    };

    return (
        <div className={styles.subscribe}>
            <form
                ref={form}
                noValidate
                className={styles.subscribeForm}
                onChange={() => setDetails(null)}
                onSubmit={ev => { ev.preventDefault(); submit(); }}
            >
                <input
                    type='email'
                    name='email'
                    placeholder='email'
                    data-fv-validate
                    data-fv-required
                    data-fv-pattern-preset='email'
                />
                <button
                    className='button button-primary'
                    type='submit'
                >
                    submit
                </button>
            </form>

            {details ? (
                <div
                    className={makeClass(
                        styles.status,
                        styles.valid
                    )}
                >
                    <MdDone size={20} />
                    Thanks!
                </div>
            ) : !valid && (
                <div
                    className={makeClass(
                        styles.status, styles.invalid
                    )}
                >
                    <MdErrorOutline size={20} />
                    Please enter a valid email
                </div>
            )}
        </div>
    );
};