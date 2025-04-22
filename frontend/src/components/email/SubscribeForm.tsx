"use client";

import type { FC, FormEvent } from "react";
import { useState } from "react";
import { MdErrorOutline, MdDone } from "react-icons/md";
import styles from "./SubscribeForm.module.scss";
import { createClass } from "@/lib/utils";

// see this page: https://stackoverflow.com/a/201378
// eslint-disable-next-line no-control-regex
const EMAIL_PATTERN = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

type SubscriptionDetails = {
    email: string | null;
};

/**
 * Email subscription form.
 */
export const SubscribeForm: FC = () => {
    const [valid, setValid] = useState(true);
    const [details, setDetails] = useState<SubscriptionDetails | null>(null);

    const validate = () => {
        if (!details)
            return;

        setValid(
            !!details.email && EMAIL_PATTERN.test(details.email),
        );
    };

    const submit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (!ev.currentTarget)
            return;

        const data = new FormData(ev.currentTarget);

        setDetails({
            email: data.get("email") as string | null,
        });

        validate();

        if (!valid) {
            alert("The provided details are not valid!");
            return;
        }

        // submit details to api...
    };

    return (
        <div className={styles.subscribe}>
            <form
                noValidate
                className={styles.subscribeForm}
                onChange={() => setDetails(null)}
                onSubmit={submit}
            >
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    data-fv-validate
                    data-fv-required
                    data-fv-pattern-preset="email"
                />
                <button
                    className="button button-primary"
                    type="submit"
                    aria-label="Submit subscription form"
                >
                    submit
                </button>
            </form>

            {details
                ? (
                        <div
                            className={createClass(
                                styles.status,
                                styles.valid,
                            )}
                        >
                            <MdDone size={20} />
                            Thanks!
                        </div>
                    )
                : !valid && (
                        <div
                            className={createClass(
                                styles.status,
                                styles.invalid,
                            )}
                        >
                            <MdErrorOutline size={20} />
                            Please enter a valid email
                        </div>
                    )}
        </div>
    );
};
